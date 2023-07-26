import { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            <h1>Details: </h1>
            {showDetails ? (
                <div>
                    <button onClick={() => setShowDetails(false)}>
                        Hide Details
                    </button>
                    <h1>Details</h1>
                </div>
            ) : (
                <div>
                    <button onClick={() => setShowDetails(true)}>
                        Show Details
                    </button>
                </div>
            )}
        </div>
    );
};

export default Event;
