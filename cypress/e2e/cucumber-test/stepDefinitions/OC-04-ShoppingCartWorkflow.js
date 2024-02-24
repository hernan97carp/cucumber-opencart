import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';

const { userEmail, userPassword } = Cypress.env('UserLogin');

context('SHOPPING CART WORKFLOW', () => {
	Given('the user is already registered', () => {
		cy.visit('https://opencart.abstracta.us/index.php?route=account/login');
		cy.loginIn(userEmail, userPassword);
	});

	And('a product is added to the cart', () => {
		cy.visit('https://opencart.abstracta.us/index.php?route=product/category&path=24');
		cy.get('button[onclick ^="cart.add"]').eq(0).click();
		cy.contains('Success: You have added');
		cy.get('[href="https://opencart.abstracta.us:443/index.php?route=checkout/checkout"]').eq(0).click();
		cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=checkout/checkout');
	});

	describe('TC1 - Verify Successful Purchase Process', () => {
		Given('the user has filled out all the required inputs', () => {
			//step2
			cy.get('a[aria-expanded="true"]').should('exist');
			cy.get('#button-payment-address')
				.eq(0)
				.click()
				.then(() => {
					//step3
					cy.get('[href="#collapse-shipping-address"][aria-expanded="true"]').should('exist');
					cy.get('#button-shipping-address').click();
				})
				.then(() => {
					//step4
					cy.get('[href="#collapse-shipping-method"][aria-expanded="true"]').should('exist');
					cy.get('#button-shipping-method').click();
				});

			//step5
			cy.get('[href="#collapse-payment-method"][aria-expanded="true"]').should('exist');
			cy.get('[type="checkbox"]')
				.click()
				.then(() => {
					cy.get('#button-payment-method').click();
					cy.get('[value="Loading..."]').should('not.exist');
				})
				.then(() => {
					cy.get('[href="#collapse-checkout-confirm"][aria-expanded="true"]').should('exist');
				});
		});
		When('the user confirms the order', () => {
			//step6

			cy.get('[value="Confirm Order"]').click();
		});
		Then('the user should have successfully made the purchase', () => {
			cy.contains('Your order has been placed!');
			cy.url().should('contain', 'http://opencart.abstracta.us/index.php?route=checkout/success');
		});
	});
});
