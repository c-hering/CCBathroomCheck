import React, { Component } from 'react';
import { AppBar, Typography, Toolbar, TextField, Grid } from '@material-ui/core';

class TopBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">
            CC Bathroom Check
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
