import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Common/HeaderComponent';

const WelcomePage = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/welcome-things-to-know`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={false}></HeaderComponent>
      <Section ignore width="80%" backgroundColor="#0476bb" style={{marginTop:"2vh", marginBottom:"4vh"}}>
        <span style={{ color: 'white', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          <b>Everyone can be <br/> wealthy!</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%">
        <span style={{ fontSize: '4vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          <b>Millionaire myth busters!</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore>
        <VerticalStack style={{paddingLeft:"8vw", paddingRight:"8vw"}}>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span><b>86%</b> of millionaires made their own wealth (not inherited)</span>
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
              <span>All save an average of <b>23%</b> of their income</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span><b>80%</b> didn't reach $1,000,000 until at least 50 years old</span>
            </BulletPointText>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Section justify={"top"} style={{marginTop:'2vh'}}>
        <Button onClick={nextPage}>Next</Button>
      </Section>
    </Container>
  );
}

const CheckmarkIconComponent = () => (
  <span style={{fontSize:"4vh", paddingRight:"2vw"}}>✓</span>
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

const Section = styled.section`
  flex: ${props => (props.ignore ? 'none' : '1')};
  flex-direction: column; /* Add this line */
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  align-items: ${props => props.align ? props.align : "center"};
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
  font-size: 3vh;
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

export default WelcomePage;