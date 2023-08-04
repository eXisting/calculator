import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import SavingsSection from "./SavingsSection";
import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "../Common/HeaderComponent";

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

const CalculatorWithSnapsCombination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstAgeInterval, setFirstAgeInterval] = useState(0);
  const [secondAgeInterval, setSecondAgeInterval] = useState(0);

  const nextPage = () => {
    navigate(`/follow-steps`);
  };

  const {
    startingSavings,
    startingAge,
    desiredResult
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

  useEffect(() => {
    if (desiredResult && startingSavings && startingAge) {
      setSmallestCombination();
    }
  }, [desiredResult, startingSavings]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeOneMonthlyContribution, firstAgeInterval, startingSavings, updateFirstDecadeTotalSavings);
  }, [decadeOneMonthlyContribution, firstAgeInterval, startingAge, startingSavings]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeTwoMonthlyContribution, secondAgeInterval, decadeOneTotalSavings, updateSecondDecadeTotalSavings);
  }, [decadeTwoMonthlyContribution, secondAgeInterval, decadeOneTotalSavings]);

  const setSmallestCombination = () => {
    var monthlyFirst;
    var monthlySecond;

    const firstTargetValue = desiredResult * 0.20;
    const secondTargetValue = desiredResult * 0.80;

    var y1 = calculateYearsNeeded(firstTargetValue, startingSavings);
    monthlyFirst = calculateRequiredSavings(firstTargetValue, startingSavings, y1).toFixed();
    const savingsOut = calculateSavings(monthlyFirst, y1, startingSavings);
    var y2 = calculateYearsNeeded(secondTargetValue, savingsOut);
    monthlySecond = calculateRequiredSavings(secondTargetValue, savingsOut, y2).toFixed();
    console.log(y2);
    console.log(monthlySecond);

    if (desiredResult === 1000000) {
      
    }

    dispatch(updateFirstDecadeAge(y1));
    dispatch(updateSecondDecadeAge(y2));
    setFirstAgeInterval(y1);
    setSecondAgeInterval(y2);
    dispatch(updateFirstDecadeMonthlyContribution(monthlyFirst));
    dispatch(updateSecondDecadeMonthlyContribution(monthlySecond));
  };

  const calculateRequiredSavings = (targetValue, existingSavings, years) => {
    const r = parseFloat(10) / 100;
    const n = 12;
  
    let contribution = 0;
  
    for (let i = 0; i < years; i++) {
      contribution += (targetValue - existingSavings) / Math.pow(1 + (r / n), n * i);
    }
  
    return contribution;
  };

  const calculateYearsNeeded = (targetValue, existingSavings) => {
    const r = parseFloat(10) / 100;
    const n = 12;
  
    const savedAmount = targetValue - existingSavings;
  
    return Math.round((Math.log(1 + (savedAmount / existingSavings) * (r / n)) / (n * Math.log(1 + r / n))) / 12);
  };
  
  
  const calculateSavings = (contribution, years, savings) => {
    if (savings === 0 && contribution === 0) {
      return 0;
    }
  
    const r = parseFloat(10) / 100;
    const n = 12;
  
    var t = years;
    var P = parseFloat(savings.toString().replace(/[^0-9]/g, ''));
  
    const futureValue = P * Math.pow(1 + (r / n), n * t) + contribution * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));
  
    return Math.round(futureValue);
  };

  const updateDecadeTotalSavings = (contribution, years, savings, updateAction) => {
    let saved = calculateSavings(contribution, years, savings);
    if (saved === 0) {
      dispatch(updateAction(0));
      return;
    }

    dispatch(updateAction(Math.round(saved).toLocaleString()));
  };

  const decadeOneContributionChanged = (value) => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateFirstDecadeMonthlyContribution(numericValue));
  };

  const decadeTwoContributionChanged = (value) => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateSecondDecadeMonthlyContribution(numericValue));
  };

  const firstAgeIntervalChanged = (value) => {
    setFirstAgeInterval(value);
  };

  const secondAgeIntervalChanged = (value) => {
    setSecondAgeInterval(value);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton></HeaderComponent>
      <Section ignore width="85%" backgroundColor="#0476bb" style={{marginTop:"2vh", marginBottom:"2vh"}}>
        <span style={{ color: 'white', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          Your total savings! <br/>
          {decadeTwoTotalSavings}
        </span>
      </Section>
      <Section ignore width="80%" style={{border:"0.2vh solid #000000", paddingLeft:"4vh", paddingRight:"4vh", paddingTop:"1vh", paddingBottom:"1vh", height:"4vh"}}>
        <span style={{ color: 'black', fontSize: '2.2vh', textAlign: 'center' }}>When you start saving, you save a little less</span>
      </Section>
      <Section ignore maxHeight={"50%"}>
        <SavingsSection
          age={decadeOneAge}
          totalAmount={decadeOneTotalSavings}
          totalAge={startingAge + firstAgeInterval}
          monthlyCallback={decadeOneContributionChanged}
          yearsCallback={firstAgeIntervalChanged}
          min={0}
          symbolsCountMax={15} 
          customFormula={true}
          interval={100}
          initialSavingsValue={decadeOneMonthlyContribution}
        />
      </Section>
      <Section ignore width="80%" style={{border:"0.2vh solid #000000", paddingLeft:"4vh", paddingRight:"4vh", paddingTop:"1vh", paddingBottom:"1vh", height:"4vh"}}>
        <span style={{ color: 'black', fontSize: '2.2vh', textAlign: 'center' }}>As you income increases, you can save more.</span>
      </Section>
      <Section ignore align="top" maxHeight={"50%"}>
        <SavingsSection
          age={decadeTwoAge}
          totalAmount={decadeTwoTotalSavings}
          totalAge={startingAge + firstAgeInterval + secondAgeInterval}
          monthlyCallback={decadeTwoContributionChanged} 
          yearsCallback={secondAgeIntervalChanged}
          min={0} 
          symbolsCountMax={15} 
          customFormula={true}
          interval={500}
          initialSavingsValue={decadeTwoMonthlyContribution}
          />
      </Section>
      <Section justify={"top"}>
        <Button onClick={nextPage}>{"What is next? ->"}</Button>
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
  font-family: Tahoma;
  font-style: normal;
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

const StyledInput = styled.input`
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 2.2vh;
  background-color: white;
  text-align: center;
  border-width: 0px;
  margin-top: 0;
  width: ${props => props.width};
  height: 3vh;
  border-radius: 1px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  background-color: #f5a338;
  align-items: center;
  justify-content: center;
  padding: 2vh;
  width: 50%;
  color: #000000;
  border: none;
  border-radius: 1vh;
  height: 6vh;
  font-size: 2.5vh;
  cursor: pointer;
`;

export default CalculatorWithSnapsCombination;
