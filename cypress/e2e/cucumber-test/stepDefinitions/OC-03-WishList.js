import { And, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const { userEmail, userPassword } = Cypress.env('UserLogin');

context('Wishlist | ADD PRODUCT', () => {
	Given('that the user is logged in', () => {
		cy.visit('https://opencart.abstracta.us/index.php?route=account/login');
		cy.loginIn(userEmail, userPassword);
	});
	And('the user go to the pages of products', () => {
		cy.visit('https://opencart.abstracta.us/index.php?route=product/category&path=24');
	});
	describe('TC1 - The user should be able to add products to the Wishlist', () => {
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

	describe('TC2 - Verify that the user can delete a product from their wishlist', () => {
		Given('the user has added a product to their wishlist', () => {
			cy.visit('https://opencart.abstracta.us/index.php?route=product/category&path=24');
			cy.get('.button-group button .fa.fa-heart').eq(0).click();
			cy.get('#wishlist-total').click();
			cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=account/wishlist');
		});
		When('the user selects the delete button in their wishlist', () => {
			cy.get('[data-original-title="Remove"]').click({ multiple: true });
		});
		Then('a message confirming that the item has been deleted should be displayed', () => {
			cy.get('.alert.alert-success.alert-dismissible')
				.invoke('text')
				.then(alertRemoveMsg => {
					let alertMessage = alertRemoveMsg.trim().replace(/\n\s*×$/, '');
					expect(alertMessage).to.eq('Success: You have modified your wish list!');
				});
		});
		And('the product should not be visible on the navbar wishlist button', () => {
			cy.get('a[title="Wish List (1)"]').should('not.exist');
			cy.get('a[title="Wish List (0)"]').should('exist').should('be.visible');
		});
	});
	describe('TC3 - Verify that the favorite item is added to the shopping cart', () => {
		Given('the user adds a product to the favorites list', () => {
			cy.visit('https://opencart.abstracta.us/index.php?route=product/category&path=24');
			cy.get('.button-group button .fa.fa-heart').eq(0).click();
			cy.get('#wishlist-total').click();
			cy.url().should('contain', 'https://opencart.abstracta.us/index.php?route=account/wishlist');
		});

		When('the user clicks the add to shopping cart button', () => {
			cy.get('.btn.btn-primary[data-original-title="Add to Cart"]').click();
		});

		Then('the product should be added to the cart successfully', () => {
			// Add code here
			cy.wait(2000);
			cy.get('.alert.alert-success.alert-dismissible').should('exist').contains('Success: You have added');
		});

		And('the user removes the product from their shopping cart', () => {
			cy.get('#cart-total').click();
			cy.get('[title="Remove"]').click();

			cy.should('not.contain', 'Loading...');
			cy.get('#cart-total').click();
			cy.get('ul.dropdown-menu p').should('not.contain.text', 'Your shopping cart is empty!');
		});
	});
});
