import React, { Component } from 'react';
import { Tabs, Tab, Paper } from '@material-ui/core';
// import TabPanel from '@material-ui/lab/TabPanel';

class CenterPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: 0
    }

    this.handleChange = this.handleChange.bind(this);
  }

handleChange(event, newValue){
  console.log(newValue)
  this.setState({value: newValue})
}

  render(){
    return(
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
    );
  }
}

export default CenterPage;
