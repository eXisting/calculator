import React, { Component } from "react";
import styled, { css } from "styled-components";
import NumbericSnaps from "./NumbericSnaps";

const SavingsSection = ({age, totalAmount, monthlyCallback, yearsCallback, min, max, interval, initialAgeValue, initialSavingsValue}) => {
  return (
    <Container>
      <VerticalStack>
        <HorizontalStack>
          <span style={{ color: '#ffffff', fontSize: '2.2vh', textAlign: 'right' }}><b>Number of years?</b></span>
          <NumbericSnaps 
            callback={yearsCallback} 
            min={0} 
            max={20} 
            interval={5}
            initialValue={initialAgeValue}
          />
        </HorizontalStack>
        <HorizontalStack>
          <span style={{ color: '#ffffff', fontSize: '2.2vh', textAlign: 'right' }}><b>Monthly savings?</b></span>
          <NumbericSnaps 
            callback={monthlyCallback} 
            min={min} 
            max={max} 
            interval={interval}
            sign={'$'}
            initialValue={initialSavingsValue}
          />
        </HorizontalStack>
      </VerticalStack>
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
font-size: 2vh;
padding-top: 3vh;
padding-bottom: 0.5vh;
text-align: center;
display: flex;
align-items: center;
justify-content: center;

  > b {
    font-weight: bold;
  }
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "center"};
  justify-content: center;
  margin-top: 4vh;

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: center; /* Updated value */
`;

export default SavingsSection;
