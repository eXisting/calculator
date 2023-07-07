import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled, { css } from "styled-components";
import SavingsSection from "./SavingsSection";
import { BsArrowLeft } from 'react-icons/bs';
import NumbericSnaps from "./NumbericSnaps";
import { useDispatch, useSelector } from "react-redux";

import { updateStartingSavings, updateStartingAge } from '../redux/initialValuesReducer';

import {
  updateMonthlyContribution as updateFirstDecadeMonthlyContribution,
  updateAge as updateFirstDecadeAge,
  updateTotalDecadeSavings as updateFirstDecadeTotalSavings,
} from '../redux/decadeOneReducer';

import {
  updateMonthlyContribution as updateSecondDecadeMonthlyContribution,
  updateAge as updateSecondDecadeAge,
  updateTotalDecadeSavings as updateSecondDecadeTotalSavings,
} from '../redux/decadeTwoReducer';

import {
  updateMonthlyContribution as updateThirdDecadeMonthlyContribution,
  updateAge as updateThirdDecadeAge,
  updateTotalDecadeSavings as updateThirdDecadeTotalSavings,
} from '../redux/decadeThreeReducer';

const CalculatorWithSnaps = () => {
  const dispatch = useDispatch();

  const {
    startingSavings,
    startingAge,
  } = useSelector(
    (state) => state.initialPage
  );
  
  const {
    monthlyContribution: decadeOneMonthlyContribution,
    age: decadeOneAge,
    totalDecadeSavings: decadeOneTotalSavings,
  } = useSelector(
    (state) => state.decadeOnePage
  );

  const {
    monthlyContribution: decadeTwoMonthlyContribution,
    age: decadeTwoAge,
    totalDecadeSavings: decadeTwoTotalSavings,
  } = useSelector(
    (state) => state.decadeTwoPage
  );

  const {
    monthlyContribution: decadeThreeMonthlyContribution,
    age: decadeThreeAge,
    totalDecadeSavings: decadeThreeTotalSavings,
  } = useSelector(
    (state) => state.decadeThreePage
  );

  useEffect(() => {
    let age = Number(startingAge);

    dispatch(updateFirstDecadeAge(age + 10));
    dispatch(updateSecondDecadeAge(age + 20));
    dispatch(updateThirdDecadeAge(age + 30));
  }, [startingAge]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeOneMonthlyContribution, startingSavings, updateFirstDecadeTotalSavings);
  }, [decadeOneMonthlyContribution, startingAge, startingSavings]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeTwoMonthlyContribution, decadeOneTotalSavings, updateSecondDecadeTotalSavings);
  }, [decadeTwoMonthlyContribution, decadeOneTotalSavings]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeThreeMonthlyContribution, decadeTwoTotalSavings, updateThirdDecadeTotalSavings);
  }, [decadeThreeMonthlyContribution, decadeTwoTotalSavings]);

  const updateDecadeTotalSavings = (contribution, savings, updateAction) => {
    if (savings === 0 && contribution === 0) {
      dispatch(updateAction(0));
      return;
    }

    const r = parseFloat(10) / 100;
    const n = 12;
    
    var t = 10;
    var P = parseFloat(savings.replace(/[^0-9]/g, ''));

    const futureValue = P * Math.pow(1 + (r / n), n * t) + contribution * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));

    const saved = Math.round(futureValue).toLocaleString();
    dispatch(updateAction(saved));
  };

  const initialDepositChanged = (value) => {
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateStartingSavings(numericValue));
  };

  const initialAgeChanged = (value) => {
    dispatch(updateStartingAge(value));
  };

  const decadeOneContributionChanged = (value) => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateFirstDecadeMonthlyContribution(numericValue));
  };

  const decadeTwoContributionChanged = (value) => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateSecondDecadeMonthlyContribution(numericValue));
  };

  const decadeThreeContributionChanged = (value) => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateThirdDecadeMonthlyContribution(numericValue));
  };
  
  return (
    <Container>
      <Section backgroundColor="#111111" ignore maxHeight={"10%"}>
        <VerticalStack style={{ padding: '2vh' }}>
          <ApplicationTitle>
            <b>Wealth Calculator</b>
          </ApplicationTitle>
        </VerticalStack>
      </Section>
      <Section backgroundColor="#0476bb" ignore maxHeight={"20%"} style={{"height":"12vh"}}>
        <HorizontalStack space="1vw">
          <span style={{ color: '#ffffff', fontSize: '4vh', textAlign: 'center', marginRight: '2vw'}}>
            <b>Your total savings! <br></br> ${decadeThreeTotalSavings}</b>
          </span>
        </HorizontalStack>
      </Section>
      <Section ignore maxHeight={"0.8vh"} style={{"height" : "0.8vh"}}></Section>
      <Section backgroundColor="#808080" ignore maxHeight={"25%"}>
          <HorizontalStack space="3vh" align="right">
            <span style={{ color: '#ffffff', fontSize: '2vh', textAlign: 'right' }}><b>How old are you?</b></span>
            <StyledInput
              value={startingAge}
              selectTextOnFocus={true}
              maxLength={2}
              width={"10%"}
              onInput={e => initialAgeChanged(e.target.value)}
            />
          </HorizontalStack>
      </Section>
      <Section ignore style={{padding:"1vh"}}>
        <HorizontalStack customPadding={"0px"}>
          <span style={{ fontSize: '2.2vh', textAlign: 'right' }}>What are you total <br/>savings today?</span>
          <NumbericSnaps 
              callback={initialDepositChanged} 
              min={0} 
              maxLength={15}
              interval={1000}
              sign={'$'}
              initialValue={startingSavings}
              custom={true}
            />
        </HorizontalStack>
      </Section>
      <Section ignore style={{border:"1px solid #000000", height:"3vh"}} backgroundColor="#C0C0C0">
        <span style={{ color: 'black', fontSize: '1.8vh', textAlign: 'center' }}>Decade 1</span>
      </Section>
      <Section ignore maxHeight={"50%"}>
        <SavingsSection
          age={decadeOneAge}  
          totalAmount={decadeOneTotalSavings}
          monthlyCallback={decadeOneContributionChanged}
          min={0}
          max={10000}
          interval={100}
          initialSavingsValue={decadeOneMonthlyContribution}
        />
      </Section>
      <Section ignore style={{border:"1px solid #000000", height:"3vh"}} backgroundColor="#C0C0C0">
        <span style={{ color: 'black', fontSize: '1.8vh', textAlign: 'center' }}>Decade 2</span>
      </Section>
      <Section ignore align="top" maxHeight={"50%"}>
        <SavingsSection 
          age={decadeTwoAge}  
          totalAmount={decadeTwoTotalSavings}
          monthlyCallback={decadeTwoContributionChanged} 
          min={0} 
          max={10000} 
          interval={500}
          initialSavingsValue={decadeTwoMonthlyContribution}
          />
      </Section>
      <Section ignore style={{border:"1px solid #000000", height:"3vh" }} backgroundColor="#C0C0C0">
        <span style={{ color: 'black', fontSize: '1.8vh', textAlign: 'center' }}>Decade 3</span>
      </Section>
      <Section ignore align="top" maxHeight={"50%"}>
        <SavingsSection 
          age={decadeThreeAge}  
          totalAmount={decadeThreeTotalSavings}
          monthlyCallback={decadeThreeContributionChanged} 
          min={0} 
          max={10000} 
          interval={500}
          initialSavingsValue={decadeThreeMonthlyContribution}
          />
      </Section>
    </Container>
  );
}

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <BackButtonElement onClick={handleGoBack}>
      <ArrowIcon />
      Back
    </BackButtonElement>
  );
};

const BackButtonElement = styled.button`
  position: absolute;
  left: 0.1vw;
  background: none;
  border: none;
  font-size: 2vh;
  display: flex;
  padding-left: 2vw;
  color: white;
  cursor: pointer;
`;

const ArrowIcon = styled(BsArrowLeft)`
  margin-right: 0.5vw;
`;

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
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: ${props => props.customJustify ? props.customJustify : "center"};
  align-items: ${props => props.align ? props.align : "center"};
  width: 100%;
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const Square = styled.div`
  width: 4vw;
  height: 2vh;
  padding: 1vh;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  border-right: 1px solid #000000;
  background-color: #9e9e9e;
`;

const SectionTitle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: 2vh;
  padding: 1vh;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "center"};
  justify-content: center;
  margin-top: ${props => props.ignoreMarginTop ? '0px' : '0.5vh'};
  padding: ${props => props.ignorePadding ? '0px' : '0.5vh'};

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  align-items: ${props => props.customAlign ? props.customAlign : "center"};
  padding: ${props => props.customPadding ? props.customPadding : "1vh"};

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: ${props => props.customJustify ? props.customJustify : "center"};
`;

const ApplicationTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  font-size: 2.5vh;
  text-align: center;
`;

const StyledInput = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 1.8vh;
  background-color: white;
  text-align: center;
  border-width: 0px;
  margin-top: 0;
  width: ${props => props.width};
  height: 3vh;
  border-radius: 5px;
`;

export default CalculatorWithSnaps;
