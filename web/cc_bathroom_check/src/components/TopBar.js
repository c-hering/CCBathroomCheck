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
          <Grid container spaceing={3}>
          <Grid item xs={3}>
            <Typography variant="h6">
              CC Bathroom Check
            </Typography>
          </Grid>
          <Grid item xs={6}/>
          <Grid item xs={3}>
              <TextField id="standard-basic" label="Code" onChange={(event) =>{
                this.props.eventHandler(event)
              }}/>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
