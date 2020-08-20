import React from 'react';
import TopBar from './components/TopBar';
import CenterPage from './components/CenterPage';
import './App.css';

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="App">
        <header className="App-header">
          <TopBar/>
          <CenterPage/>
        </header>
      </div>
    );
  }
}
