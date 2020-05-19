import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import LeakAddIcon from "@material-ui/icons/LeakAdd";
import LeakRemoveIcon from "@material-ui/icons/LeakRemove";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { withStyles } from "@material-ui/core/styles";

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

class UnmatchToolbarSelect extends React.Component {
  handleClickInverseSelection = () => {
     
   
  };

  handleClickDeselectAll = () => {
 
  
  };

  handleClickBlockSelected = () => {

    console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
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
          <IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>
            <LeakAddIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Unmatch"}>
          <IconButton className="blur" onClick={this.handleClickDeselectAll}>
            <LeakRemoveIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
       
      
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "UnmatchToolbarSelect" })(UnmatchToolbarSelect);
