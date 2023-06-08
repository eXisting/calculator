import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


const NumbericSnaps = ({ callback, min, max, interval, sign, initialValue, maxLength }) => {
  const [value, setValue] = useState(initialValue);

  const formatCurrency = (numericValue) => {
    if (sign === undefined) return numericValue;
    return `$${numericValue.toLocaleString()}`;
  };

  const handleInputChange = (parsedValue) => {
    setValue(parsedValue);
    callback(parsedValue);
  };

  const increment = () => {
    const newValue = value + interval;
    const newValueInRange = Math.min(newValue, max);
    handleInputChange(newValueInRange);
  };

  const decrement = () => {
    const newValue = value - interval;
    const newValueInRange = Math.max(newValue, min);
    handleInputChange(newValueInRange);
  };

  return (
    <HorizontalStack space={"1vw"}>
        <StyledButton onClick={decrement}>
          <AiOutlineMinus />
        </StyledButton>
        <StyledInput 
          maxLength={maxLength}
          width={"40%"}
          type="text"
          value={formatCurrency(value)}
          disabled // Disable manual input
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
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 1.8vh;
  background-color: white;
  text-align: center;
  border-width: 0px;
  margin-top: 0;
  width: ${props => props.width};
  height: 3vh;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 1.8vh;
  background-color: white;
  text-align: center;
  border-width: 0px;
  margin-top: 0;
  width: 15%;
  height: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: #0476bb;
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
