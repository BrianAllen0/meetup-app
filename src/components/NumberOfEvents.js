import { useState } from "react";

const NumberOfEvents = ({ setErrorAlert, eventNumber, onEventNumberChange }) => {
    const handleInputChanged = (event) => {
        const value = Number(event.target.value);
        if (value <= 0) {
            setErrorAlert("Please choose a positive number");
        } else {
            setErrorAlert("");
        }
        onEventNumberChange(value);
    };

    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events-input">Number of Events: </label>
            <input
                onFocus={() => {
                    onEventNumberChange("");
                }}
                type="text"
                placeholder="32"
                id="number-of-events-input"
                className="number-of-events-input"
                value={eventNumber}
                onChange={handleInputChanged}
            />
        </div>
    );
};

export default NumberOfEvents;
