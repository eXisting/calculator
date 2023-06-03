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
    <Container>
      <Section backgroundColor="#111111" ignore maxHeight={"15%"}>
        <VerticalStack style={{ padding: '0.2vw' }}>
          <ApplicationTitle>
            <b>3 Step Millionaire</b>
          </ApplicationTitle>
          <span style={{ color: '#ffffff', fontSize: '2vh', textAlign: 'center' }}>
            <b>Wealth is built in life stages</b>
          </span>
        </VerticalStack>
      </Section>
      <Section backgroundColor="#0476bb" ignore maxHeight={"15%"}>
        <HorizontalStack space="1vw">
          <span style={{ color: '#ffffff', fontSize: '3vh', textAlign: 'center', marginRight: '2vw' }}>
            <b>Your total savings! ${totalSavings}</b>
          </span>
        </HorizontalStack>
      </Section>
      <Section backgroundColor="#929292" ignore maxHeight={"35%"}>
          <HorizontalStack space="1vh" align="right">
            <span style={{ color: '#ffffff', fontSize: '2.2vh', textAlign: 'right' }}><b>How old are you?</b></span>
            <StyledInput
              value={startingAge}
              selectTextOnFocus={true}
              maxLength={2}
              onInput={e => setStartingAge(e.target.value)}
            />
          </HorizontalStack>
      </Section>
      <Section heightValue={'0.8vh'} maxHeight={"0.8vh"} style={{"height" : "0.8vh"}}></Section>
      <Section backgroundColor="#fead00" maxHeight={"8vh"} style={{"heigth" : "8vh"}}>
        <Square>
          <span style={{ color: '#ffffff', fontSize: '2.2vh', textAlign: 'center' }}><b>1</b></span>
        </Square>
        <HorizontalStack space="1vh" align="right">
          <span style={{ color: '#ffffff', fontSize: '2.2vh', textAlign: 'right' }}><b>Your current savings?</b></span>
          <StyledInput
            value={initialEarlyLifeAmount === '0' ? '$0' : `$${initialEarlyLifeAmount}`}
            selectTextOnFocus={true}
            maxLength={12}
            onInput={e => earlyStageDepositChanged(e.target.value)}
            onFocus={resetValueOnFocus}
            onBlur={handleBlur}
          />
        </HorizontalStack>
      </Section>
      <Section heightValue={'0.8vh'} maxHeight={"0.8vh"} style={{"height" : "0.8vh"}}></Section>
      <Section backgroundColor="#fead00" ignore maxHeight={"50%"}>
        <Square>
          <span style={{ color: '#ffffff', fontSize: '2.2vh', textAlign: 'center' }}><b>2</b></span>
        </Square>
        <VerticalStack>
          <SavingsSection
            step={2}
            monthlyCallback={earlyLifeMonthlySavingsChanged}
            yearsCallback={earlyLifeYearsChanged}
            min={0}
            max={1000}
            interval={100}
          />
          <span
            style={{
              color: 'white',
              fontSize: '3vh',
              paddingBottom: '0.5vw',
              marginTop: '5vh',
              marginLeft: '3vw',
              marginRight: '3vw',
              textAlign: 'center',
            }}>
            You are <b>{Number(startingAge) + Number(earlyLifeYears)}</b> and you will have <b>${earlyLifeTotalSaved}</b>{' '}
            saved!
          </span>
        </VerticalStack>
      </Section>
      <Section heightValue={'0.8vh'} maxHeight={"0.8vh"} style={{"height" : "0.8vh"}}></Section>
      <Section backgroundColor="#fead00" style={{ paddingBottom: '5vw' }} align="top"  maxHeight={"50%"}>
        <Square>
          <span style={{ color: '#ffffff', fontSize: '2.2vh', textAlign: 'center' }}><b>3</b></span>
        </Square>
        <SavingsSection step={3} monthlyCallback={selectBallerLifeSavings} yearsCallback={selectBallerLifeYears} min={0} max={5000} interval={500} />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-height: 100%;
  max-height: 100vh; /* Set the maximum height to screen height */
  overflow: auto; /* Enable scrolling when content overflows */
`;

const Section = styled.section`
  flex: ${props => (props.ignore ? 'none' : '1')};
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: center;
  align-items: ${props => props.align ? props.align : "center"}};
  width: 100vw;
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const Square = styled.div`
  position: absolute;
  top: 0.5vh;
  left: 1vw;
  width: 4vw;
  height: 2vh;
  padding: 1vh;
  background-color: #0177bb;
  border-radius: 1vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "center"};
  justify-content: center;
  margin-top: 0.5vh;
  padding: 0.5vh;

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  align-items: center;
  padding: 1vh;

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: space-between;
`;

const ApplicationTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  font-size: 3.5vh;
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
  width: 20vw;
  height: 3vh;
  border-radius: 5px;
`;

const TotalSavingsResult = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 4vh;
  text-align: center;
  display: inline-block;
`;

export default Calculator;
