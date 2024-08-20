/// reference types="cypress" />;
import ProdutosPage from "../support/page-objects/produtos.page";



describe('Teste de API - Produtos', () => {
  before(() => {
    ProdutosPage.obterToken();
  })

  it('Deve listar produtos com sucesso', () => {
    ProdutosPage.listarProdutos().then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.produtos).to.be.an('array')
      expect(response.body.produtos.length).to.eq(response.body.quantidade)
    })
  })

  it('Deve cadastrar um produto com sucesso', () => {
    ProdutosPage.criarProduto(ProdutosPage.gerarProduto()).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  })


  it('Deve validar mensagem de produto já cadastrado', () => {

    const produto = {
      nome: 'Samsung 60 polegadas',
      preco: 5240,
      descricao: 'TV',
      quantidade: 49977
    }

    ProdutosPage.criarProduto(produto).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.equal('Já existe produto com esse nome')
    })

  })
})