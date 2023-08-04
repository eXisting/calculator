import React, { Component } from "react";
import styled, { css } from "styled-components";
import NumbericSnaps from "./NumbericSnaps";

const SavingsSection = ({age, totalAge, totalAmount, monthlyCallback, yearsCallback, min, symbolsCountMax, customFormula, interval, initialSavingsValue}) => {
  return (
    <Container>
      <VerticalStack style={{margin:"2vh"}}>
        <HorizontalStack style={{marginTop:"1vh"}} space={"2vh"}>
          <span style={{ color: "gray",fontSize: '2vh', textAlign: 'right', width:"30vw" }}>Number of years?</span>
          <NumbericSnaps
            callback={yearsCallback} 
            min={0} 
            max={50}
            interval={5}
            initialValue={age}
            inputFieldHeight={"4vh"}
            maxLength={2}
          />
        </HorizontalStack>
        <HorizontalStack style={{marginTop:"1vh"}} space={"2vh"}>
          <span style={{ color: "gray", fontSize: '2vh', textAlign: 'right', width:"30vw" }}>Average Monthly savings</span>
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
      </VerticalStack>
      <SpanContainer>
        <span style={{color:"#0476bb", fontSize:"2.5vh"}}>
          You are {totalAge} and you saved ${totalAmount}!
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
margin-bottom: 2vh;
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
