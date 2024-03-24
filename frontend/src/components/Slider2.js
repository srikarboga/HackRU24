import React, { useState } from 'react';


const Sliders2 = ({ onValueChange2 }) => {
  const [value2, setValue2] = useState(1);

  const handleSliderChange2 = (event) => {
    const newValue2 = event.target.value;
    setValue2(newValue2);
    onValueChange2(newValue2); // Call the callback function with the new value
  };

  return (
    <div className='slider-container'>
      <input
        type="range"
        min="1"
        max="6"
        value={value2}
        onChange={handleSliderChange2}
      />
    </div>
  );
};

export default Sliders;