import React, { useState } from 'react';


const Sliders = ({ onValueChange }) => {
  const [value, setValue] = useState(1);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onValueChange(newValue); // Call the callback function with the new value
  };

  return (
    <div className='slider-container'>
      <input
        type="range"
        min="1"
        max="6"
        value={value}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default Sliders;