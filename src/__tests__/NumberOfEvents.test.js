import { render } from "@testing-library/react";
<<<<<<< Updated upstream
=======
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
>>>>>>> Stashed changes

describe("<NumberOfEvents /> component", () => {
    beforeEach(() => {
<<<<<<< Updated upstream
        numberInput = NumberOfEventsComponent.queryByRole("textbox");
=======
        NumberOfEventsComponent = render(<NumberOfEvents />);
>>>>>>> Stashed changes
    });

    test("renders number of events text input", () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
        expect(numberTextBox).toBeInTheDocument();
        expect(numberTextBox).toHaveClass("number-of-events-input");
    });

    test("default number is 32", async () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
        expect(numberTextBox).toHaveValue("32");
    });

    test("number of events text box value changes when the user types in it", async () => {
        const user = userEvent.setup();
        const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
        await user.type(numberTextBox, "{backspace}");
        expect(numberTextBox).toHaveValue("3");
    });
});
