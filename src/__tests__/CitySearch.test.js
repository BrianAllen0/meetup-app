import { render } from "@testing-library/react";
import CitySearch from "../components/CitySearch";
import userEvent from "@testing-library/user-event";
import { extractLocations, getEvents } from "../api";

describe("<CitySearch /> component", () => {
    let CitySearchComponent;
    let cityTextBox;
    let suggestionList;

    beforeEach(() => {
        CitySearchComponent = render(<CitySearch />);
        cityTextBox = CitySearchComponent.queryByRole("textbox");
        suggestionList = CitySearchComponent.queryByRole("list");
    });

    test("renders text input", () => {
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass("city");
    });

    test("suggestions list is hidden by default", () => {
        expect(suggestionList).not.toBeInTheDocument();
    });

    test("renders a list of suggestions when city textbox gains focus", async () => {
        const user = userEvent.setup();
        await user.click(cityTextBox);
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass("suggestions");
    });

    test("updates list of suggestions correctly when user types in city textbox", async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(
            <CitySearch allLocations={allLocations} />
        );

        const cityTextBox = CitySearchComponent.queryByRole("textbox");
        await user.type(cityTextBox, "Berlin");

        const suggestions = allLocations
            ? allLocations.filter((location) => {
                  return (
                      location
                          .toUpperCase()
                          .indexOf(cityTextBox.value.toUpperCase()) > -1
                  );
              })
            : [];

        const suggestionListItems =
            CitySearchComponent.queryAllByRole("listitem");
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });

    test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(
            <CitySearch allLocations={allLocations} />
        );

        const cityTextBox = CitySearchComponent.queryByRole("textbox");
        await user.type(cityTextBox, "Berlin");

        const BerlinGermanySuggestion =
            CitySearchComponent.queryAllByRole("listitem")[0];

        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});
