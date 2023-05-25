import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import EarlyLifeSection from "./EarlyLifeSection";
import BallerLifeSection from "./BallerLifeSection";

const Calculator = () => {
  const [initialEarlyLifeAmount, setEarlyLifeInitialDeposit] = useState(5000);
  const [earlyLifeMonthlySavings, setEarlyLifeMonthlySavings] = useState(200);
  const [earlyLifeYears, setEarlyLifeYears] = useState(5);
  const [ballerYears, setBallerYears] = useState(null);
  const [ballerSavings, setBallerSavings] = useState(null);
  const [totalSavings, setTotalSavings] = useState("");

  useEffect(() => {
    calculateSavings();
  }, [initialEarlyLifeAmount, earlyLifeMonthlySavings, earlyLifeYears, ballerYears, ballerSavings]);

  const calculateSavings = () => {
    const r = parseFloat(10) / 100;
    const n = 12;
    
    var t = parseInt(earlyLifeYears);
    var P = parseFloat(initialEarlyLifeAmount);
    var monthlyContributions = parseFloat(earlyLifeMonthlySavings);

    const futureValue = P * Math.pow(1 + (r / n), n * t) + monthlyContributions * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));

    if (ballerSavings != null && ballerYears != null) {
      const ballerLifeInitialDeposit = futureValue.toFixed(2);

      P = parseFloat(ballerLifeInitialDeposit);
      t = parseInt(ballerYears);
      monthlyContributions = parseInt(ballerSavings);
  
      const total = P * Math.pow(1 + (r / n), n * t) + monthlyContributions * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));
  
      setTotalSavings(total.toFixed(2));
    } else {
      setTotalSavings(futureValue.toFixed(2));
    }
  };

  const selectBallerLifeSavings = (value) => {
    setBallerSavings(value);
  };

  const selectBallerLifeYears = (value) => {
    setBallerYears(value);
  };

  const earlyStageDepositChanged = (value) => {
    setEarlyLifeInitialDeposit(value);
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
      <Section blue>
      <VerticalStack>
        <ApplicationTitle>Millionair Maker</ApplicationTitle>
        <div style={{ margin: '10px' }}>
          <DepositLable>Starting Cash:</DepositLable>
          <DollarSign>$</DollarSign>
          <InitialDeposit
            defaultValue={initialEarlyLifeAmount}
            selectTextOnFocus={true}
            maxLength={10}
            onInput={(e) => earlyStageDepositChanged(e.target.value)}
          />
        </div>
      </VerticalStack>
      </Section>
      <Section small><h2>Early Life savings phase</h2></Section>
      <Section orange large>
        <EarlyLifeSection monthlyCallback={earlyLifeMonthlySavingsChanged} yearsCallback={earlyLifeYearsChanged}/>
      </Section>
      <Section small><h2>Baller Life savings phase</h2></Section>
      <Section orange medium>
        <BallerLifeSection monthlyCallback={selectBallerLifeSavings} yearsCallback={selectBallerLifeYears}/>
      </Section>
      <Section blue>
        <VerticalStack>
        <ApplicationTitle>How rich am I?</ApplicationTitle>
          <TotalSavingsLabelRow>
            <DepositLable>Total savings:</DepositLable>
            <TotalSavingsResult>${totalSavings}</TotalSavingsResult>
          </TotalSavingsLabelRow>
        </VerticalStack>
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
  height: ${props => (props.large ? '300px' : props.medium ? '220px' : props.small ? '30px' : '120px')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.blue ? '#007BFF' : props.orange ? '#FFA500' : '#ffffff')};
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const DepositLable = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  text-align: center;
  margin-top: 0;
  margin-right: 10px;
`;

const DollarSign = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  margin-right: 5px;
`;

const InitialDeposit = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  background-color: rgba(255, 255, 255, 1);
  text-align: center;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 1);
  border-style: solid;
  margin-top: 0;
  width: 120px;
  height: 25px;
`;

const Worth = styled.div`
  background-color: #02b5ff;
  flex-direction: column;
  display: flex;
  flex: 1 1 0%;
  margin-top: 19px;
`;

const HowRichAmI = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(255,255,255,1);
  height: 37px;
  width: 211px;
  font-size: 25px;
  text-align: center;
  margin-top: 20px;
  margin-left: 82px;
`;

const TotalSavingsLabel = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  height: 28px;
  width: 117px;
  font-size: 18px;
  text-align: center;
`;

const TotalSavingsResult = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 20px;
  text-align: center;
  width: 135px;
  height: 25px;
  margin-left: 24px;
  margin-top: 3px;
`;

const TotalSavingsLabelRow = styled.div`
  height: 28px;
  flex-direction: row;
  display: flex;
  margin-top: 2px;
  margin-left: 57px;
  margin-right: 42px;
`;

const BallerLifeGroupStack = styled.div`
  height: 360px;
  margin-top: 6px;
  position: relative;
`;

const EarlyLifeSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const EarlyLife = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export default Calculator;
