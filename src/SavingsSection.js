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
        min={5} 
        max={20} 
        interval={5}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw; /* 100% of viewport width */
`;

const MonthlySavingsTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  height: 28px;
  width: 100%;
  text-align: center;
  margin-top: 15px;
  font-size: 18px;
  display: block;
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
`;

export default SavingsSection;
