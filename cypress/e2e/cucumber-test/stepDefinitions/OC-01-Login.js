import { When, Given, And, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import { login } from '@pages/Login/Login.Page';
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const telephone = faker.phone.number();
const password = faker.internet.password();

context('OPEN CART | sign up', () => {
	Given('the user is on the home page', () => {
		cy.visit('https://opencart.abstracta.us/');
	});

	describe('TC1: User successfully registers on the platform', () => {
		When('the user clicks on the My Account dropdown', () => {
			cy.get('[title="My Account"]').click();
		});

		And('selects the "Register" option', () => {
			cy.get('li a[href="https://opencart.abstracta.us:443/index.php?route=account/register"]').click();
		});
		Then('they should be redirected to the registration section', () => {
			cy.url().should('eq', 'https://opencart.abstracta.us/index.php?route=account/register');
		});
		And('the user fills in all the required fields', () => {
			login.get.inputFirstName().type(firstName);
			login.get.inputLastName().type(lastName);
			login.get.inputEmail().type(email);
			login.get.inputTelephone().type(telephone);
			login.get.inputPassword().type(password);
			login.get.inputConfirmPassword().type(password);
			login.get.checkBoxAcceptConditions().click();
			login.get.inputButtonContinue().click();
		});
		Then('the user should be successfully registered', () => {
			cy.url().should('contain', 'account/success');
		});
	});
	describe('TC2: User already registered attempts registration again', () => {
		Given('the user is on the registration section', () => {
			cy.visit('https://opencart.abstracta.us/index.php?route=account/register');
		});
		When('the user fills in the registration form with existing credentials', () => {
			login.get.inputFirstName().type(firstName);
			login.get.inputLastName().type(lastName);
			login.get.inputEmail().type(email);
			login.get.inputTelephone().type(telephone);
			login.get.inputPassword().type(password);
			login.get.inputConfirmPassword().type(password);
			login.get.checkBoxAcceptConditions().click();
			login.get.inputButtonContinue().click();
		});
		Then('an error message should be displayed indicating the user is already registered', () => {
			cy.get('.alert').should('contain', 'Warning: E-Mail Address is already registered!');
		});
		And('the registration process should not proceed', () => {
			cy.url().should('contain', 'account/register');
		});
	});
	describe('TC3: User attempts registration with incomplete information', () => {
		Given('the user visits the registration section', () => {
			cy.visit('https://opencart.abstracta.us/index.php?route=account/register');
		});
		When('the user fills in the registration form with incomplete information', () => {
			login.get.inputFirstName().clear();
			login.get.inputLastName().type(lastName);
			login.get.inputEmail().type(email);
			login.get.inputTelephone().type(telephone);
			login.get.inputPassword().type(password);
			login.get.inputConfirmPassword().type(password);
			login.get.checkBoxAcceptConditions().click();
			login.get.inputButtonContinue().click();
		});
		Then('an error message should be displayed prompting the user to complete all necessary fields', () => {
			cy.get('.text-danger').should('contain', 'First Name must be between 1 and 32 characters!');
		});
		And('the user should not be successfully registered', () => {
			cy.url().should('contain', 'account/register');
		});
	});
});
