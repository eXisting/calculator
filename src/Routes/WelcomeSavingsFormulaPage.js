import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';

const WelcomeSavingsFormulaPage = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/initial-data`);
  };
  
  return (
    <Container>
      <Section backgroundColor="#111111" ignore maxHeight={"10%"}>
        <VerticalStack style={{ padding: '1vh' }}>
          <ApplicationTitle>
            <b>Wealth Calculator</b>
          </ApplicationTitle>
        </VerticalStack>
      </Section>
      <Section ignore>
        <PaddingSectionDiv>
          <span style={{ color: '#0476bb', fontSize: '3vh', paddingLeft: '7vw', paddingRight: '7vw'}}>
            <b>Becoming wealthy is more about saving than your income level.</b>
          </span>
        </PaddingSectionDiv>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%">
        <span style={{ fontSize: '3vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          <b>Your savings formula</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore>
        <VerticalStack style={{paddingLeft:"8vw", paddingRight:"8vw"}}>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>he earlier your save, the less impact on lifestyle</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>Automatic monthly savings</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>Invest in low cost index funds</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>Enjoy the mathematical magic of compound <br/> interest and dollar cost averaging</span>
            </BulletPointText>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Section ignore>
        <span style={{ color: '#0476bb', fontSize: '2vh', paddingLeft: '10vw', paddingRight: '10vw', paddingTop:"1.5vh", textAlign:"center"}}>
          <b>Double a penny each day for 31 days, and you’ll have $10,737,418. That is compound interest!</b>
        </span>
      </Section>
      <Section justify={"top"} style={{paddingTop:'5vh'}}>
        <Button onClick={nextPage}>Next</Button>
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
  height: 100%;
  max-height: 100%;
  border: 0.2vh solid #000000;
  max-height: 100vh; /* Set the maximum height to screen height */
  overflow: auto; /* Enable scrolling when content overflows */
  margin-right: 2vw;
`;

const PaddingSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
  padding-bottom: 10vh; 
  margin-bottom: 0.5vh;
  margin-top: 0.5vh;
  text-align: center;
  width: 100%;
`;

const Section = styled.section`
  flex: ${props => (props.ignore ? 'none' : '1')};
  flex-direction: column; /* Add this line */
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  align-items: ${props => props.align ? props.align : "center"}};
  width: 100%;
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const ApplicationTitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  font-size: 2vh;
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
  color: back;
  font-size: 2vh;
  text-align: left;
  width: 3wh;
`;

const Button = styled.button`
  background-color: #0476bb;
  color: #ffffff;
  border: none;
  border-radius: 1vh;
  height: 5vh;
  width: ${props => props.width ? props.width :"50%"};
  font-size: 2vh;
  padding: 1vh;
  cursor: pointer;
`;

export default WelcomeSavingsFormulaPage;