import React, { useState } from 'react';
import styled from "styled-components";

const BallerLifeSection = ({monthlyCallback, yearsCallback}) => {
  const [selectedMonthlyContributionValue, selectMonthlyContribution] = useState(null);
  const [selectedYearsValue, selectYearsValue] = useState(null);

  const handleMonthlyClick = (value) => {
    if (selectedMonthlyContributionValue === value) {
      selectMonthlyContribution(null);
      monthlyCallback(0);
    } else {
      selectMonthlyContribution(value);
      monthlyCallback(value);
    }
  };

  const handleYearsClick = (value) => {
    if (selectedYearsValue === value) {
      selectYearsValue(null);
      yearsCallback(0);
    } else {
      selectYearsValue(value);
      yearsCallback(value);
    }
  };

  return (
    <Container>
      <MonthlySavingsTitle1>Monthly Savings</MonthlySavingsTitle1>
      <HorizontalContainer gradientImage="Gradient_p25W5xb.png">
      <ButtonContainer selected={selectedMonthlyContributionValue === 200} onClick={() => handleMonthlyClick(200)}>
        <ContentButton>
          <Text selected={selectedMonthlyContributionValue === 200}>$200</Text>
        </ContentButton>
      </ButtonContainer>
      <ButtonContainer selected={selectedMonthlyContributionValue === 300} onClick={() => handleMonthlyClick(300)}>
        <ContentButton>
          <Text selected={selectedMonthlyContributionValue === 300}>$300</Text>
        </ContentButton>
      </ButtonContainer>
      <ButtonContainer selected={selectedMonthlyContributionValue === 400} onClick={() => handleMonthlyClick(400)}>
        <ContentButton>
          <Text selected={selectedMonthlyContributionValue === 400}>$400</Text>
        </ContentButton>
      </ButtonContainer>
      <ButtonContainer selected={selectedMonthlyContributionValue === 500} onClick={() => handleMonthlyClick(500)}>
        <ContentButton>
          <Text selected={selectedMonthlyContributionValue === 500}>$500</Text>
        </ContentButton>
      </ButtonContainer>
      </HorizontalContainer>
      <NumberOfYears1>Number of Years</NumberOfYears1>
      <HorizontalContainer gradientImage="Gradient_p25W5xb.png">
        <ButtonContainer selected={selectedYearsValue === 5} onClick={() => handleYearsClick(5)}>
          <ContentButton>
            <Text selected={selectedYearsValue === 5}>5</Text>
          </ContentButton>
        </ButtonContainer>
        <ButtonContainer selected={selectedYearsValue === 10} onClick={() => handleYearsClick(10)}>
          <ContentButton>
            <Text selected={selectedYearsValue === 10}>10</Text>
          </ContentButton>
        </ButtonContainer>
        <ButtonContainer selected={selectedYearsValue === 15} onClick={() => handleYearsClick(15)}>
          <ContentButton>
            <Text selected={selectedYearsValue === 15}>15</Text>
          </ContentButton>
        </ButtonContainer>
        <ButtonContainer selected={selectedYearsValue === 20} onClick={() => handleYearsClick(20)}>
          <ContentButton>
            <Text selected={selectedYearsValue === 20}>20</Text>
          </ContentButton>
        </ButtonContainer>
      </HorizontalContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw; /* 100% of viewport width */
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  width: 100%; /* 100% of parent element's width (Container) */
  height: 60px;
`;

const MonthlySavingsTitle1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
  display: block;
`;

const ButtonContainer = styled.div`
  width: 60px;
  height: 37px;
  background-color: ${({ selected }) => (selected ? '#007BFF' : '#E6E6E6')};
  margin: 10px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const ContentButton = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
`;

const Text = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: ${({ selected }) => (selected ? '#ffffff' : '#121212')};
  text-align: center;
  line-height: 35px;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
`;

const NumberOfYears1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  text-align: center;
  font-size: 18px;
  margin-top: 16px;
  display: block;
`;

export default BallerLifeSection;