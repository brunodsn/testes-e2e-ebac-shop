/// <reference types="cypress" />
import checkoutPages from '../support/page_objects/checkout.pages'
var faker = require('faker');
let nomeFaker = faker.name.firstName()
let sobrenomeFaker = faker.name.lastName()
let emailFaker = faker.internet.email(nomeFaker)
const perfil = require('../fixtures/perfil.json')
const dadosCheckout = require('../fixtures/endereco.json');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente - OK 
        Quero acessar a Loja EBAC - OK
        Para fazer um pedido de 4 produtos - OK
        Fazendo a escolha dos produtos - OK
        Adicionando ao carrinho - OK
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')
    });
   /* afterEach(() => {
        cy.screenshot()
    });*/

    it('Criar um login na loja', () => {
        cy.Cadastro(emailFaker, perfil.senha)
        cy.get('.woocommerce-MyAccount-content > :nth-child(3)').should('contain','A partir do painel de controle de sua conta')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        // Fazer login após criar conta
        cy.get('#username').type(emailFaker)
        cy.get('#password').type(perfil.senha, {log: false})
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(3)').should('contain','A partir do painel de controle de sua conta')

        // Acessar a página dos produtos desejados e adicionar ao carrinho
        cy.visit('produtos/page/4')
        cy.get('.post-3702 > .product-block > .block-inner > .image > .product-image > .image-hover').click()
        cy.addProdutos('S','Gray',2)
        cy.get('.single_add_to_cart_button').click()
        
        
        // Validar carrinho e seguir com check-out
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('#billing_first_name').clear().type(nomeFaker)
        cy.get('#billing_last_name').clear().type(sobrenomeFaker)
           checkoutPages.validarDadosCheckout(
            dadosCheckout[0].empresa,
            dadosCheckout[0].pais,
            dadosCheckout[0].endereco,
            dadosCheckout[0].numero,
            dadosCheckout[0].cidade,
            dadosCheckout[0].estado,
            dadosCheckout[0].cep,
            dadosCheckout[0].telefone,
            dadosCheckout[0].email,
            dadosCheckout[0].comentario
        )
        cy.get('#terms').click()
        cy.get('#place_order').click()

    });
})