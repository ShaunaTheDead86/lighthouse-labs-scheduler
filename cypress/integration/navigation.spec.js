describe('Navigation', () => {
  it('should visit root', () => {
    cy.visit('/')
  })
  it('should navigate to Tuesday', () => {
    cy
			.get('[data-testid=Tuesday]')
			.click()
			.should('have.class', 'day-list__item--selected')
    cy.visit('/')
  })
})
