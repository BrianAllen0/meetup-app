Feature: Show and hide event details
    Scenario: User can show additional event details
        Given the event details are hidden
        When the user clicks the show details button
        Then the event details are shown

    Scenario: User can hide additional event details
        Given the event details are shown
        When the user clicks the hide details button
        Then the event details are hidden
