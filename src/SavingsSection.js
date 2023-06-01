import React, { Component } from "react";
import styled, { css } from "styled-components";
import SliderWithSnaps from "./SliderWithSnaps";

const SavingsSection = ({monthlyCallback, yearsCallback, min, max, interval}) => {
  return (
    <Container>
      <MonthlySavingsTitle>What are your monthly savings?</MonthlySavingsTitle>
      <SliderWithSnaps 
          callback={monthlyCallback} 
          min={min} 
          max={max} 
          interval={interval}
          sign={'$'}
        />
      <NumberOfYears>Number of years you will save.</NumberOfYears>
      <SliderWithSnaps
        callback={yearsCallback} 
        min={0} 
        max={20} 
        interval={5}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw; /* 100% of viewport width */
  
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MonthlySavingsTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  height: 28px;
  width: 100%;
  text-align: center;
  font-size: 18px;
  display: block;
  margin-bottom: 30px;
`;

const NumberOfYears = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  height: 28px;
  width: 100%;
  text-align: center;
  font-size: 18px;
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default SavingsSection;
