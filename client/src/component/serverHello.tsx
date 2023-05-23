import { useState } from "react";

export const ServerHello = () => {
    // State to store the message received from the server
    const [message, setMessage] = useState<string | null>(null);

    // Function to handle the button click event
    const click = () => {
        // Fetch data from the "/api" endpoint
        fetch("/api")
            .then((res) => res.json()) // Parse the response as JSON
            .then((data) => setMessage(data.message)); // Update the message state with the received message
    }

    return (
        <div>
            {/* Display the content of the message variable if it is not null */}
            {/* use '{}' to include javascript inside html */}
            {message && <p>{message}</p>}
            <hr />

            <button
                type="button"
                onClick={click} // Call the click function when the button is clicked
            >
                Click to say hello
            </button>
        </div>
    );
}
