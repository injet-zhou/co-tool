describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:1420')
    cy.contains('数据库').click()
    cy.contains('建表（旧）').click()
    cy.url().should('include', '/database/table-build')
  })
})