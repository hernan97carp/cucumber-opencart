import { login } from '@pages/Login/Login.Page';

Cypress.Commands.add('loginRegister', (firstName, lastName, email, telephone, password) => {
	firstName && login.get.inputFirstName().type(firstName);
	lastName && login.get.inputLastName().type(lastName);
	email && login.get.inputEmail().type(email);
	telephone && login.get.inputTelephone().type(telephone);
	password && login.get.inputPassword().type(password);
	password && login.get.inputConfirmPassword().type(password);
	login.get
		.checkBoxAcceptConditions()
		.click()
		.then(() => {
			login.get.inputButtonContinue().click();
		});
});

Cypress.Commands.add('visitDifferentSections', () => {
	cy.visit('https://opencart.abstracta.us/index.php?route=account/login');
	cy.visit('https://opencart.abstracta.us/');
	cy.visit('https://opencart.abstracta.us/index.php?route=checkout/cart');
	cy.visit('https://opencart.abstracta.us/index.php?route=product/manufacturer');
	cy.visit('https://opencart.abstracta.us/index.php?route=product/special');
	cy.visit('https://opencart.abstracta.us/');
});

Cypress.Commands.add('loginIn', (email, password) => {
	cy.get('[placeholder="E-Mail Address"]').clear().type(email);
	cy.get('[placeholder="Password"]').clear().type(password);
	cy.get('[value="Login"]').click();
});
