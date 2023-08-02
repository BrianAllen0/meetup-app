Feature: Specify number of events
    Scenario: When user hasn't specified a number of events, display the default of 32
        Given user has the app open
        And no number of events has been specified
        When the event list loads
        Then the event list displays 32 events

    # Scenario: When the user specifies a number of events, the app displays that amount
    #     Given user has the app open
    #     And the event list is populated
    #     When the user specifies a number of events
    #     Then the event list displays the specified number of events