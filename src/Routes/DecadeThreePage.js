import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import NumbericSnaps from "../SnapsCalculator/NumbericSnaps";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCapital,
  updateAge,
  updateDecadeIncome,
  updateMonthlyContribution,
  updateTotalDecadeSavings,
  updatePercents,
} from '../redux/decadeThreeReducer';
import HeaderComponent from "../Common/HeaderComponent";

const DecadeThreePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    age: decadeTwoAge,
    totalDecadeSavings: decadeTwoTotalSavings,
  } = useSelector(
    (state) => state.decadeTwoPage
  );
  
  const { 
    decadeIncome,
    monthlyContribution,
    age: decadeThreeAge,
    totalDecadeSavings: decadeThreeTotalSavings,
    savingsPercentage,
  } = useSelector(
    (state) => state.decadeThreePage
  );

  useEffect(() => {
    dispatch(updateAge(Number(decadeTwoAge) + 10));
    dispatch(updateCapital(decadeTwoTotalSavings));
  }, []);

  useEffect(() => {
    calculateSavings();
  }, [monthlyContribution, decadeIncome, savingsPercentage]);

  const calculateSavings = () => {
    const contribution = Math.round(decadeIncome * (parseFloat(savingsPercentage) / 100) / 12);
    dispatch(updateMonthlyContribution(contribution));

    if (decadeTwoTotalSavings === 0 && contribution === 0) {
      dispatch(updateTotalDecadeSavings(0));
      return;
    }

    const r = parseFloat(10) / 100;
    const n = 12;
    
    var t = 10;
    var P = parseFloat(decadeTwoTotalSavings.replace(/[^0-9]/g, ''));

    const futureValue = P * Math.pow(1 + (r / n), n * t) + contribution * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));

    const saved = Math.round(futureValue).toLocaleString();
    dispatch(updateTotalDecadeSavings(saved));
  };

  const updateDecadeValue = value => {
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateDecadeIncome(numericValue));
  };

  const updatePercentSavings = value => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updatePercents(numericValue));
  };

  const nextPage = () => {
    navigate(`/pre-result`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section backgroundColor="white" ignore maxHeight="10%">
        <span style={{ fontSize: '4vh', paddingTop:"2vh", textAlign:"center"}}>
          <b>Decade 3</b>
        </span>
      </Section>
      <Section ignore width="80%">
        <HorizontalStack>
          <DecadeHNumber>1</DecadeHNumber>
          <DecadeHNumber>2</DecadeHNumber>
          <DecadeHNumber style={{backgroundColor:"black", color:"white"}}>3</DecadeHNumber>
        </HorizontalStack>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%" style={{marginTop:"5vh"}}>
        <span style={{ fontSize: '2.8vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          The third decade is the most important wealth building time period!
        </span>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%">
        <span style={{ color:"#0476bb", fontSize: '2.8vh', paddingTop:"5vh", textAlign:"center"}}>
          Your savings between the ages of {decadeTwoAge} to {decadeThreeAge}.
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{width:"90%", paddingTop:"2vh"}}>
        <HorizontalStack>
          <VerticalStack align="end" space="2vh">
            <span style={{ fontSize: '1.6vh', textAlign: 'right', color: 'gray' }}>What is your average <br/>income estimate for the decade?</span>
            <span style={{ fontSize: '1.6vh', textAlign: 'right', color: 'gray' }}>What % of your income?</span>
          </VerticalStack>
          <VerticalStack align="center">
            <NumbericSnaps 
              callback={updateDecadeValue}
              min={0} 
              maxLength={15} 
              interval={5000}
              initialValue={decadeIncome}
              sign={'$'}
              custom={true}
              inputFieldHeight={"4vh"}
            />
            <NumbericSnaps 
              callback={updatePercentSavings}
              min={0} 
              max={100} 
              interval={1}
              initialValue={savingsPercentage}
              sign={'%'}
              signAtTheEnd={true}
              inputFieldHeight={"4vh"}
            />
          </VerticalStack>
        </HorizontalStack>
        <span style={{ fontSize: '2.2vh', textAlign: 'center' }}><b>You’re saving ${monthlyContribution} each month?</b></span>
      </Section>
      <Section ignore maxHeight="10%" style={{marginTop:"2vh"}}>
        <span style={{ color: '#0476bb', fontSize: '2.8vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          You’re {decadeThreeAge} and already saved ${decadeThreeTotalSavings}!
        </span>
      </Section>
      <Section justify={"top"} style={{marginTop:"2vh"}}>
        <Button onClick={nextPage}>Next</Button>
      </Section>
    </Container>
  );
}

const CheckmarkIcon = styled.svg`
  width: 4vh;
  height: 4vh;
  margin-right: 5px;
  align-self: flex-start;
`;

const CheckmarkPath = styled.path`
  fill-rule: evenodd;
`;

const CheckmarkIconComponent = () => (
  <CheckmarkIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <CheckmarkPath
      fill="currentColor"
      d="M5.646 10.854a.5.5 0 0 1-.708 0L2.146 7.354a.5.5 0 0 1 .708-.708l2.646 2.646 6.646-6.646a.5.5 0 1 1 .708.708L5.646 10.854z"
    />
  </CheckmarkIcon>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 100%;
  border: 0.2vh solid #000000;
  max-height: 100vh; /* Set the maximum height to screen height */
  overflow: auto; /* Enable scrolling when content overflows */
  margin-right: 2vw;
`;

const Section = styled.section`
  flex: ${props => (props.ignore ? 'none' : '1')};
  flex-direction: column; /* Add this line */
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  align-items: ${props => props.align ? props.align : "center"}};
  width: ${props => (props.width ? props.width : "100%")};
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "left"};
  justify-content: left;
  margin-top: ${props => props.ignoreMarginTop ? '0px' : '0.5vh'};
  padding: ${props => props.ignorePadding ? '0px' : '0.5vh'};

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

const DecadeHNumber = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: black;
  font-size: 2.5vh;
  background-color: #white;
  text-align: center;
  border-width: 0px;
  border: 1px solid #000000;
  border-radius: 0.5vh;
  margin-top: 0;

  height: 5vh;
  width: 12vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #0476bb;
  color: #ffffff;
  border: none;
  border-radius: 1vh;
  height: 5vh;
  width: ${props => props.width ? props.width :"50%"};
  font-size: 2vh;
  padding: 1vh;
  cursor: pointer;
`;

export default DecadeThreePage;