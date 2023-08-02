import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
    test("When user hasn't specified a number of events, display the default of 32", ({ given, and, when, then }) => {
        let AppComponent;
        let AppDOM;
        let NumberOfEventsComponent;
        let EventListDOM;

        given("user has the app open", () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            NumberOfEventsComponent = AppDOM.querySelector("#number-of-events");
            EventListDOM = AppDOM.querySelector("#event-list");
        });
        and("no number of events has been specified", () => {
            let numberSelect = within(NumberOfEventsComponent).queryByRole("textbox");
            expect(numberSelect).toHaveValue("32");
        });
        when("the event list loads", () => {
            expect(EventListDOM).toBeInTheDocument();
        });
        then(/^the event list displays (\d+) events$/, async (arg0) => {
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test("When the user specifies a number of events, the app displays that amount", ({ given, and, when, then }) => {
        let AppComponent;
        let AppDOM;
        let NumberOfEventsComponent;
        let EventListDOM;

        given("user has the app open", () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            NumberOfEventsComponent = AppDOM.querySelector("#number-of-events");
            EventListDOM = AppDOM.querySelector("#event-list");
        });
        and("the event list is populated", async () => {
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                expect(EventListItems.length).toBeGreaterThan(0);
            });
        });
        when("the user specifies a number of events", async () => {
            let numberSelect = within(NumberOfEventsComponent).queryByRole("textbox");
            const user = userEvent.setup();
            await user.type(numberSelect, "{delete}");
            expect(numberSelect).toHaveValue("2");
        });
        then("the event list displays the specified number of events", async () => {
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                expect(EventListItems.length).toBe(2);
            });
        });
    });
});
