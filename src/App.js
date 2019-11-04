import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Привіт я майбутній додаток PWA Acord.taxi. <br></br>
          Ти можеш додати мене на головний екран. <br></br>
          Для цього тільки натисни + на URL стрічці якщо ти використовуєш Dasktop, <br></br>
          або додай мене на головний екран якщо використовуєш Mobile. <br></br>
        </p>
      </header>
    </div>
  );
}

export default App;
