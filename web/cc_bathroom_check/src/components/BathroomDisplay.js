import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import Bathroom from './Bathroom';


function determindStatus(index){
  let tmp = "Occupied";
  switch(index){
    case 0:
      tmp = "Occupied";
      break;
    case 1:
      tmp = "Unoccupied";
  }
  return tmp;
}

export default class BathroomDisplay extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch" style={{padding: 20}}>
        {
          this.props.bathroomJSON.map((bath, index) =>
            (<Bathroom key= {index} bathroom_name={bath.name}
                                    dorm={this.props.dorm}
                                    status={determindStatus(bath.status)}
                                    statusSimple={bath.status}
                                    switchHandler={this.props.switchHandler}/>))
        }
      </Grid>
    );
  }
}
