import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "../Common/HeaderComponent";

const PreResultPage = () => {

  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/calculated`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section backgroundColor="white" ignore style={{marginTop:"15vh"}} width="90%">
        <span style={{ fontSize: '3vh', textAlign:"center"}}>
          Can you save more money each month?
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"2vh"}} width="90%">
        <span style={{ fontSize: '3vh', textAlign:"center"}}>
          Do you want to be more wealthy?
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"2vh"}} width="90%">
        <span style={{ fontSize: '3vh', textAlign:"center"}}>
          Move the numbers in the 1st decade to see the greatest increase in wealth!
        </span>
      </Section>
      <Section justify={"top"} style={{marginTop:'12vh'}}>
        <Button onClick={nextPage}>Let's go!</Button>
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
  font-family: Tahoma;
  font-style: normal;
`;

const Section = styled.section`
  flex: ${props => (props.ignore ? 'none' : '1')};
  flex-direction: column; /* Add this line */
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  align-items: ${props => props.align ? props.align : "center"}};
  width: ${props => (props.width ? props.width : "100%")};
  background-color: ${props => props.backgroundColor};
  position: relative;
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

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: center; /* Updated value */
`;

const BulletPointText = styled.div`
  display: flex;
  align-items: center;
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

export default PreResultPage;