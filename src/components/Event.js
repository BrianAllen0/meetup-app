import { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li className="event">
            <h1>{event && event.summary}</h1>
            <h2>{event && event.location}</h2>
            <p>{event && new Date(event.created).toUTCString()}</p>
            {showDetails ? <p className="details">{event && event.description}</p> : null}
            <button
                className="details-btn"
                onClick={() => {
                    showDetails ? setShowDetails(false) : setShowDetails(true);
                }}
            >
                {showDetails ? "Hide Details" : "Show Details"}
            </button>
        </li>
    );
};

export default Event;
