import { When, Given, And, Then } from '@badeball/cypress-cucumber-preprocessor';
const { loginData } = require('../../../fixtures/data/login');
const { firstName, lastName, email, telephone, password, longName, newEmail } = loginData;

context('OPEN CART | SIGN UP ', () => {
	Given('the user is on the home page', () => {
		cy.visit('https://opencart.abstracta.us/');
	});
	When('the user clicks on the My Account dropdown', () => {
		cy.get('[title="My Account"]').click();
	});
	And('selects the "Register" option', () => {
		cy.get('li a[href="https://opencart.abstracta.us:443/index.php?route=account/register"]').click();
	});
	Then('they should be redirected to the registration section', () => {
		cy.url().should('eq', 'https://opencart.abstracta.us/index.php?route=account/register');
	});

	describe('TC1: User successfully registers on the platform', () => {
		And('the user fills in all the required fields', () => {
			cy.loginRegister(firstName, lastName, email, telephone, password);
		});
		Then('the user should be successfully registered', () => {
			cy.url().should('contain', 'account/success');
		});
	});

	describe('TC2: User already registered attempts registration again', () => {
		When('the user fills in the registration form with existing credentials', () => {
			cy.loginRegister(firstName, lastName, email, telephone, password);
		});
		Then('an error message should be displayed indicating the user is already registered', () => {
			cy.get('.alert').should('contain', 'Warning: E-Mail Address is already registered!');
		});
		And('the registration process should not success', () => {
			cy.url().should('contain', 'account/register');
		});
	});

	describe('TC3: User attempts registration with incomplete information', () => {
		When('the user fills in the registration form with incomplete information', () => {
			cy.loginRegister('', lastName, email, telephone, password);
		});
		Then('an error message should be displayed prompting the user to complete all necessary fields', () => {
			cy.fixture('data/login/loginOpenCart.json').then(data => {
				const messageError = data.messageError;
				const firstNameError = messageError.firstName;
				cy.get('.text-danger').should('contain', firstNameError);
			});
		});
		And('the user should not be successfully registered', () => {
			cy.url().should('contain', 'account/register');
		});
	});
	describe('TC4: User attempts registration with invalid credentials', () => {
		Given('the user is on the url register', () => {
			cy.visit('https://opencart.abstracta.us/index.php?route=account/register');
		});
		When('the user fills in the registration form with invalid credentials', () => {
			cy.loginRegister(longName, lastName, email, telephone, password);
		});
		Then('an error message should be displayed indicating the issue with the provided information', () => {
			cy.fixture('data/login/loginOpenCart.json').then(data => {
				const messageError = data.messageError;
				const firstNameError = messageError.firstName;
				cy.get('.text-danger').should('contain', firstNameError);
			});
		});
		And('the registration process should not proceed', () => {
			cy.url().should('contain', 'account/register');
		});
	});
	describe('TC5: User registers from different parts of the site', () => {
		Given('the user is on different sections of the site', () => {
			cy.visitDifferentSections();
		});
		When('the user navigates to the registration page', () => {
			cy.visit('https://opencart.abstracta.us/index.php?route=account/register');
		});
		Then('all required fields must be completed for registration', () => {
			cy.loginRegister(firstName, lastName, newEmail, telephone, password);
		});
		And('the user should be able to successfully register', () => {
			cy.url().should('contain', 'account/success');
		});
	});
});

import { removeLogs } from '@helper/RemoveLogs';
removeLogs();
