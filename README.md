-------1-------
As a user,
I should be able to filter events by city,
So that I can see events relevant to me

Given that the filter is available,
When the user enters a city name,
Then the app filters to events only in that city

-------2-------
As a user,
I should be able to show/hide event details,
So that I can make a quick judgement about an event without having to commit to opening its page

Given there are events present on the main page,
When the user hits the "show/hide details" button,
Then the app appropriately shows or hides the details of the event clicked

-------3-------
As a user,
I should be able to specify number of events,
So that I have a managable amout of events to look through

Given the user is on the main page with events displayed,
When the user chooses the number of events,
Then the page displays the chosen number of events

-------4-------
As a user,
I should be able to use the app when offline,
So that I can access the info I need even without a connection

Given that the user has no connection,
When the user opens the app,
Then the app still functions offline

-------5-------
As a user,
I should be able to add an app shortcut to the home screen,
So that I can quickly and easily access the app

Given that the user has a device with a home screen and has made a shortcut,
When the user presses the home screen app shortcut,
Then the app should open

-------6-------
As a user,
I should be able to display charts visualizing event details,
So that I know which cities have the most events

Given that the user is on the main page,
When the user activates the function to display charts,
Then charts with event details should display

I'll be using serverless functions to handle the backend logic of my app.
In this case it will be users creating an account, and storing data they create through the app (favorites, upcoming, etc.).