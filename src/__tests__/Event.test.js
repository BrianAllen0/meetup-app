import { render } from "@testing-library/react";
<<<<<<< Updated upstream

describe("<Event /> component", () => {
    beforeEach(() => {
        showDetailsButton = EventComponent.queryByText("Show Details");
        hideDetailsButton = EventComponent.queryByText("Hide Details");
    });

    test("renders event title", () => {
        expect(
            EventComponent.queryByText(allEvents[0].summary)
        ).toBeInTheDocument();
    });

    test("renders event start time", () => {
        expect(
            EventComponent.queryByText(allEvents[0].created)
        ).toBeInTheDocument();
    });

    test("renders event location", () => {
        expect(
            EventComponent.queryByTestId(allEvents[0].location)
        ).toBeInTheDocument();
=======
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import Event from "../components/Event";

describe("<Event /> component", () => {
    let EventComponent;
    let allEvents;
    beforeEach(async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />);
    });

    test("renders event Title", () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test("renders event location", () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
>>>>>>> Stashed changes
    });

    test("renders event details button with the title (show details)", () => {
        expect(EventComponent.queryByText("show details")).toBeInTheDocument();
    });

    test("by default, event's details section should be hidden", () => {
        expect(EventComponent.container.querySelector(".details")).not.toBeInTheDocument();
    });

    test("shows the details section when the user clicks on the 'show details' button", async () => {
        const user = userEvent.setup();
        await user.click(EventComponent.queryByText("show details"));

        expect(EventComponent.container.querySelector(".details")).toBeInTheDocument();
        expect(EventComponent.queryByText("hide details")).toBeInTheDocument();
        expect(EventComponent.queryByText("show details")).not.toBeInTheDocument();
    });

    test("hides the details section when the user clicks on the 'hide details' button", async () => {
        const user = userEvent.setup();

        await user.click(EventComponent.queryByText("show details"));
        expect(EventComponent.container.querySelector(".details")).toBeInTheDocument();
        expect(EventComponent.queryByText("hide details")).toBeInTheDocument();
        expect(EventComponent.queryByText("show details")).not.toBeInTheDocument();

        await user.click(EventComponent.queryByText("hide details"));
        expect(EventComponent.container.querySelector(".details")).not.toBeInTheDocument();
        expect(EventComponent.queryByText("hide details")).not.toBeInTheDocument();
        expect(EventComponent.queryByText("show details")).toBeInTheDocument();
    });
});
