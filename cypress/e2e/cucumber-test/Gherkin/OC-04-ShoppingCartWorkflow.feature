Feature: SHOPPING CART WORKFLOW
    Background:
        Given the user is already registered
        And a product is added to the cart
    Scenario: TC1 - Verify Successful Purchase Process
        Given the user has filled out all the required inputs
        When the user confirms the order
        Then the user should have successfully made the purchase