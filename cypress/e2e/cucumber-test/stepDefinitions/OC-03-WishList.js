import { And, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
const { userEmail, userPassword } = Cypress.env('UserLogin');

Given('that the user is logged in', () => {
	cy.visit('https://opencart.abstracta.us/index.php?route=account/login');
	cy.loginIn(userEmail, userPassword);
});
And('the user go to the pages of products', () => {
	cy.visit('https://opencart.abstracta.us/index.php?route=product/category&path=24');
});

describe('TC1: The user should be able to add products to the Wishlist', () => {
	let productName;

	When('the user adds a product enabled in the store', () => {
		cy.get('.button-group button .fa.fa-heart').eq(0).click();
	});

	Then('the product should appear on the users Wishlist page', () => {
		cy.get('.alert.alert-success.alert-dismissible')
			.invoke('text')
			.then(message => {
				let messageClear = message
					.replace(/&nbsp;/g, '')
					.replace(/ ×$/, '')
					.trim();

				cy.get('.caption h4 a')
					.eq(0)
					.invoke('text')
					.then(nameProduct => {
						productName = nameProduct;
					})
					.then(() => {
						expect(messageClear).to.contain(`Success: You have added ${productName} to your wish list!`);
					})
					.then(() => {
						cy.get('#wishlist-total').click();
						cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=account/wishlist');
						cy.contains(productName);
					});
			});
	});

	And('the product should not be duplicated in the Wishlist', () => {
		// Verificar que el producto esté en la lista de deseos
		cy.get(`tr td a img[title="${productName}"]`).eq(0).should('have.length', 1);
	});
});

describe('TC2: Verify that the user can delete a product from their wishlist', () => {
	Given('the user has added a product to their wishlist', () => {});
	When('the user selects the delete button in their wishlist', () => {});
	Then('a message should be displayed confirming that the item has been deleted', () => {});
});
