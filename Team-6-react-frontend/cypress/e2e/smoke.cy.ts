describe('smoke', () => {
  it('loads reflection screen', () => {
    cy.visit('/')
    cy.contains('振り返り')
  })
})
