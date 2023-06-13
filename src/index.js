import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './Routes/HomePage';
import CalculatedPage from './Routes/CalculatedPage';

const RootApp = styled.div`
  width: 100vw;
  height: 100vh;
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <RootApp>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculated/:goal" element={<CalculatedPage />} />
        </Routes>
      </RootApp>
    </Router>
  </React.StrictMode>
);