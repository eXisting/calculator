import React, { Component } from "react";
import styled, { css } from "styled-components";
import NumbericSnaps from "./NumbericSnaps";

const SavingsSection = ({fromAge,toAge, totalAmount, monthlyCallback, min, symbolsCountMax, customFormula, interval, initialSavingsValue}) => {
  return (
    <Container>
      <HorizontalStack style={{marginTop:"1vh"}} space={"2vh"}>
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
          Your savings between {fromAge} to {toAge} and you saved ${totalAmount}!
        </span>
      </SpanContainer>
    </Container>
  );
}

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Tahoma;
  font-style: normal;
`;

const SpanContainer = styled.div`
color: white;
font-size: 2vh;
padding: 2vh;
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
