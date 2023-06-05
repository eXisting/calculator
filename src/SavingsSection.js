import React, { Component } from "react";
import styled, { css } from "styled-components";
import SliderWithSnaps from "./SliderWithSnaps";

const SavingsSection = ({step, age, totalAmount, monthlyCallback, yearsCallback, min, max, interval, initialAgeValue, initialSavingsValue}) => {
  return (
    <Container>
      <MonthlySavingsTitle>Number of years in <b>Step {step}</b></MonthlySavingsTitle>
      <SliderWithSnaps 
          callback={yearsCallback} 
          min={0} 
          max={20} 
          interval={5}
          initialValue={initialAgeValue}
        />
      <NumberOfYears>What is your monthly savings?</NumberOfYears>
      <SliderWithSnaps
        callback={monthlyCallback} 
        min={min} 
        max={max} 
        interval={interval}
        sign={'$'}
        initialValue={initialSavingsValue}
      />
      <SpanContainer>
        <span>
          You are <b>{age}</b> and you saved <b>${totalAmount}</b>!
        </span>
      </SpanContainer>
    </Container>
  );
}

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpanContainer = styled.div`
color: white;
font-size: 3vh;
padding-top: 4vh;
padding-bottom: 0.5vh;
text-align: center;
display: flex;
align-items: center;
justify-content: center;

  > b {
    font-weight: bold;
  }
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
