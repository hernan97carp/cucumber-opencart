import { Given, When, Then, Before, And } from '@badeball/cypress-cucumber-preprocessor';
const { loginData } = require('../../../fixtures/data/login');
const { firstName, lastName, email, telephone, password } = loginData;
let setupDone = false;

context('OPEN CART | LOGIN IN', () => {
	Given('the user is on the login page', () => {
		if (!setupDone) {
			cy.visit('https://opencart.abstracta.us/index.php?route=account/register');
			cy.loginRegister(firstName, lastName, email, telephone, password);
			cy.url().should('contain', 'account/success');

			cy.get('a[href="https://opencart.abstracta.us:443/index.php?route=account/account"][title="My Account"]')
				.click()
				.then(() => {
					cy.get('.dropdown-menu.dropdown-menu-right [href="https://opencart.abstracta.us:443/index.php?route=account/logout"]').click();
				});
			cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=account/logout');

			setupDone = true;
		}
		cy.visit('https://opencart.abstracta.us/index.php?route=account/login');
	});
	describe('TC1:Successful Login with Valid Credentials', () => {
		When('the user logs in with valid credentials', () => {
			cy.loginIn(email, password);
		});
		Then('the login should be successful', () => {
			cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=account/account');
		});
	});

	describe('TC2:Invalid Login Attempts with Invalid Credentials', () => {
		When('the user attempts to log in with invalid credentials {string} and {string}', (invalidEmail, invalidPassword) => {
			invalidEmail && cy.get('[placeholder="E-Mail Address"]').clear().type(invalidEmail);
			invalidPassword && cy.get('[placeholder="Password"]').clear().type(invalidPassword);
			cy.get('[value="Login"]').click();
		});
		Then('the user should not be able to log in', () => {
			cy.url().should('contain', 'account/login');
		});
		And('a warning sign should be displayed on the page', () => {
			cy.get('.alert.alert-danger.alert-dismissible').should('exist').and('be.visible').invoke('text').should('not.be.empty');
		});
	});
	describe('TC3:Invalid Login Attempts with empty Credentials', () => {
		When('the user attempts to log in with empty credentials {string} and {string}', (emptyEmail, emptyPassword) => {
			emptyEmail && cy.get('[placeholder="E-Mail Address"]').clear().type(emptyEmail);

			emptyPassword && cy.get('[placeholder="Password"]').clear().type(emptyPassword);

			cy.get('[value="Login"]').click();
		});
		Then('the user should be unable to log in', () => {
			cy.url().should('contain', 'account/login');
		});

		And('a warning sign should be displayed', () => {
			cy.get('.alert.alert-danger.alert-dismissible').should('exist').and('be.visible').invoke('text').should('not.be.empty');
		});
	});

	describe('TC4: Login and Logout Successfully', () => {
		When('the user logs in', () => {
			cy.loginIn(email, password);
		});
		And('in the dropdown select log out option', () => {
			cy.get('a[href="https://opencart.abstracta.us:443/index.php?route=account/account"][title="My Account"]')
				.click()
				.then(() => {
					cy.get('.dropdown-menu.dropdown-menu-right [href="https://opencart.abstracta.us:443/index.php?route=account/logout"]').click();
				});
		});

		Then('the user should be successfully logged out', () => {
			cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=account/logout');
		});
	});
});
