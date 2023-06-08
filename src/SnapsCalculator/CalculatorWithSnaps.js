import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import SavingsSection from "./SavingsSection";

const CalculatorWithSnaps = () => {
  const [initialEarlyLifeAmount, setEarlyLifeInitialDeposit] = useState("5000");
  const [startingAge, setStartingAge] = useState(25);
  const [earlyLifeMonthlySavings, setEarlyLifeMonthlySavings] = useState(300);
  const [earlyLifeYears, setEarlyLifeYears] = useState(20);
  const [earlyLifeTotalSaved, setEarlyLifeTotal] = useState(0);
  const [ballerYears, setBallerYears] = useState(20);
  const [ballerSavings, setBallerSavings] = useState(1500);
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

  const startingAgeChanged = (value) => {
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setStartingAge(numericValue);
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
      <Section backgroundColor="#111111" ignore maxHeight={"10%"}>
        <VerticalStack style={{ padding: '0.2vw' }}>
          <ApplicationTitle>
            <b>3 Phase Millionaire</b>
          </ApplicationTitle>
          <span style={{ color: '#ffffff', fontSize: '1.5vh', textAlign: 'center' }}>
            <b>TSavings + Early Life Savings + Later Life Savings</b>
          </span>
        </VerticalStack>
      </Section>
      <Section backgroundColor="#0476bb" ignore maxHeight={"20%"} style={{"height":"12vh"}}>
        <HorizontalStack space="1vw">
          <span style={{ color: '#ffffff', fontSize: '4vh', textAlign: 'center', marginRight: '2vw'}}>
            <b>Your total savings! <br></br> ${totalSavings}</b>
          </span>
        </HorizontalStack>
      </Section>
      <Section backgroundColor="#929292" ignore maxHeight={"25%"}>
          <HorizontalStack space="3vh" align="right">
            <span style={{ color: '#ffffff', fontSize: '2vh', textAlign: 'right' }}><b>How old are you?</b></span>
            <StyledInput
              value={startingAge}
              selectTextOnFocus={true}
              maxLength={2}
              width={"10%"}
              onInput={e => startingAgeChanged(e.target.value)}
            />
          </HorizontalStack>
      </Section>
      <Section ignore maxHeight={"0.8vh"} style={{"height" : "0.8vh"}}></Section>
      <Section backgroundColor="#fead00" maxHeight={"8vh"} style={{"heigth" : "8vh"}}>
        <Square>
          <span style={{ color: '#111111', fontSize: '1.5vh', textAlign: 'center' }}><b>1</b></span>
        </Square>
        <HorizontalStack space="1vh" align="right" style={{paddingLeft:"10vw"}}>
          <span style={{ color: '#ffffff', fontSize: '1.8vh', textAlign: 'right' }}><b>What is your total cash today?</b></span>
          <StyledInput
            value={initialEarlyLifeAmount === '0' ? '$0' : `$${initialEarlyLifeAmount}`}
            selectTextOnFocus={true}
            maxLength={12}
            width={"45%"}
            onInput={e => earlyStageDepositChanged(e.target.value)}
            onFocus={resetValueOnFocus}
            onBlur={handleBlur}
          />
        </HorizontalStack>
      </Section>
      <Section ignore maxHeight={"0.8vh"} style={{"height" : "0.8vh"}}></Section>
      <Section backgroundColor="#fead00" ignore maxHeight={"50%"}>
        <Square>
          <span style={{ color: '#111111', fontSize: '1.8vh', textAlign: 'center' }}><b>2</b></span>
        </Square>
        <SectionTitle>
          <span style={{ color: '#111111', fontSize: '1.5vh', textAlign: 'center' }}>In the 2nd phase of life, you save a little less.</span>
        </SectionTitle>
        <SavingsSection
          step={2}
          age={Number(startingAge) + Number(earlyLifeYears)}  
          totalAmount={earlyLifeTotalSaved}
          monthlyCallback={earlyLifeMonthlySavingsChanged}
          yearsCallback={earlyLifeYearsChanged}
          min={0}
          max={1000}
          interval={100}
          initialAgeValue={earlyLifeYears}
          initialSavingsValue={earlyLifeMonthlySavings}
        />
      </Section>
      <Section ignore maxHeight={"0.8vh"} style={{"height" : "0.8vh"}}></Section>
      <Section backgroundColor="#fead00" style={{ paddingBottom: '10vw' }} align="top"  maxHeight={"50%"}>
        <Square>
          <span style={{ color: '#111111', fontSize: '1.8vh', textAlign: 'center' }}><b>3</b></span>
        </Square>
        <SectionTitle>
          <span style={{ color: '#111111', fontSize: '1.5vh', textAlign: 'center' }}>In the 3rd phase of life, you save more.</span>
        </SectionTitle>
        <SavingsSection 
          step={3} 
          age={Number(startingAge) + Number(earlyLifeYears) + Number(ballerYears)}  
          totalAmount={totalSavings}
          monthlyCallback={selectBallerLifeSavings} 
          yearsCallback={selectBallerLifeYears} 
          min={0} 
          max={5000} 
          interval={500}
          initialAgeValue={ballerYears}
          initialSavingsValue={ballerSavings}
          />
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
  top: 0px;
  left: 0px;
  width: 4vw;
  height: 2vh;
  padding: 1vh;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
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
  align-items: center;
  padding: 1vh;

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: center; /* Updated value */
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
