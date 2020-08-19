import React from 'react';
import { Grid, Paper, Switch } from '@material-ui/core';

export default class Bathroom extends React.Component{
  constructor(props){
    super(props);
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
        // <Paper style={{padding: 15}}>
        //   toggle
        // </Paper>
        <Switch />

      </Grid>
    );
  }
}
