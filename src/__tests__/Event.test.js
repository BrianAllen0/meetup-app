import { render } from "@testing-library/react";
import Event from "../components/Event";

describe("<Event /> component", () => {
    let EventComponent;
    beforeEach(() => {
        EventComponent = render(<Event />);
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
    });

    test("renders event details button with the title (show details)", () => {
        expect(showDetailsButton).toBeInTheDocument();
    });

    test("event details are hidden by default", () => {
        expect(EventComponent.queryByText("Details")).not.toBeInTheDocument();
    });

    test("show details when user clicks 'show details' button", async () => {
        const user = userEvent.setup();
        await user.click(showDetailsButton);
        expect(EventComponent.queryByText("Details")).toBeInTheDocument();
    });

    test("hide details when user clicks 'hide details' button", async () => {
        expect(EventComponent.queryByText("Details")).not.toBeInTheDocument();
        const user = userEvent.setup();
        await user.click(hideDetailsButton);
        expect(EventComponent.queryByText("Details")).toBeInTheDocument();
        await user.click(hideDetailsButton);
        expect(EventComponent.queryByText("Details")).not.toBeInTheDocument();
    });
});
