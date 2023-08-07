import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

describe("<NumberOfEvents /> component", () => {
    test("renders number of events text input", () => {
        render(<NumberOfEvents eventNumber={32} onEventNumberChange={jest.fn} setErrorAlert={jest.fn} />);
        const numberTextBox = screen.getByPlaceholderText("32");
        expect(numberTextBox).toBeInTheDocument();
        expect(numberTextBox).toHaveClass("number-of-events-input");
    });

    test("default number is 32", async () => {
        render(<NumberOfEvents eventNumber={32} onEventNumberChange={jest.fn} setErrorAlert={jest.fn} />);

        const numberTextBox = screen.getByPlaceholderText("32");
        expect(numberTextBox).toHaveValue("32");
    });

    test("number of events text box value changes when the user types in it", async () => {
        render(<App />);

        const numberTextBox = screen.getByPlaceholderText("32");
        await userEvent.type(numberTextBox, "123");
        expect(numberTextBox).toHaveValue("123");
    });
});
