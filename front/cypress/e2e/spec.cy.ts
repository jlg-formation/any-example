describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('a', 'Voir le stock').click();
    cy.get('a[title="Ajouter"]').click();
    cy.get('input').eq(0).clear().type('titi');
    cy.get('input').eq(1).clear().type('12');
    cy.get('input').eq(2).clear().type('15');
    cy.contains('button', 'Ajouter').click();
  });
});
