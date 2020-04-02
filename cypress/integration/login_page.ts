const clearForm = () => {
  cy.get('input[id="birthDay"]')
    .clear()
    .get('input[id="birthMonth"]')
    .clear()
    .get('input[id="birthYear"]')
    .clear();
};

describe('Login', () => {
  it('shows error on empty values', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[type="submit"]').click();
    cy.contains('The birthday should be dd.mm.yyyy.');
  });

  it('fill form but user is too old', () => {
    cy.get('input[id="birthDay"]')
      .type('01')
      .get('input[id="birthMonth"]')
      .type('01')
      .get('input[id="birthYear"]')
      .type('1950')
      .get('input[id="birthDay"]');
    cy.get('[type="submit"]').click();
    cy.contains('Only 8-25 years old can create youth profile.');
  });

  it('fill form but user is too young', () => {
    clearForm();
    cy.get('input[id="birthDay"]')
      .type('01')
      .get('input[id="birthMonth"]')
      .type('01')
      .get('input[id="birthYear"]')
      .type('2020')
      .get('input[id="birthDay"]');
    cy.get('[type="submit"]').click();
    cy.contains('Only 8-25 years old can create youth profile.');
  });

  it('fills birth but user is under 13', () => {
    clearForm();
    cy.get('input[id="birthDay"]')
      .type('01')
      .get('input[id="birthMonth"]')
      .type('01')
      .get('input[id="birthYear"]')
      .type('2008')
      .get('input[id="birthDay"]');
    cy.get('[type="submit"]').click();
    cy.contains('Find the nearest youth centre on the service map');
  });

  it('fill correct data and navigate to registration form', () => {
    cy.get('button[id="goBack"]').click();
    cy.get('input[id="birthDay"]')
      .type('01')
      .get('input[id="birthMonth"]')
      .type('01')
      .get('input[id="birthYear"]')
      .type('2005')
      .get('input[id="birthDay"]');
    cy.get('[type="submit"]').click();
    // After clicking submit just return to login page, because these tests act like a bot
    // redirecting and logging in with github is not possible.
    cy.visit('http://localhost:3000/login');
  });
});
