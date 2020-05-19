import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import LeakAddIcon from "@material-ui/icons/LeakAdd";
import LeakRemoveIcon from "@material-ui/icons/LeakRemove";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Row,
  Modal, ModalHeader, ModalBody, ModalFooter ,Button,
  Form, FormGroup, Label, Input, FormText,
  Col
 
} from "reactstrap";

const defaultToolbarSelectStyles = {
  iconButton: {
  },
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
};

class CustomToolbarSelect extends React.Component {

  state = {
    opena: false
  }

  toggle =(e) => {
    e.preventDefault();
    this.setState({
      opena: !this.state.opena
    })

  }
  handleClickInverseSelection = () => {
     
   
  };

  handleClickDeselectAll = () => {
 
  
  };

  handleClickBlockSelected = () => {
    console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
    this.setState({
      opena:true
    })
  
  };

  render() {
    console.log(this.props.selectedRows.data.length)
    const { classes } = this.props;

    return (
      <div className={classes.iconContainer}>
      
        {this.props.selectedRows.data.length > 1 ? <Tooltip title={"View"}>
          <IconButton className="blur" onClick={this.handleClickDeselectAll}>
            <ViewModuleIcon className={classes.icon} />
          </IconButton>
        </Tooltip> : <Tooltip title={"View"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>
            <ViewModuleIcon className={classes.icon} />
          </IconButton>
        </Tooltip>}
          
        <Tooltip title={"Match"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickBlockSelected }>
            <LeakAddIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Unmatch"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>
            <LeakRemoveIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Goto Group"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>
            <SupervisorAccountIcon className={classes.icon} />
          </IconButton>
        </Tooltip>


        <Modal isOpen={this.state.opena} toggle={this.toggle} className="">
        <ModalHeader toggle={this.toggle}>Matching Selected Items</ModalHeader>
        <ModalBody>
       
            <p className="text-success">Data/Datas Matched Successfully</p>
            
       
        </ModalBody>
       
      </Modal>
      
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);
