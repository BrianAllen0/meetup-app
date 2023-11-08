import { useState } from "react";

const NumberOfEvents = ({ setErrorAlert, eventNumber, setCurrentNOE }) => {
    const handleInputChanged = (event) => {
        const value = Number(event.target.value);
        if (value <= 0) {
            setErrorAlert("Please choose a positive number");
        } else {
            setErrorAlert("");
        }
        console.log("Input Value", value);
        setCurrentNOE(value);
    };

    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events-input">Number of Events: </label>
            <input type="text" placeholder="32" id="number-of-events-input" className="number-of-events-input" onChange={handleInputChanged} />
        </div>
    );
};

export default NumberOfEvents;
