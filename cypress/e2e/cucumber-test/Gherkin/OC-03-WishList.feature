Feature: Wishlist | ADD PRODUCT

    Background:
        Given that the user is logged in
        And the user go to the pages of products

    Scenario: TC1 - The user should be able to add products to the Wishlist
        When the user adds a product enabled in the store
        Then the product should appear on the users Wishlist page
        And the product should not be duplicated in the Wishlist

    Scenario: TC2 - Verify that the user can delete a product from their wishlist
        Given the user has added a product to their wishlist
        When the user selects the delete button in their wishlist
        Then a message confirming that the item has been deleted should be displayed
        And the product should not be visible on the navbar wishlist button

    Scenario:TC3 - Verify that the favorite item is added to the shopping cart
        Given the user adds a product to the favorites list
        When the user clicks the add to shopping cart button
        Then the product should be added to the cart successfully
        And the user removes the product from their shopping cart

