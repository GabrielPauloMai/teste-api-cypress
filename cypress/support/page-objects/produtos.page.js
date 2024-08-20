import { faker } from "@faker-js/faker";
import { json } from "body-parser";

class ProdutosPage {

    constructor() {
        this.token = null;
    }

    /**
     * @typedef {Object} Produto
     * @property {string} nome
     * @property {float} preco
     * @property {string} descricao
     * @property {number} quantidade
     */

    /**
     * Obtém o token de autorização e armazena na variável `token`
     * @returns {void}
     */
    obterToken() {
        cy.request({
            method: 'POST',
            url: 'login',
            body: {
                email: 'fulano@qa.com',
                password: 'teste'
            },
        }).then((response) => {
            this.token = response.body.authorization;
        })
    }


    /**
     * Faz a requisição para criar um produto
     * @param {Produto} produto
     * @returns {Response}
     */
    criarProduto(produto) {
        return cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {
                authorization: this.token
            },
            body: produto, failOnStatusCode: false
        }).then((response) => {
            cy.log(response)
            return cy.wrap({
                status: response.status,
                body: response.body,
                message: response.body.message

            })
        })
    }

    /**
     * Faz a requisição para listar produtos
     * @returns {Promise} Promessa que resolve com os dados da resposta
     */
    listarProdutos() {
        return cy.request({
            method: 'GET',
            url: 'produtos',
        }).then((responseData) => {
            return cy.wrap({
                status: responseData.status,
                body: responseData.body
            })
        })
    }

    /**
     * Cria um produto com dados aleatórios
     * @returns {Produto}
     */
    gerarProduto() {
        return {
            nome: faker.commerce.productName(),
            preco: faker.commerce.price(),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.datatype.number(
                {
                    'min': 1,
                    'max': 100
                }
            )
        }
    }
}
export default new ProdutosPage()