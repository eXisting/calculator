import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  const selectDesiredValue = value => {
    setSelectedValue(value === selectedValue ? '' : value);
    navigate(`/calculated/${value}`);
  };

  return (
    <Container>
      <Section backgroundColor="#111111" ignore maxHeight={"10%"}>
        <VerticalStack style={{ padding: '0.2vw' }}>
          <ApplicationTitle>
            <b>3 Phase Millionaire</b>
          </ApplicationTitle>
          <span style={{ color: '#ffffff', fontSize: '2vh', textAlign: 'center' }}>
            <b>Total Savings + Early Life Savings + Later Life Savings</b>
          </span>
        </VerticalStack>
      </Section>
      <Section backgroundColor="#0476bb" ignore>
        <VerticalStack style={{paddingTop:"2vh", paddingBottom:"3vh", paddingLeft:"8vw", paddingRight:"8vw"}}>
          <span style={{ color: '#ffffff', fontSize: '5vh', textAlign: 'center'}}>
            <b>Millionaire Facts</b>
          </span>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              88% of self-made millionaires read at least 30 minutes every day
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              86% of millionaires made their own wealth (not inherited)
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              78% started out as middle class or poor
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              All save an average of 23 percent of their income
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              80% of didn’t reach $1,000,000 until at least 50 years old
            </BulletPointText>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Section backgroundColor="#fead00" justify={"top"} style={{paddingBottom:'10vh'}}>
        <span style={{ color: '#ffffff', fontSize: '3.5vh', textAlign: 'center', marginTop:"5vh"}}><b>How rich do you want to be?</b></span>
          <HorizontalStack style={{marginTop:"4vh"}} space={"1.5vh"}>
            <Button active={selectedValue === 1000000} onClick={() => selectDesiredValue(1000000)}>$1,000,000</Button>
            <Button active={selectedValue === 3000000} onClick={() => selectDesiredValue(3000000)}>$3,000,000</Button>
            <Button active={selectedValue === 5000000} onClick={() => selectDesiredValue(5000000)}>$5,000,000</Button>
          </HorizontalStack>
      </Section>
    </Container>
  );
}

const CheckmarkIcon = styled.svg`
  width: 4vh;
  height: 4vh;
  margin-right: 5px;
  align-self: flex-start;
`;

const CheckmarkPath = styled.path`
  fill-rule: evenodd;
`;

const CheckmarkIconComponent = () => (
  <CheckmarkIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <CheckmarkPath
      fill="currentColor"
      d="M5.646 10.854a.5.5 0 0 1-.708 0L2.146 7.354a.5.5 0 0 1 .708-.708l2.646 2.646 6.646-6.646a.5.5 0 1 1 .708.708L5.646 10.854z"
    />
  </CheckmarkIcon>
);

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
  flex-direction: column; /* Add this line */
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  align-items: ${props => props.align ? props.align : "center"}};
  width: 100vw;
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const ApplicationTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  font-size: 3vh;
  text-align: center;
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "left"};
  justify-content: left;
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
`;

const BulletPointText = styled.div`
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  font-size: 2.5vh;
  text-align: left;
  width: 3wh;
`;

const Button = styled.button`
  background-color: ${props => (props.active ? '#0476bb' : props.color ? props.color : '#9e9e9e')};
  color: #ffffff;
  border: none;
  height: 5vh;
  width: ${props => props.width ? props.width :"50%"};
  font-size: 2vh;
  padding: 1vh;
  cursor: pointer;
`;

export default HomePage;