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
      <div style={{ display: 'flex', marginTop: '15px' }}>
        {Array.from({ length: (max - min) / interval + 1 }).map((_, index) => {
          const mark = min + index * interval;
          const isMarkSelected = value === mark;
          const markPosition = (mark - min) / (max - min) * 100; // Calculate the position based on percentage

          const isEdgeElement = index == 0 || index == (max - min) / interval;

          return (
            <div key={mark} style={{ position: 'relative', flex: '1' }}>
              {(isMarkSelected || isEdgeElement) && (
                <div style={{
                    position: 'absolute',
                    top: isMarkSelected ? '-40px' : isEdgeElement ? '-30px' : '0px',
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
              )}
              <div
                style={{
                  position: 'absolute',
                  top: isMarkSelected ? '-15px' : '-3px',
                  left: `${markPosition}%`,
                  transform: 'translateX(-50%)',
                  width: '3px',
                  height: isMarkSelected ? '20px' : '8px',
                  backgroundColor: isMarkSelected ? '#007BFF' : '#ffffff',
                }}
              />
            </div>
          );
        })}
      </div>
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
    </Container>
  );
};

const Container = styled.div`
  margin-left: 50px;
  margin-right: 50px;
`;

export default SliderWithSnaps;
