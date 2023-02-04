Feature: Booking tickets
    Scenario: successful ticket booking and check QR-code
        Given user selects the session date for 4 days
        When user selects the session and the free space of the standard category
        Then user sees the booking code "i/QR_code.png"

    
        Scenario: check select time
        Given user selects the session date for 4 days
        When user selects the session and the free space of the standard category
        Then user sees the start time of the session "21:00"

        Scenario: checking the unavailability of a place
        Given user selects the session date for 4 days
        When user selects the session and the occupied space
        Then user cannot click the book button

