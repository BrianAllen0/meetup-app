import { useState, useEffect } from "react";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { InfoAlert } from "./components/Alert";
import { ErrorAlert } from "./components/Alert";
import { extractLocations, getEvents } from "./api";

import "./App.css";

const App = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [infoAlert, setInfoAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");

    useEffect(() => {
        fetchData();
    }, [currentCity]);

    const fetchData = async () => {
        const allEvents = await getEvents();
        setEvents(allEvents);
        setAllLocations(extractLocations(allEvents));
    };

    const updateEvent = (city, numberOfEvents) => {
        setCurrentCity(city);
        const filteredEvents = events.filter((event) => event.location === city);
        let sliced = [];
        if (city === "See all cities") {
            sliced = events.slice(0, numberOfEvents);
        } else {
            sliced = filteredEvents.slice(0, numberOfEvents);
        }
        setFilteredEvents(sliced);
    };

    const onEventNumberChange = (number) => {
        setCurrentNOE(number);
        updateEvent(currentCity, number);
    };

    return (
        <div className="App">
            <div className="alerts-container">
                {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
                {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
            </div>
            <CitySearch setInfoAlert={setInfoAlert} setErrorAlert={setErrorAlert} allLocations={allLocations} setCurrentCity={updateEvent} />
            <NumberOfEvents eventNumber={currentNOE} onEventNumberChange={onEventNumberChange} setErrorAlert={setErrorAlert} />
            <EventList events={filteredEvents.length > 0 ? filteredEvents : events} />
        </div>
    );
};

export default App;
