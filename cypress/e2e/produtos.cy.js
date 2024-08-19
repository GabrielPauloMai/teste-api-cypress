/// reference types="cypress" />

describe('Teste de API - Produtos', () => {
  let token
  beforeEach(() => {
    cy.token().then((tk) => {
      token = tk
    })
  })

  it('Deve listar produtos com sucesso', () => {

    cy.request({
      method: 'GET',
      url: 'produtos',
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('produtos')
    })

  })

  it('Deve cadastrar um produto com sucesso', () => {

    cy.request({
      method: 'POST',
      url: 'produtos',
      headers: {
        authorization: token
      },
      body: {
        nome: 'Produto Teste',
        preco: 100,
        descricao: 'Descrição do produto teste',
        quantidade: 10
      },
    }).should((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  })

})