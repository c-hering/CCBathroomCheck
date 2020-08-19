import React from 'react';
import { Grid, Paper, Switch } from '@material-ui/core';

export default class Bathroom extends React.Component{
  constructor(props){
    super(props);
    this.state={
      switchStatus: Boolean(!this.props.statusSimple)
    }
  }

  render(){
    return(
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="stretch"
        style={{padding: 20}}>


        <Paper style={{padding: 15}}>
          {this.props.bathroom_name}
        </Paper>
        <Paper style={{padding: 15}}>
          {this.props.status}
        </Paper>
        <Switch checked={this.state.switchStatus} onChange={() => {
          console.log("Switch");
          this.props.switchHandler(this.props.bathroom_name, this.props.dorm)
          this.setState({
            switchStatus: !this.state.switchStatus
          })
        }}/>

      </Grid>
    );
  }
}
// this.props.switchHandler(this.props.bathroom_name, this.props.dorm)
