import { render, within, waitFor } from "@testing-library/react";
import { getEvents } from "../api";
import EventList from "../components/EventList";

describe("<Eventlist /> component", () => {
    let EventListComponent;
    beforeEach(() => {
        EventListComponent = render(<EventList />);
    });

    test("has an element with 'list' role", () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });
    test("renders correct number of events", async () => {
        const allEvents = await getEvents();
        EventListComponent.rerender(<EventList events={allEvents} />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});

describe("<Eventlist /> integration", () => {
    test("renders a list of 32 events when the app is mounted and rendered", async () => {
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole("listitem");
            expect(EventListItems.length).toBe(32);
        });
    });

    test("renders the correct amount of events when specified", async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
        const numberOfEventsTextBox = NumberOfEventsDOM.queryByRole("textbox");

        await user.type(numberOfEventsTextBox, "3");

        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole("listitem");
            expect(EventListItems.length).toBe(3);
        });
    });
});
