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

    cy.fixture('newOrder.json')
    .then(newOrderData => {
      cy.intercept(
        'POST',
        'http://localhost:3001/api/v1/orders',
        {
          statusCode: 200,
          body: newOrderData
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

  it('Should reflect a new order after submitting one', () => {
    cy.get('button[id=beans]')
      .click()
    cy.get('input')
      .type('Joe')
    cy.get('.submit-order-button')
      .click()
    cy.get('section')
      .children()
      .should('have.length', 4)
      .should('contain', 'Joe')
      .and('contain', 'Pete')
      .and('contain', 'Alexis')
      .and('contain', 'Sami')
  })

    it('Should remove an order when clicking delete button on it', () => {
      cy.intercept(
        'DELETE',
        'http://localhost:3001/api/v1/orders/3',
        {
          statusCode: 204
        }
      )
      cy.get('button[id=Alexis]')
        .click()
        cy.get('section')
        .children()
        .should('have.length', 2)
    })

})




describe('Sad paths', () => {

  it('Should show an error message when the initial GET request fails', () => {
    cy.intercept(
      'GET',
      'http://localhost:3001/api/v1/orders',
      {
        statusCode: 500,
        body: ''
      }
    )
    cy.visit('http://localhost:3000/')
    cy.get('header')
      .contains('An error has occured. Please try again later.')
  })

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

  it('Should show an error message when a POST request fails', () => {
    cy.intercept(
      'POST',
      'http://localhost:3001/api/v1/orders',
      {
        statusCode: 500,
        body: ''
      }
    )
    cy.get('button[id=beans]')
      .click()
    cy.get('input')
      .type('Joe')
    cy.get('.submit-order-button')
      .click()
    cy.get('header')
      .contains('An error has occured. Please try again later.')
  })

  // it('Should show an error message when a DELETE request fails', () => {
  //   cy.intercept(
  //     'DELETE',
  //     'http://localhost:3001/api/v1/orders/3',
  //     {
  //       statusCode: 404
  //     }
  //   )
  //   cy.get('button[id=Alexis]')
  //     .click()
  //   cy.get('header')
  //     .contains('An error has occured. Please try again later.')
  // })


})