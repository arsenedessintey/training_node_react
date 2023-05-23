import { useState } from "react"

export const ServerHello = () => {
    const [message, setMessage] = useState<string | null>(null);

    const click = () => {
        fetch("/api")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }

    return (<div>
        {/* if message not nul display it */}
        {message ?? <p>message</p>}
        <hr />

        <button 
            type="button"
            onClick={click}
        >
            Click to say hello
        </button>
    </div>)
}