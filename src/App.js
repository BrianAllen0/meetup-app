import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";

const App = () => {
    return (
        <div className="App">
            <CitySearch />
            <EventList />
        </div>
    );
};

export default App;
