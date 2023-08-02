import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
    test("User can show additional event details", ({ given, when, then }) => {
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        let Event;
        let EventDetails;
        let EventDetailsShowHideButton;

        given("the event details are hidden", async () => {
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                expect(EventListItems.length).toBe(32);
                Event = EventListItems.at(0);
            });
            EventDetails = within(Event).queryByRole("paragraph");
            EventDetailsShowHideButton = within(Event).queryByRole("button");
            expect(EventDetails).not.toBeInTheDocument();
        });
        when("the user clicks the show details button", async () => {
            const user = userEvent.setup();
            await user.click(EventDetailsShowHideButton);
        });
        then("the event details are shown", () => {
            expect(EventDetails).toBeInTheDocument();
        });
    });

    test("User can hide additional event details", ({ given, when, then }) => {
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        let Event;
        let EventDetails;
        let EventDetailsShowHideButton;

        given("the event details are shown", async () => {
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                Event = EventListItems.at(0);
            });
            EventDetails = within(Event).queryByRole("paragraph");
            EventDetailsShowHideButton = within(Event).queryByRole("button");
            expect(EventDetails).not.toBeInTheDocument();
            const user = userEvent.setup();
            await user.click(EventDetailsShowHideButton);
            expect(EventDetails).toBeInTheDocument();
        });
        when("the user clicks the hide details button", async () => {
            const user = userEvent.setup();
            await user.click(EventDetailsShowHideButton);
        });
        then("the event details are hidden", () => {
            expect(EventDetails).not.toBeInTheDocument();
        });
    });
});
