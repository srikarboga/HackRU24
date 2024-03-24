import React, { useState } from 'react';

const Sliders = ({ onValueChange }) => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onValueChange(newValue); // Call the callback function with the new value
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default Sliders;