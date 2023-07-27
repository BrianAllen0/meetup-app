import { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            <h1>{event && event.summary}</h1>
            {showDetails ? (
                <div>
                    <button onClick={() => setShowDetails(false)}>Hide Details</button>
                    <p>{event.description}</p>
                </div>
            ) : (
                <div>
                    <button onClick={() => setShowDetails(true)}>Show Details</button>
                </div>
            )}
        </div>
    );
};

export default Event;
