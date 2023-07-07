import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


const NumbericSnaps = ({ callback, min, max, interval, sign, initialValue, maxLength, custom, signAtTheEnd }) => {
  const [value, setValue] = useState(initialValue);

  const processInput = (inputValue) => {
    let numericValue = inputValue.replace(/[^0-9]/g, '');
  
    // Parse numericValue as a number
    let parsedValue = Number(numericValue);
  
    // Check if parsedValue is within the min and max boundaries
    if (parsedValue < min) {
      parsedValue = min.toString();
    } else if (parsedValue > max) {
      parsedValue = max.toString();
    }
  
    handleInputChange(parsedValue.toString());
  };  

  const resetValueOnFocus = () => {
    setValue('');
  };
  
  const handleBlur = () => {
    if (value === '') {
      setValue('0');
      callback('0');
    } else {
      setValue(value);
      callback(value);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const formatCurrency = (numericValue) => {
    if (sign === undefined) return numericValue;
    if (signAtTheEnd) return `${numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${sign}`;
    return `${sign}${numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const handleInputChange = (parsedValue) => {
    setValue(parsedValue);
    callback(parsedValue);
  };

  const increment = () => {
    if (custom) {
      const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const parsedValue = Number(numericValue);
      const newValue = parsedValue + Number(interval);

      if (max === undefined || newValue <= max) {
        const formattedValue = formatCurrency(newValue.toString());
        
        if (formattedValue.length > maxLength)
          return;

        processInput(formattedValue);
      }
      return;
    }
  
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      const newValue = parsedValue + interval;
  
      if (newValue <= max) {
        handleInputChange(newValue);
      }
    }
  };

  const decrement = () => {
    if (custom) {
      const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const parsedValue = Number(numericValue);
      const newValue = parsedValue - Number(interval);
  
      if (newValue >= min) {
        const formattedValue = formatCurrency(newValue.toString());
        processInput(formattedValue);
      }
      return;
    }
  
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      const newValue = parsedValue - interval;
  
      if (newValue >= min) {
        handleInputChange(newValue);
      }
    }
  };

  return (
    <HorizontalStack space={"0.9vw"}>
        <StyledButton onClick={decrement}>
          <AiOutlineMinus />
        </StyledButton>
        <StyledInput 
          maxLength={maxLength}
          width={"20vh"}
          type="text"
          value={formatCurrency(value)}
          onInput={e => processInput(e.target.value)}
          onFocus={resetValueOnFocus}
          onBlur={handleBlur}
        />
         <StyledButton onClick={increment}>
          <AiOutlinePlus />
        </StyledButton>
      </HorizontalStack>
  );
};

const StyledInput = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold; /* Change font-weight to bold */
  color: rgba(0, 0, 0, 1);
  font-size: 2.5vh;
  background-color: white;
  text-align: center;
  border-width: 0px;
  margin-top: 0;
  width: ${props => props.width};
  height: 4vh;
  border-radius: 0.5vh;
  border: 1px solid #000000;
`;

const StyledButton = styled.button`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: white;
  font-size: 2.5vh;
  background-color: #0476bb;
  text-align: center;
  border-width: 0px;
  border: 1px solid #000000;
  border-radius: 0.5vh;
  margin-top: 0;
  
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: white;
    color: white;
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  align-items: center;
  padding: 1vh;

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: center; /* Updated value */
`;

export default NumbericSnaps;
