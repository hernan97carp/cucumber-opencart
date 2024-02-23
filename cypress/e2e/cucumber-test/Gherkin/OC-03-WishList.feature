Feature: Wishlist | Add Product

    Background:
        Given that the user is logged in
        And the user go to the pages of products
    Scenario: TC1: The user should be able to add products to the Wishlist
        When the user adds a product enabled in the store
        Then the product should appear on the users Wishlist page
        And the product should not be duplicated in the Wishlist
    Scenario: TC2: Verify that the user can delete a product from their wishlist
        Given the user has added a product to their wishlist
        When the user selects the delete button in their wishlist
        Then a message should be displayed confirming that the item has been deleted