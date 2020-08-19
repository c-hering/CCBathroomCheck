import React from 'react';
import TopBar from './components/TopBar';
import CenterPage from './components/CenterPage';
import './App.css';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.setCode = this.setCode.bind(this);
    this.state={
      code: "asdf"
    }
  }

  setCode(event){
    this.setState({
      code: event.target.value
    });
    console.log(event.target.value);
  }

  render(){
    console.log(this.state.code)
    return(
      <div className="App">
        <header className="App-header">
          <TopBar eventHandler={this.setCode}/>
          <CenterPage code={this.state.code}/>
        </header>
      </div>
    );
  }
}
