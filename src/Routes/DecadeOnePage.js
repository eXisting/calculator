import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import NumbericSnaps from "../SnapsCalculator/NumbericSnaps";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateCapital,
  updateDecadeIncome,
  updateMonthlyContribution,
  updateTotalDecadeSavings,
  updatePercents,
  updateAge,
} from '../redux/decadeOneReducer';

const DecadeOnePage = () => {
  const dispatch = useDispatch();

  const {
    age,
    decadeIncome,
    monthlyContribution,
    totalDecadeSavings,
    savingsPercentage,
  } = useSelector((state) => state.decadeOnePage);

  const {
    startingSavings,
    startingAge,
  } = useSelector((state) => state.initialPage);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateAge(Number(startingAge) + 10));
    dispatch(updateCapital(startingSavings));
  }, []);

  useEffect(() => {
    calculateSavings();
  }, [decadeIncome, monthlyContribution, totalDecadeSavings, savingsPercentage]);

  const calculateSavings = () => {
    const contribution = Math.round(decadeIncome * (parseFloat(savingsPercentage) / 100) / 12);
    dispatch(updateMonthlyContribution(contribution));

    if (startingSavings === 0 && contribution === 0) {
      dispatch(updateTotalDecadeSavings(0));
      return;
    }

    const r = parseFloat(10) / 100;
    const n = 12;
    
    var t = 10;
    var P = parseFloat(startingSavings.replace(/[^0-9]/g, ''));

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
    navigate(`/decade-two`);
  };
  
  return (
    <Container>
      <Section backgroundColor="#111111" ignore maxHeight={"10%"}>
        <VerticalStack style={{ padding: '1vh' }}>
          <ApplicationTitle>
            <b>Wealth Calculator</b>
          </ApplicationTitle>
        </VerticalStack>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%">
        <span style={{ fontSize: '4vh', paddingTop:"5vh", textAlign:"center"}}>
          <b>DECADE One</b>
        </span>
      </Section>
      <Section ignore maxHeight="10%">
        <span style={{ color: '#0476bb', fontSize: '2.6vh', paddingLeft: '7vw', paddingRight: '7vw'}}>
          <b>Let’s start building your millions!</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%" style={{marginTop:"5vh"}}>
        <span style={{ fontSize: '2.5vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          <b>Your goal should be to save a minimum <br/> of 15% of income during each decade.</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%">
        <span style={{ fontSize: '2.5vh', paddingTop:"5vh", textAlign:"center"}}>
          Your savings between the ages of {startingAge} to {age}.
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
            />
            <NumbericSnaps 
              callback={updatePercentSavings}
              min={0} 
              max={100} 
              interval={1}
              initialValue={savingsPercentage}
              sign={'%'}
              signAtTheEnd={true}
            />
          </VerticalStack>
        </HorizontalStack>
        <span style={{ fontSize: '1.6vh', textAlign: 'center' }}><b>You’re saving ${monthlyContribution} each month?</b></span>
      </Section>
      <Section ignore maxHeight="10%" style={{paddingTop:"5vh"}}>
        <span style={{ color: '#0476bb', fontSize: '3vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          <b>You’re {age} and already saved ${totalDecadeSavings}!</b>
        </span>
      </Section>
      <Section justify={"top"} style={{paddingTop:'5vh'}}>
        <Button onClick={nextPage}>Next</Button>
      </Section>
    </Container>
  );
}

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
  width: 100%;
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const ApplicationTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  font-size: 2vh;
  text-align: center;
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "left"};
  justify-content: ${props => props.customJustify ? props.customJustify : "center"};
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

  justify-content: ${props => props.customJustify ? props.customJustify : "center"};
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

export default DecadeOnePage;