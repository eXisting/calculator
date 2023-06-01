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
      <Section black ignore maxHeight={"10%"}>
        <VerticalStack style={{ padding: '2vw' }}>
          <ApplicationTitle>
            <b>Millionair Maker</b>
          </ApplicationTitle>
          <span style={{ color: '#ffffff', fontSize: '2vh', textAlign: 'center' }}>
            Longterm savings guarantees wealth
          </span>
        </VerticalStack>
      </Section>
      <Section blue ignore maxHeight={"10%"}>
        <VerticalStack>
          <HorizontalStack space="1vw">
            <span style={{ color: '#ffffff', fontSize: '2vh', textAlign: 'right', paddingRight: '1.5vw' }}>
              How rich will<br />you be?
            </span>
            <TotalSavingsResult>${totalSavings}</TotalSavingsResult>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Section gray ignore maxHeight={"15%"}>
        <HorizontalStack space="1vw">
          <VerticalStack space="1vh">
            <span style={{ color: '#ffffff', fontSize: '2.2vh', textAlign: 'right' }}>How old are you?</span>
            <span style={{ color: '#ffffff', fontSize: '2.2vh', textAlign: 'right' }}>What are your current savings?</span>
          </VerticalStack>
          <VerticalStack space="0.5vh">
            <StyledInput
              value={startingAge}
              selectTextOnFocus={true}
              maxLength={2}
              onInput={e => setStartingAge(e.target.value)}
            />
            <StyledInput
              value={initialEarlyLifeAmount === '0' ? '$0' : `$${initialEarlyLifeAmount}`}
              selectTextOnFocus={true}
              maxLength={12}
              onInput={e => earlyStageDepositChanged(e.target.value)}
              onFocus={resetValueOnFocus}
              onBlur={handleBlur}
            />
          </VerticalStack>
        </HorizontalStack>
      </Section>
      <Section heightValue={'3vh'}>
        <span style={{ fontSize: '2.5vh', marginLeft: '0.8vw' }}>Break your savings into two life phases</span>
      </Section>
      <Section orange ignore maxHeight={"35%"}>
        <VerticalStack>
          <SavingsSection
            monthlyCallback={earlyLifeMonthlySavingsChanged}
            yearsCallback={earlyLifeYearsChanged}
            min={0}
            max={1000}
            interval={100}
          />
          <span
            style={{
              color: 'white',
              fontSize: '2vh',
              paddingBottom: '0.5vw',
              marginTop: '3vh',
              marginLeft: '2.5vw',
              marginRight: '2.5vw',
              textAlign: 'center',
            }}>
            You are <b>{Number(startingAge) + Number(earlyLifeYears)}</b> and you will have <b>${earlyLifeTotalSaved}</b>{' '}
            saved!
          </span>
        </VerticalStack>
      </Section>
      <Section heightValue={'3vh'}>
        <span style={{ fontSize: '2.5vh', marginLeft: '0.8vw' }}>In your second phase, save more!</span>
      </Section>
      <Section orange style={{ paddingBottom: '5vw' }} >
        <SavingsSection monthlyCallback={selectBallerLifeSavings} yearsCallback={selectBallerLifeYears} min={0} max={5000} interval={500} />
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
  flex: ${props => (props.heightValue || props.ignore ? 'none' : '1')};
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: ${props =>
    props.blue ? '#007BFF' : props.orange ? '#FFA500' : props.black ? '#111111' : props.gray ? 'gray' : '#ffffff'};
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1vw;

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1vw;

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: space-between;
`;

const ApplicationTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  font-size: 3vh;
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
  width: 15vw;
  height: 3vh;
  border-radius: 5px;
`;

const TotalSavingsResult = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 4.5vw;
  text-align: center;
  display: inline-block;
`;

export default Calculator;
