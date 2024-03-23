import React, { useState } from 'react';
import './Cookie.css'; // Importing the CSS file
import dogTreatImage from './img/dogtreat.png'; // Importing the image

function Cookie() {
    const [epochs, setEpochs] = useState(0); // Using useState hook to maintain state

    const shoot = () => {
        setEpochs(epochs + 1); // Updating the epochs state
    }
    
    const response = fetch('/app/api')
    console.log(response)
    console.log("hello")
    return (
        <div className="cookie-container">
            {/* Using the imported image and applying class names */}
            <img
                src={dogTreatImage}
                alt="Dog Treat"
                onClick={shoot}
                className="cookie-image" // Applying class for styling
            />
            <p className="cookie-paragraph"> Epochs: {epochs}</p>
        </div>
    );
}

export default Cookie;