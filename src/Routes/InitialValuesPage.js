import React from 'react';
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import NumbericSnaps from "../SnapsCalculator/NumbericSnaps";
import { useDispatch, useSelector } from 'react-redux';
import { updateStartingSavings, updateStartingAge } from '../redux/initialValuesReducer';
import HeaderComponent from '../Common/HeaderComponent';

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
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section ignore width="80%" backgroundColor="#0476bb" style={{marginTop:"2vh", marginBottom:"4vh"}}>
        <span style={{ color: 'white', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          Let’s calculate your wealth!
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"7vh", marginBottom:"4vh"}}>
        <VerticalStack style={{paddingLeft:"8vw", paddingRight:"8vw"}} space="2vh">
          <span style={{ fontSize: '3.5vh', textAlign:"center"}}>How old are you?</span>
          <NumbericSnaps
            callback={saveAge}
            min={0} 
            max={50} 
            interval={5}
            initialValue={startingAge}
            disableControls={true}
            inputFieldWidth={"80%"}
          />
          <span style={{ fontSize: '3.5vh', textAlign:"center", marginTop:"7vh"}}>How much money do you have saved?</span>
          <NumbericSnaps 
            callback={saveSavings}
            min={0} 
            maxLength={15}
            interval={1000}
            initialValue={startingSavings}
            sign={'$'}
            custom={true}
            disableControls={true}
            inputFieldWidth={"80%"}
          />
        </VerticalStack>
      </Section>
      <Section justify={"top"} style={{marginTop:'2vh'}}>
        <Button onClick={nextPage}>Let’s get rich -{'>'}</Button>
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
  font-family: Tahoma;
  font-style: normal;
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

const Button = styled.button`
  background-color: #f5a338;
  color: #000000;
  border: none;
  border-radius: 1vh;
  height: 6vh;
  width: ${props => props.width ? props.width :"45%"};
  font-size: 3vh;
  padding: 1vh;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
`;

export default InitialValuesPage;