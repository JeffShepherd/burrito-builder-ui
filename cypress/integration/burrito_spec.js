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


})