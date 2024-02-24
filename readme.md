import { Given, When } from '@badeball/cypress-cucumber-preprocessor'; const { loginData } = require('../../../fixtures/data/login'); const {
firstName, lastName, email, telephone, password } = loginData;

context('OPEN CART | LOGIN IN', () => { Given('the user has created an account', () => {
cy.visit('https://opencart.abstracta.us/index.php?route=account/register'); cy.loginRegister(firstName, lastName, email, telephone, password);
cy.url().should('contain', 'account/success'); }); And('the user logs out', () => {
cy.get('a[href="https://opencart.abstracta.us:443/index.php?route=account/account"][title="My Account"]') .click() .then(() => {
cy.get('.dropdown-menu.dropdown-menu-right [href="https://opencart.abstracta.us:443/index.php?route=account/logout"]').click(); });
cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=account/logout'); }); And('the user is on the login page', () => {
cy.visit('https://opencart.abstracta.us/index.php?route=account/login'); });

    describe('TC1: Successful Login', () => {
    	When('the user attempts to log in with correct credentials', () => {});
    	Then('the login should be successful', () => {
    		//cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=account/account');
    	});
    });

});

    Background: User Account Creation
        Given the user has created an account
        And the user logs out
        And the user is on the login page

    Scenario: TC1: Successful Login
        When the user attempts to log in with correct credentials
        Then the login should be successful














    describe('TC2: Invalid credentials', () => {
    	When('the user attempts to log in with invalid credentials {string} and {string}', (invalidEmail, invalidPassword) => {
    		cy.get('[placeholder="E-Mail Address"]').clear().type(invalidEmail);
    		cy.get('[placeholder="Password"]').clear().type(invalidPassword);
    		cy.get('[value="Login"]').click();
    	});
    	Then('the user should not be able to log in', () => {
    		cy.url().should('contain', 'account/login');
    	});
    	And('a warning sign should be displayed on the page', () => {
    		cy.get('.alert.alert-danger.alert-dismissible').text().should('contain', 'Warning: No match for E-Mail Address and/or Password.');
    	});
    });







    Scenario Outline: TC2: Invalid credentials
        When the user attempts to log in with invalid credentials "<email>" and "<password>"
        Then the user should not be able to log in
        And a warning sign should be displayed on the page

        Examples:
            | email   | password |
            | Value 1 | Value 2  |

let setupDone = false; Before(() => { if (!setupDone) { cy.visit('https://opencart.abstracta.us/index.php?route=account/register');
cy.loginRegister(firstName, lastName, email, telephone, password); cy.url().should('contain', 'account/success');

    	cy.get('a[href="https://opencart.abstracta.us:443/index.php?route=account/account"][title="My Account"]')
    		.click()
    		.then(() => {
    			cy.get('.dropdown-menu.dropdown-menu-right [href="https://opencart.abstracta.us:443/index.php?route=account/logout"]').click();
    		});
    	cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=account/logout');

    	setupDone = true;
    }

});

import { And, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'; const { loginData } = require('../../../fixtures/data/login'); const
{ firstName, lastName, email, telephone, password } = loginData;

Given('that the user is logged in', () => { cy.visit('https://opencart.abstracta.us/index.php?route=account/register'); cy.loginRegister(firstName,
lastName, email, telephone, password); }); And('the user go to the pages of products', () => {
cy.visit('https://opencart.abstracta.us/index.php?route=product/category&path=24'); });

describe('TC1: The user should be able to add products to the Wishlist', () => { When('the user adds a product enabled in the store', () => {
cy.get('.button-group button[onclick*="cart.add"]').eq(0).click(); });

    Then('the message confirming that the product was successfully added should be displayed', () => {
    	cy.get('.alert.alert-success.alert-dismissible')
    		.invoke('text')
    		.then(message => {
    			let messageClear = message
    				.replace(/&nbsp;/g, '')
    				.replace(/ ×$/, '')
    				.trim();
    			let productName;
    			cy.get('.caption h4 a')
    				.eq(0)
    				.invoke('text')
    				.then(nameProduct => {
    					productName = nameProduct;
    				})
    				.then(() => {


    					expect(messageClear).to.contain(`Success: You have added ${productName} to your shopping cart!`);

    				});
    		});
    });

    And("the product should appear on the user's Wishlist page", () => {
    	// Aquí puedes agregar las aserciones necesarias para verificar que el producto aparezca en la lista de deseos del usuario.
    });

});

describe('TC2: Verify that the user can delete a product from their wishlist', () => { let text; Given('the user has added a product to their
wishlist', () => { cy.visit('https://opencart.abstracta.us/index.php?route=product/category&path=24'); cy.get('.button-group button
.fa.fa-heart').eq(0).click(); cy.get('#wishlist-total').click(); cy.url().should('contain',
'https://opencart.abstracta.us/index.php?route=account/wishlist'); }); When('the user selects the delete button in their wishlist', () => {
cy.get('[data-original-title="Remove"]').click(); }); Then('a message confirming that the item has been deleted should be displayed', () => {
cy.get('.alert.alert-success.alert-dismissible') .invoke('text') .then(cleanText => { text = cleanText.replace(/\n\s*×$/, '').trim(); }) .then(() => {
let newText = text.replace(/\n\s*×$/, '').trim(); expect(newText).to.eq('Success: You have modified your wish list!') }); }); });
