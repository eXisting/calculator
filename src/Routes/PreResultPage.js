import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const PreResultPage = () => {

  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/calculated`);
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
      <Section ignore maxHeight="10%" style={{marginTop:"10vh"}}>
        <span style={{ color: '#0476bb', fontSize: '2.6vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          <b>Saving more money early and longer has a substantial effect on wealth.</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%" style={{marginTop:"5vh"}}>
        <span style={{ color: '#0476bb', fontSize: '2.6vh', paddingLeft: '7vw', paddingRight: '7vw'}}>
          <b>Adjust the numbers for each decade and see how much it changes your wealth.</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore>
        <VerticalStack>
          <span style={{ fontSize: '2.5vh', textAlign:"center"}}>
            _______________________________
          </span>
          <span style={{ fontSize: '2.5vh', textAlign:"center"}}>
            Double a penny each day for 27 days and you get $671,088.64.
          </span>
        </VerticalStack>
      </Section>
      <Section backgroundColor="white" ignore style={{paddingTop:"1vh"}}>
        <VerticalStack>
          <span style={{ fontSize: '2.5vh', textAlign:"center"}}>
            Double it just <b>FOUR</b> more days, and you get $10,737,418!
          </span>
          <span style={{ fontSize: '2.5vh', textAlign:"center"}}>
            _______________________________
          </span>
        </VerticalStack>
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

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: center; /* Updated value */
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

export default PreResultPage;