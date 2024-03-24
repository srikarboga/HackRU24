import React, { useState } from 'react';
import dogTreatImage from './img/dogtreat.png'; // Importing the image

function Cookie() {
    const [epochs, setEpochs] = useState(0); // Using useState hook to maintain state

    const shoot = () => {
        setEpochs(epochs + 1); // Updating the epochs state
    }
    
    return (
        <div className="cookie-container">
            {/* Using the imported image and applying class names */}
            <img
                src={dogTreatImage}
                alt="Dog Treat"
                onClick={shoot}
                className="cookie-image" // Applying class for styling
                height = "100 px"
            />
            <h1> Epochs: {epochs}</h1>
        </div>
    );
}

export default Cookie;