import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import SavingsSection from "./SavingsSection";

const Calculator = () => {
  const [initialEarlyLifeAmount, setEarlyLifeInitialDeposit] = useState("5000");
  const [earlyLifeMonthlySavings, setEarlyLifeMonthlySavings] = useState(100);
  const [earlyLifeYears, setEarlyLifeYears] = useState(5);
  const [ballerYears, setBallerYears] = useState(5);
  const [ballerSavings, setBallerSavings] = useState(500);
  const [totalSavings, setTotalSavings] = useState("");

  useEffect(() => {
    calculateSavings();
  }, [initialEarlyLifeAmount, earlyLifeMonthlySavings, earlyLifeYears, ballerYears, ballerSavings]);

  const calculateSavings = () => {
    if (initialEarlyLifeAmount === '') {
      setTotalSavings(0);
      return;
    }
    const r = parseFloat(10) / 100;
    const n = 12;
    
    var t = parseInt(earlyLifeYears);
    var P = parseFloat(initialEarlyLifeAmount.replace(/,/g, '')); // Remove commas

    var monthlyContributions = parseFloat(earlyLifeMonthlySavings);

    const futureValue = P * Math.pow(1 + (r / n), n * t) + monthlyContributions * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));

    if (ballerSavings != null && ballerYears != null) {
      const ballerLifeInitialDeposit = futureValue.toFixed(2);

      P = parseFloat(ballerLifeInitialDeposit);
      t = parseInt(ballerYears);
      monthlyContributions = parseInt(ballerSavings);
  
      const total = P * Math.pow(1 + (r / n), n * t) + monthlyContributions * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));
  
      setTotalSavings(Math.round(total).toLocaleString());
    } else {
      setTotalSavings(Math.round(futureValue).toLocaleString());
    }
  };

  const selectBallerLifeSavings = (value) => {
    setBallerSavings(value);
  };

  const selectBallerLifeYears = (value) => {
    setBallerYears(value);
  };

  const earlyStageDepositChanged = (value) => {
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
    setEarlyLifeInitialDeposit(formattedValue);
  };

  const resetValueOnFocus = () => {
    setEarlyLifeInitialDeposit('');
  };

  const handleBlur = () => {
    if (initialEarlyLifeAmount === '') {
      setEarlyLifeInitialDeposit('0');
    }
  };

  const earlyLifeMonthlySavingsChanged = (value) => {
    setEarlyLifeMonthlySavings(value);
  };

  const earlyLifeYearsChanged = (value) => {
    setEarlyLifeYears(value);
  };
  
  return (
    <>
    <Container>
      <Section gray heightValue={"45px"}>
        <ApplicationTitle>Millionair Maker</ApplicationTitle>
      </Section>
      <Section blue heightValue={"150px"}>
        <VerticalStack>
          <HorizontalStack space="60px">
            <span style={{"color" : "#FFA500", "fontSize":"22px", "textAlign" : "center"}}><b>What is your <br/> starting cash?</b></span>
            <InitialDeposit
              defaultValue={initialEarlyLifeAmount}
              value={initialEarlyLifeAmount === '0' ? '$0' : `$${initialEarlyLifeAmount}`}
              selectTextOnFocus={true}
              maxLength={12}
              onInput={(e) => earlyStageDepositChanged(e.target.value)}
              onFocus={resetValueOnFocus}
              onBlur={handleBlur}
            />
          </HorizontalStack>
          <HorizontalStack space="5px">
            <span style={{"color" : "#ffffff", "fontSize":"26px", "textAlign" : "center"}}>How rich <br/> are you?</span>
            <TotalSavingsResult>${totalSavings}</TotalSavingsResult>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Section heightValue={"30px"}><span style={{"font-size" : "20px"}}>Savings Phase 1: <i>EARLY LIFE</i></span></Section>
      <Section orange heightValue={"auto"}>
        <SavingsSection monthlyCallback={earlyLifeMonthlySavingsChanged} yearsCallback={earlyLifeYearsChanged} min={100} max={1000} interval={100}/>
      </Section>
      <Section heightValue={"30px"}><span style={{"font-size" : "20px"}}>Savings Phase 2: <i>BALLER LIFE</i></span></Section>
      <Section orange heightValue={"auto"}>
        <SavingsSection monthlyCallback={selectBallerLifeSavings} yearsCallback={selectBallerLifeYears} min={500} max={5000} interval={500}/>
      </Section>
    </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Section = styled.section`
  width: 100%;
  height: ${props => props.heightValue ? props.heightValue : '120px'};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.blue ? '#007BFF' : props.orange ? '#FFA500' : props.gray ? '#808080' : '#ffffff')};
`;

const VerticalStack = styled.div`
  dflex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HorizontalStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: space-between;
`;

const ApplicationTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  font-size: 25px;
  text-align: center;
  margin-top: 0;
`;

const InitialDeposit = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  background-color: orange;
  text-align: center;
  border-width: 0px;
  margin-top: 0;
  width: 120px;
  height: 25px;
  border-radius: 5px; /* Make the input round */
`;

const TotalSavingsResult = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 45px;
  text-align: center;
  display: inline-block; /* Allow flexible width */
  padding: 5px 10px; /* Add some padding for better appearance */
  border: 1px solid white; /* Add white border */
`;



export default Calculator;
