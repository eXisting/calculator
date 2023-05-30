import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import SavingsSection from "./SavingsSection";

const Calculator = () => {
  const [initialEarlyLifeAmount, setEarlyLifeInitialDeposit] = useState("5000");
  const [startingAge, setStartingAge] = useState(15);
  const [earlyLifeMonthlySavings, setEarlyLifeMonthlySavings] = useState(0);
  const [earlyLifeYears, setEarlyLifeYears] = useState(0);
  const [earlyLifeTotalSaved, setEarlyLifeTotal] = useState(0);
  const [ballerYears, setBallerYears] = useState(0);
  const [ballerSavings, setBallerSavings] = useState(0);
  const [totalSavings, setTotalSavings] = useState("");

  useEffect(() => {
    calculateSavings();
  }, [initialEarlyLifeAmount, earlyLifeMonthlySavings, earlyLifeTotalSaved, earlyLifeYears, ballerYears, ballerSavings]);

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

    const saved = Math.round(futureValue).toLocaleString();
    setEarlyLifeTotal(saved);

    if (ballerSavings != null && ballerYears != null) {
      const ballerLifeInitialDeposit = futureValue.toFixed(2);

      P = parseFloat(ballerLifeInitialDeposit);
      t = parseInt(ballerYears);
      monthlyContributions = parseInt(ballerSavings);
  
      const total = P * Math.pow(1 + (r / n), n * t) + monthlyContributions * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));
  
      setTotalSavings(Math.round(total).toLocaleString());
    } else {
      setTotalSavings(saved);
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
      <Section black heightValue={"45px"}>
        <VerticalStack style={{ "padding" : "10px"}}>
          <ApplicationTitle><b>Millionair Maker</b></ApplicationTitle>
          <span style={{"color" : "#ffffff", "fontSize":"18px", "textAlign" : "center"}}>Longterm savings guarantees wealth</span>
        </VerticalStack>
      </Section>
      <Section blue heightValue={"150px"}>
        <VerticalStack>
          <HorizontalStack space="5px">
            <span style={{"color" : "#ffffff", "fontSize":"20px", "textAlign" : "right", "paddingRight" : "15px"}}>How reach will<br/> you be?</span>
            <TotalSavingsResult>${totalSavings}</TotalSavingsResult>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Section gray heightValue={"200px"}>
        <HorizontalStack space="20px">
          <VerticalStack space="10px">
            <span style={{"color" : "#ffffff", "fontSize":"22px", "textAlign" : "center"}}>How old are you?</span>
            <span style={{"color" : "#ffffff", "fontSize":"22px", "textAlign" : "center"}}>What are your current savings?</span>
          </VerticalStack>
          <VerticalStack space="10px">
            <StyledInput
              value={startingAge}
              selectTextOnFocus={true}
              maxLength={2}
              onInput={(e) => setStartingAge(e.target.value)}
            />
            <StyledInput
              value={initialEarlyLifeAmount === '0' ? '$0' : `$${initialEarlyLifeAmount}`}
              selectTextOnFocus={true}
              maxLength={12}
              onInput={(e) => earlyStageDepositChanged(e.target.value)}
              onFocus={resetValueOnFocus}
              onBlur={handleBlur}
            />
          </VerticalStack>
        </HorizontalStack>
      </Section>
      <Section heightValue={"30px"}><span style={{"fontSize" : "25px"}}>Break your savings into two life phases</span></Section>
      <Section orange>
        <VerticalStack>
          <SavingsSection monthlyCallback={earlyLifeMonthlySavingsChanged} yearsCallback={earlyLifeYearsChanged} min={0} max={1000} interval={100}/>
          <span style={{"color" : "white", "fontSize" : "20px", "paddingBottom" : "5px", "marginTop" : "10px"}}>
            You are <b>{Number(startingAge) + Number(earlyLifeYears)}</b> and you will have <b>{earlyLifeTotalSaved}</b> saved!</span>
        </VerticalStack>
      </Section>
      <Section heightValue={"30px"}><span style={{"fontSize" : "25px"}}>In your second phase save more!</span></Section>
      <Section orange heightValue={"auto"} style={{"paddingBottom" : "50px"}}>
        <SavingsSection monthlyCallback={selectBallerLifeSavings} yearsCallback={selectBallerLifeYears} min={0} max={5000} interval={500}/>
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.blue ? '#007BFF' : props.orange ? '#FFA500' : props.black ? '#111111' : props.gray ? 'gray' : '#ffffff')};
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
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
  color: rgba(255, 255, 255, 1);
  font-size: 25px;
  text-align: center;
`;

const StyledInput = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  background-color: white;
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
