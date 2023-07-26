import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
        numberInput = NumberOfEventsComponent.queryByRole("textbox");
    });
    test("contains textbox", () => {
        expect(numberInput).toBeInTheDocument();
    });
    test("default input value is 32", () => {
        expect(numberInput.value).toBe("32");
    });
    test("input box responds to typing", async () => {
        const user = userEvent.setup();
        let initialValue = numberInput.value;
        await user.type(numberInput, "{backspace}");
        let newValue = numberInput.value;
        expect(newValue).not.toBeGreaterThan(initialValue);
    });
});
