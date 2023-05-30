import React, { useState } from 'react';
import Slider from 'rc-slider';
import styled, { css } from "styled-components";
import 'rc-slider/assets/index.css';

const SliderWithSnaps = ({ callback, min, max, interval, sign }) => {
  const [value, setValue] = useState(min);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };

  const handleSliderSnap = (newValue) => {
    const snappedValue = Math.round(newValue / interval) * interval;
    setValue(snappedValue);

    callback(snappedValue);
  };

  const marks = {};
  for (let i = min; i <= max; i += interval) {
    marks[i] = i;
  }

  const selectedMarkStyle = {
    fontWeight: 'bold',
    height: '16px',
    color: '#007BFF',
  };

  const regularMarkStyle = {
    fontWeight: 'regular',
    height: '16px',
    color: '#ffffff',
  };

  const handleStyle = {
    borderColor: '#007BFF',
    borderWidth: '7px',
    height: '30px',
    width: '30px',
    marginTop: '-10px',
    backgroundColor: '#fff',
  };

  const dotStyle = {
    backgroundColor: '#fff',
  };

  return (
    <Container>
      <Slider
        min={min}
        max={max}
        step={interval}
        value={value}
        onChange={handleSliderChange}
        onAfterChange={handleSliderSnap}
        railStyle={{ backgroundColor: '#ccc', height: '8px', borderRadius: '4px' }}
        trackStyle={{ backgroundColor: '#007BFF', height: '8px', borderRadius: '4px' }}
        handleStyle={handleStyle}
        dotStyle={dotStyle}
      />
      <div style={{ display: 'flex', marginTop: '15px' }}>
        {Array.from({ length: (max - min) / interval + 1 }).map((_, index) => {
          const mark = min + index * interval;
          const isMarkSelected = value === mark;
          const markPosition = (mark - min) / (max - min) * 100; // Calculate the position based on percentage

          return (
            <div key={mark} style={{ position: 'relative', flex: '1' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: `${markPosition}%`,
                  transform: 'translateX(-50%)',
                  width: '3px',
                  height: '20px',
                  backgroundColor: isMarkSelected ? '#007BFF' : '#ffffff',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '5px',
                  left: `${markPosition}%`,
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  fontSize: '15px',
                  marginTop: '10px',
                  ...(isMarkSelected ? selectedMarkStyle : regularMarkStyle),
                }}
              >
                {sign}{mark}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 30px;
`;

export default SliderWithSnaps;
