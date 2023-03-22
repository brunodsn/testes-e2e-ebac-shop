class checkout {
    validarDadosCheckout(empresa, pais, endereco, numero, cidade, estado, cep, telefone, email, comentario){
        cy.get('#billing_company').clear().type (empresa)
        cy.get('#select2-billing_country-container').click().type(pais).get('[aria-selected ="true"]').click()
        cy.get('#billing_address_1').clear().type(endereco)
        cy.get('#billing_address_2').clear().type(numero)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('#select2-billing_state-container').click().type(estado + '{enter}')
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#billing_phone').clear().type(telefone)
        cy.get('#billing_email').clear().type(email)
        cy.get('#order_comments').type(comentario)
    }

}

export default new checkout()