import React from 'react';
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import NumbericSnaps from "../SnapsCalculator/NumbericSnaps";
import { useDispatch, useSelector } from 'react-redux';
import { updateStartingSavings, updateStartingAge } from '../redux/initialValuesReducer';

const InitialValuesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    startingSavings,
    startingAge,
  } = useSelector((state) => state.initialPage);
  
  const nextPage = () => {
    navigate(`/decade-one`);
  };

  const saveAge = value => {
    dispatch(updateStartingAge(value));
  };

  const saveSavings = value => {
    dispatch(updateStartingSavings(value))
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
            <b>Let’s be rich!</b>
          </span>
        </PaddingSectionDiv>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%">
        <span style={{ fontSize: '3vh', paddingLeft: '7vw', paddingRight: '7vw', paddingBottom:"5vh", textAlign:"center"}}>
          <b>Our income increases as we get older, which means we can save more each decade!</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore>
        <VerticalStack style={{paddingLeft:"8vw", paddingRight:"8vw"}} space="2vh">
          <span style={{ fontSize: '3vh', textAlign:"center"}}>How old are you?</span>
          <NumbericSnaps
            callback={saveAge}
            min={0} 
            max={50} 
            interval={5}
            initialValue={startingAge}
          />
          <span style={{ fontSize: '3vh', textAlign:"center"}}>How much money do you have saved?</span>
          <NumbericSnaps 
            callback={saveSavings}
            min={0} 
            maxLength={15}
            interval={1000}
            initialValue={startingSavings}
            sign={'$'}
            custom={true}
          />
        </VerticalStack>
      </Section>
      <Section justify={"top"} style={{paddingTop:'5vh'}}>
        <Button onClick={nextPage}>Next</Button>
      </Section>
    </Container>
  );
}

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
  padding-top: 2vh;
  padding-bottom: 5vh; 
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

export default InitialValuesPage;