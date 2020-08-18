import React, { Component } from 'react';
import { AppBar, Typography, Toolbar, TextField } from '@material-ui/core';

class TopBar extends Component{
  render(){
    return(
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">
            CC Bathroom Check
          </Typography>
          <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="Code"/>
          </form>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
