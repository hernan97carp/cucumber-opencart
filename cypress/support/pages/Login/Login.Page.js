class Login {
	get = {
		inputFirstName: () => cy.get('[name="firstname"]'),
		inputLastName: () => cy.get('[name="lastname"]'),
		inputEmail: () => cy.get('[name="email"]'),
		inputTelephone: () => cy.get('[name="telephone"]'),
		inputPassword: () => cy.get('[name="password"]'),
		inputConfirmPassword: () => cy.get('[name="confirm"]'),
		checkBoxAcceptConditions: () => cy.get('[type="checkbox"]'),
		inputButtonContinue: () => cy.get('.pull-right > .btn'),
	};
}

export const login = new Login();
