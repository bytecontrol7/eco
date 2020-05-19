
import React from "react";
// react plugin used to create charts
import { Line, Pie,Bar,Radar ,Doughnut} from "react-chartjs-2";
import Tooltip from "@material-ui/core/Tooltip";
import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Button,
  Form, FormGroup, Label, Input, FormText,CardText,UncontrolledAlert,
  Col
 
} from "reactstrap";
import { Helmet } from 'react-helmet'
// core components
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,


  dashboardNASDAQChart
} from "../../variables/charts.jsx";
import { Modal } from 'antd';
import Header from '../../components/Navbars/DemoNavbar';
import {columnAddAccount, columnSearchAccount} from '../../module_columns/account'
import MUIDataTable from "mui-datatables";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {singleIssue} from '../../action/vendor'
class Issue extends React.Component {
  state = {
    resolveIncident: false,
    addIssue: false,
    view: false,
    IssueData: [],
    issueName: '',
    issueDesc: '',
   
  }

  resolveIncident = (e) => {
    e.preventDefault();
    this.setState({
      resolveIncident: true
    })

  }

  addIssue = (e) => {
    e.preventDefault();
    this.setState({
      addIssue: true
    })

  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
        fixedHeaderOptions: {
          backgroundColor: `blue !important`,
        }
      },
      MUIDataTableHead: {
        root: {
          backgroundColor: `#1D252D !important` ,

        }
      },
      MUIDataTableBodyRow: {
        root: {
          '&:nth-child(odd)': { 
            backgroundColor: '#b0dfe5',
            color:'#fff',
            data: {
              whiteSpace: 'nowrap'
            }
            
          }
        }
      },
      MuiTableCell: {
        root: {
            padding: '3px 3px 0 0'
        },
        body: {
            fontSize: '13px',
            textAlign: 'left'
        }
    },

      MUIDataTableSelectCell: {
        headerCell: {
          backgroundColor: ''
        },
        checked: `lightcoral !important`
      },
      MUIDataTablePagination: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        },
        caption: {
          fontSize: 12
        }
      }
    }
  })

  viewclose =() => {
    this.setState({view: false})
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      searchData: true
    })
  }

  handleCancelSearch = (e) => {
    this.setState({
      resolveIncident: false
    })

  }

  handleCancelAdd = (e) => {
    this.setState({
      addIssue: false
    })

  }

  onChange = (e) => {
    const {name,value} = e.target;
    this.setState({
      [name]: value
    })
  }

  refresh = () => {
    const token = sessionStorage.getItem('token')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/issue`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data.result);
      if(res.data.result.length !== 0){
        this.setState({
          IssueData: res.data.result
        })
      }
    })

  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })

  }
  componentWillMount = () => {
   this.refresh()
  }

  viewData = (id) => {
    this.setState({view: true})
    const token = sessionStorage.getItem('token')
    const issue =  id.rowData[0]
    this.props.singleIssue(token, issue)
   
  }

  addNewIssue  = (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem('token')
    const IssueData = {
      issueName: this.state.issueName,
      issueDescription: this.state.issueDesc,
      
    }
    axios.post(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/issue/create`,IssueData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      if(res.data.result.length !==0){
        this.setState({addIssue:false})
        this.refresh()
      }
    })
  }

  showDeleteConfirm = (id) => {
    confirmAlert({
      message: 'Are you sure to do delete this Issue Item.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const token = sessionStorage.getItem('token');
            const issue = id.rowData[0]
            axios.delete(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/issue/${issue}`, {
              headers: {
                  Authorization : `Bearer ${token}`
              }
          }).
          then((res) => {
              console.log(res.data.result)
              this.refresh()       
          })
          
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Click No')
        }
      ]
    });

  }
  
 render(){
  const Issue = [
    {
        name: "Issue Name",
        options: {
          filter: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer',color:'#172433' }}>
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  
                  whiteSpace: 'pre',
                  color: '#172433'
                }
            };
          },
  
        }
      },
      {
        name: "Issue Description",
        options: {
          filter: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer',color:'#172433' }}>
              {columnMeta.name}
            </th>
          ),
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  
                  whiteSpace: 'pre',
                  color: '#172433'
                }
            };
          },
  
        }
      },
 
      
      {
        name: "Action",
        options: {
          filter: false,
          customHeadRender: (columnMeta, updateDirection) => (
            <th key={2} onClick={() => updateDirection(2)} style={{ cursor: 'pointer',color:'#172433' }}>
              {columnMeta.name}
            </th>
          ),
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
              <Tooltip title="View Issue">
              <Button onClick={this.viewData.bind(this,tableMeta)} className="mt-0 mb-0" color="info" style={{backgroundColor:'#017cc2'}} >
               <i className="fa fa-eye"></i>
              </Button>
              </Tooltip>
              <Tooltip title={"Delete Issue"}>
              <Button onClick={this.showDeleteConfirm.bind(this,tableMeta)} className="mt-0 mb-0" color="danger" >
              <i className="fa fa-trash"></i>
              </Button>
              </Tooltip>
              
              
             
            </>
            );
          }
        }
      },      
      ];
 
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
  }; 


  let outerArray = [];
  let innerArray= [];
  this.state.IssueData.forEach(res => {
    let jsObjs = res;
    innerArray = [];
    innerArray.push(jsObjs.issueName);
    innerArray.push(jsObjs.issueDescription);


    outerArray.push(innerArray);
  });

  console.log(this.state.vendorSingleData)
    return (
      <>
      <div className="mt-5 pt-1">
        <Card className="card-stats">
                <CardBody>
                  <Row className="">
                    <Col md="12">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-info pt-1 pl-2"><a href="/admin/dashboard">Issue Management </a>/ <span>EcoBank</span></p> 
                        <div className="d-flex justify-content-end">
                        <Button color="info" style={{backgroundColor:'#74a800'}} size="sm" onClick={this.addIssue}>Add Issue <span className="mt-1 fa fa-plus-circle"></span></Button>

                       </div>
                      </div>
                    </Col>
                    <Col>
                     
                    </Col>
                  </Row>
                </CardBody>
              </Card>
        <Card>
          <CardBody>
          <div className="col-md-8 offset-2 pt-3 pb-3" >
        <MuiThemeProvider theme={this.getMuiTheme()} >
         <MUIDataTable
         title={"ISSUES MANAGEMENT"}
         data={outerArray}
         columns={Issue}
         options={options}
         />
          </MuiThemeProvider>
        </div>

          </CardBody>
      
        </Card>
       
         
 



              </div>
             
        <Modal
          title="Add New  Issue"
          visible={this.state.addIssue}
          onOk={this.handleSearch}
          onCancel={this.handleCancelAdd}
          footer={null}
          cancelText="Clear"
          maskClosable = {false}
        
         
        >
          <div>
          <Form>
    
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Issue Name</Label>
      
          <Input type="text" name="issueName" id="exampleEmail" onChange={this.onChange}   />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Issue Description</Label>
          <Input type="text" name="issueDesc" id="exampleEmail" onChange={this.onChange}   />
      </FormGroup>
      <div className="text-right">
        <Button color="info" style={{backgroundColor:'#017cc2'}} onClick={this.addNewIssue}>ADD ISSUE</Button>
      </div>
     
    

      </Form>
          </div>
        </Modal>
         
        <Modal
          title={"view Issue details"}
          visible={this.state.view}
          onCancel={this.viewclose}
          footer={null}
          cancelText="Clear"
          maskClosable = {false}          
        >
        <Card>
        <CardBody>
       {this.props.data.length !== 0 &&  
      <Form>

      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Issue Name</Label> 
      <Input type="text"  value={this.props.data.issueName}
      disabled 
      />    
      </FormGroup>
      <br />
      
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Issue Description</Label> 
      <Input type="textarea"   value= {this.props.data.issueDescription}   disabled />
      
      </FormGroup>
      

         <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-3 pb-3 btn-block mt-3 mb-3' size="sm" onClick={this.fileUpload}>EDIT ISSUE</Button>
      
      </Form> 
 }
  
          </CardBody>
          <div>
          

          </div>
        </Card>
      </Modal>
 


        
      </>
    );
  }
  dataSet = [
    ["Direct Payment", "Direct Pay-ment Recievable","0012345678","Holds Direct Payment Recievable Transaction", "Active","NGN", 2],
  




    
];
}

const map = (state) =>({
  data : state.vendor.issue
})
export default connect(map, {singleIssue})(Issue);
