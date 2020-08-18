import React from 'react';
import TopBar from './components/TopBar';
import CenterPage from './components/CenterPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TopBar/>
        <CenterPage/>
      </header>
    </div>
  );
}

export default App;
