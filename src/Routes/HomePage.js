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
        <VerticalStack style={{ padding: '2vh' }}>
          <ApplicationTitle>
            <b>Wealth Calculator</b>
          </ApplicationTitle>
        </VerticalStack>
      </Section>
      <Section ignore>
        <VerticalStack>
          <SubHeaderText>
            We will show you how to save more than $1,000,000!
          </SubHeaderText>
          <SubHeaderText>
            But... It takes time and a little planning....
          </SubHeaderText>
        </VerticalStack>
        <PaddingSectionDiv>
          <span style={{ color: 'white', fontSize: '2.9vh', paddingLeft: '7vw', paddingRight: '7vw'}}>
            <b>Did you know these facts about millionaires?</b>
          </span>
        </PaddingSectionDiv>
      </Section>
      <Section backgroundColor="white" ignore>
        <VerticalStack style={{paddingLeft:"8vw", paddingRight:"8vw"}}>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span><b>88%</b> made their own wealth</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span><b>76%</b> started out as middle class or poor</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span><b>80%</b> didn't reach $1,000,000 until at least 50 years old</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>They save an average of <b>23%</b> of their income</span>
            </BulletPointText>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Section ignore>
        <PaddingSectionDiv>
          <span style={{ color: 'white', fontSize: '2.9vh', textAlign: 'center'}}>
            <b>Choose how rich you wanna be!</b>
          </span>
        </PaddingSectionDiv>
      </Section>
      <Section justify={"top"} style={{paddingBottom:'10vh'}}>
        <span style={{ color: 'black', fontSize: '2vh', textAlign: 'center', marginTop:"1vh"}}><i>Show me the formula how to get rich...</i></span>
          <HorizontalStack style={{marginTop:"1vh"}} space={"1.5vh"}>
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
  padding-top: 1vh;
  padding-bottom: 1vh; 
  margin-bottom: 0.5vh;
  margin-top: 0.5vh;
  text-align: center;
  width: 100%;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : "#9e9e9e")};
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
  font-size: 3vh;
  text-align: center;
`;

const SubHeaderText = styled.span`
  font-family: Roboto;
  font-style: normal;
  color: black;
  font-size: 2vh;
  text-align: center;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 1.5vh;
  padding-bottom: 1.5vh;
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

export default HomePage;