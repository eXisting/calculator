import React, { Component } from "react";
import styled, { css } from "styled-components";
import NumbericSnaps from "./NumbericSnaps";

const SavingsSection = ({age, totalAmount, monthlyCallback, min, symbolsCountMax, customFormula, interval, initialSavingsValue}) => {
  return (
    <Container>
      <HorizontalStack style={{marginTop:"1vh"}}>
        <span style={{ fontSize: '2.2vh', textAlign: 'right' }}>Monthly savings?</span>
        <NumbericSnaps 
          callback={monthlyCallback} 
          min={min} 
          interval={interval}
          sign={'$'}
          initialValue={initialSavingsValue}
          inputFieldHeight={"4vh"}
          maxLength={symbolsCountMax}
          custom={customFormula}
        />
      </HorizontalStack>
      <SpanContainer>
        <span style={{color:"#0476bb"}}>
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
padding-bottom: 1.5vh;
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
  margin-top: 1vh;

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
