import { useState, useEffect } from "react";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import infoAlert from "./components/Alert";
import { extractLocations, getEvents } from "./api";

import "./App.css";

const App = () => {
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [infoAlert, setInfoAlert] = useState("");

    useEffect(() => {
        fetchData();
    }, [currentCity]);

    const fetchData = async () => {
        const allEvents = await getEvents();
        const filteredEvents = currentCity === "See all cities" ? allEvents : allEvents.filter((event) => event.location === currentCity);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
    };

    return (
        <div className="App">
            <div className="alerts-container">{infoAlert.length ? <InfoAlert text={infoAlert} /> : null}</div>
            <CitySearch setInfoAlert={setInfoAlert} allLocations={allLocations} setCurrentCity={setCurrentCity} />
            <NumberOfEvents />
            <EventList events={events} />
        </div>
    );
};

export default App;
