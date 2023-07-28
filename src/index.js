import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import WelcomePage from './Routes/WelcomePage';
import WelcomeSavingsFormulaPage from './Routes/WelcomeSavingsFormulaPage';
import SavingsGraphPage from './Routes/SavingsGraphPage';
import WealthRulesPage from './Routes/WealthRulesPage';
import InitialValuesPage from './Routes/InitialValuesPage';
import DecadeOnePage from './Routes/DecadeOnePage';
import DecadeTwoPage from './Routes/DecadeTwoPage';
import DecadeThreePage from './Routes/DecadeThreePage';
import PreResultPage from './Routes/PreResultPage';
import CalculatedPage from './Routes/CalculatedPage';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

const RootApp = styled.div`
  width: 100vw;
  height: 100vh;
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <RootApp>
            <Routes>
              <Route path="/" element={<WelcomePage store={store}/>} />
              <Route path="/welcome-savings-formula" element={<WelcomeSavingsFormulaPage />} />
              <Route path="/savings-graph" element={<SavingsGraphPage />} />
              <Route path="/wealth-rules" element={<WealthRulesPage />} /> 
              <Route path="/initial-data" element={<InitialValuesPage />} />
              <Route path="/decade-one" element={<DecadeOnePage />} />
              <Route path="/decade-two" element={<DecadeTwoPage />} />
              <Route path="/decade-three" element={<DecadeThreePage />} />
              <Route path="/pre-result" element={<PreResultPage />} />
              <Route path="/calculated" element={<CalculatedPage />} />
            </Routes>
          </RootApp>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);