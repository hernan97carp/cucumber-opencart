import { login } from '@pages/Login/Login.Page';

Cypress.Commands.add('loginRegister', (firstName, lastName, email, telephone, password) => {
	firstName && login.get.inputFirstName().type(firstName);
	lastName && login.get.inputLastName().type(lastName);
	email && login.get.inputEmail().type(email);
	telephone && login.get.inputTelephone().type(telephone);
	password && login.get.inputPassword().type(password);
	password && login.get.inputConfirmPassword().type(password);
	login.get.checkBoxAcceptConditions().click();
	login.get.inputButtonContinue().click();
});
