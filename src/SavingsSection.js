import React, { Component } from "react";
import styled, { css } from "styled-components";
import SliderWithSnaps from "./SliderWithSnaps";

const SavingsSection = ({step, monthlyCallback, yearsCallback, min, max, interval}) => {
  return (
    <Container>
      <MonthlySavingsTitle>Number of years in <b>Step {step}</b></MonthlySavingsTitle>
      <SliderWithSnaps 
          callback={yearsCallback} 
          min={0} 
          max={20} 
          interval={5}
        />
      <NumberOfYears>What is your monthly savings?</NumberOfYears>
      <SliderWithSnaps
        callback={monthlyCallback} 
        min={min} 
        max={max} 
        interval={interval}
        sign={'$'}
      />
    </Container>
  );
}

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MonthlySavingsTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 100vw;
  text-align: center;
  font-size: 2.5vh; /* Adjust the value as needed */
  display: block;
  margin-top: 3.5vh; /* Adjust the value as needed */

  /* Styles for "Step" */
  > b {
    font-weight: bold;
    color: #21759f;
  }
`;

const NumberOfYears = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 100vw;
  text-align: center;
  font-size: 2.5vh; /* Adjust the value as needed */
  display: block;
  margin-top: 4vh; /* Adjust the value as needed */
`;

export default SavingsSection;
