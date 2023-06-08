import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import CalculatorWithSnaps from './SnapsCalculator/CalculatorWithSnaps.js';
import styled from 'styled-components';

const RootApp = styled.div`
  width: 100vw;
  height: 100vh;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootApp>
      <CalculatorWithSnaps />
    </RootApp>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
