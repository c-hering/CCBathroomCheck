import React, { Component } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';
import BathroomDisplay from './BathroomDisplay';
import Axios from 'axios';
const md5 = require('md5');

// import TabPanel from '@material-ui/lab/TabPanel';

function hash(rawPassword, options = {}){
  const salt = options.salt ? options.salt : new Date().getTime();
  const rounds = options.rounds ? options.rounds : 10;

  let hashed = md5(rawPassword + salt);
  for (let i = 0; i <= rounds; i++) {
    hashed = md5(hashed);
  }
  // console.log("IN HASH")
  return `${salt}$${rounds}$${hashed}`;
}

function determineDorm(index){
  let tmp = "Err: No Index";
  console.log(index);
  switch(index){
    case 0:
      tmp = "Loomis";
      break;
    case 1:
      tmp = "Mathias";
      break;
    case 2:
      tmp = "South";
  }
  return tmp;
}

class CenterPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      bathroomJSON: [],
      renderBathrooms: true,
      codeHash: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  getBathrooms(tmp, codeHash){
    // let code = hash(this.props.code);
    // console.log(code + this.props.code)
    Axios.get("http://localhost:3001/CC/" + tmp,
              {params: {
                hash: codeHash //ISNT WORKING FOR SOME REASON COME BACK TO
              }}).then(response =>  {
                console.log("Res" + response.data.length)
                console.log("RESS " + response.data)
                if(Array.isArray(response.data)){
                  this.setState({bathroomJSON: response.data,
                                renderBathrooms: true});
                }else{
                  this.setState({renderBathrooms: false});
                }
          });
  }

  postStatus(bathroom_num, dorm, codeHash){
    Axios.post("http://localhost:3001/CC/" + dorm + "/" + bathroom_num,
                {params:{
                    hash: codeHash
                  }}).then(response => {
                    console.log("POST Status res: " + response)
                  });
  }

  handleChange(event, newValue){
    this.setState({value: newValue},
    () => {
      let tmp = determineDorm(this.state.value);
      console.log(tmp)
      this.getBathrooms(tmp, this.state.codeHash)
    });
  }

  componentDidMount(){
    let tmp = determineDorm(this.state.value);
    this.setState({
      codeHash: hash(this.props.code)
    });
    this.interval = setInterval(() => {
      this.getBathrooms(tmp, this.state.codeHash);
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){

    const shouldRender = this.state.renderBathrooms;
    let content;
    if(this.state.renderBathrooms){
      content = <BathroomDisplay bathroomJSON={this.state.bathroomJSON}
                                  switchHandler={this.postStatus}
                                  dorm={determineDorm(this.state.value)}/>;
    }else{
      content = <p>No Bathrooms</p>;
    }

    return(
      <div>
        <Paper>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered>
            <Tab label="Loomis" />
            <Tab label="Mathias" />
            <Tab label="South" />
          </Tabs>
        </Paper>
        {content}

      </div>
    );
  }
}

export default CenterPage;
