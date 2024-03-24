import React, { useState } from 'react';


const Sliders = ({initialValue, onValueChange, minval, maxval }) => {
  const [value, setValue] = useState(initialValue);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onValueChange(newValue); // Call the callback function with the new value
  };

  return (
    <div className='slider-container'>
      <input
        type="range"
        min={minval}
        max={maxval}
        value={value}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default Sliders;