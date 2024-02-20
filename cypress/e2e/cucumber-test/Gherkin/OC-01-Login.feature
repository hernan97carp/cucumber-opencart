Feature:OPEN CART | sign up

    Background: preconditions visit the page
        Given the user is on the home page

    Scenario:TC1:User successfully registers on the platform
        When the user clicks on the My Account dropdown
        And selects the "Register" option
        Then they should be redirected to the registration section
        And the user fills in all the required fields
        Then the user should be successfully registered

    Scenario: TC2: User already registered attempts registration again
        Given the user is on the registration section
        When the user fills in the registration form with existing credentials
        Then an error message should be displayed indicating the user is already registered
        And the registration process should not proceed

    Scenario: TC3: User attempts registration with incomplete information
        Given the user visits the registration section
        When the user fills in the registration form with incomplete information
        Then an error message should be displayed prompting the user to complete all necessary fields
        And the user should not be successfully registered

    Scenario: TC4: User attempts registration with invalid credentials
        Given the user is on the url register
        When the user fills in the registration form with invalid credentials
        Then an error message should be displayed indicating the issue with the provided information
        And the registration process should not proceed

    Scenario: TC5: User registers from different parts of the site
        Given the user is on different sections of the site
        When the user navigates to the registration page
        Then all required fields must be completed for registration
        And the user should be able to successfully register
