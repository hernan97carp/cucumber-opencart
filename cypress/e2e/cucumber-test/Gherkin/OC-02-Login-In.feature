Feature: User Authentication on Open Cart Website

    Background:
        Given the user is on the login page

    Scenario: TC1:Successful Login with Valid Credentials
        When the user logs in with valid credentials
        Then the login should be successful

    Scenario Outline: TC2:Invalid Login Attempts with Invalid Credentials
        When the user attempts to log in with invalid credentials "<email>" and "<password>"
        Then the user should not be able to log in
        And a warning sign should be displayed on the page

        Examples:
            | email            | password |
            | user@example.com |          |
            |                  | password |
            | invalidemail.com | password |
            | user@example.com | pass     |
            | user@example.com | 123456   |

    Scenario Outline: TC3:Invalid Login Attempts with empty Credentials
        When the user attempts to log in with empty credentials "<email>" and "<password>"
        Then the user should be unable to log in
        And a warning sign should be displayed

        Examples:
            | email            | password |
            | user@example.com |          |
            |                  | password |
            |                  |          |

    Scenario Outline: TC4: Login and Logout Successfully
        When the user logs in
        And in the dropdown select log out option
        Then the user should be successfully logged out