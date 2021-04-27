describe('Home page', () => {
  beforeEach(() => {
    cy.fixture('orders.json')
    .then(orderData => {
      cy.intercept(
        'GET',
        'http://localhost:3001/api/v1/orders',
        {
          statusCode: 200,
          body: orderData
        }
      )
    })


    cy.visit('http://localhost:3000/')
  })

  it('Should have a title', () => {
    cy.get('h1')
      .contains('Burrito Builder')
  })

  it('Should not have any ingredients selected on page load', () => {
    cy.get('form')
      .contains('Nothing selected')
  })

  it('Should have buttons for ingredients', () => {
    cy.get('button[id=beans]')
      .should('be.visible')
    cy.get('button[id=cilantro]')
      .should('be.visible')
  })

  it('Should have a button to submit the order', () => {
    cy.get('.submit-order-button')
      .should('be.visible')
  })

  it('Should reflect 3 existing orders on page load', () => {
    cy.get('section')
      .children()
      .should('have.length', 3)
      .should('contain', 'Sami')
      .and('contain', 'Pete')
      .and('contain', 'Alexis')
  })

  it('Should not allow a user to submit an order if a name hasn\'t been entered', () => {
    cy.get('button[id=beans]')
      .click()
    cy.get('.submit-order-button')
      .click()
    cy.get('.warning-message')
      .contains('Please enter a name and choose an ingredient before submitting')
  })

  it('Should not allow a user to submit an order if an ingredient hasn\'t been selected', () => {
    cy.get('input')
      .type('Jeff')
    cy.get('.submit-order-button')
      .click()
    cy.get('.warning-message')
      .contains('Please enter a name and choose an ingredient before submitting')
  })


})




describe('Sad paths', () => {

})