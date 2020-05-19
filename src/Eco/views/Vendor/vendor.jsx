
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
import {singleVendor} from '../../action/vendor'
class Vendor extends React.Component {
  state = {
    resolveIncident: false,
    addVendor: false,
    view: false,
    vendorData: [],
    vendorName: '',
    vendorAddress: '',
    contactEmail: '',
    contactPerson:'',
    contactPhone:''
  }

  resolveIncident = (e) => {
    e.preventDefault();
    this.setState({
      resolveIncident: true
    })

  }

  addVendor = (e) => {
    e.preventDefault();
    this.setState({
      addVendor: true
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
      addVendor: false
    })

  }

  refresh = () => {
    const token = sessionStorage.getItem('token')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/vendor`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data.result);
      if(res.data.result.length > 1){
        this.setState({
          vendorData: res.data.result
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

  viewVendorData = (id) => {
    this.setState({view: true})
    const token = sessionStorage.getItem('token')
    const vendor =  id.rowData[0]
    this.props.singleVendor(token, vendor)
   
  }

  addNewVendor  = (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem('token')
    const vendorData = {
      vendorName: this.state.vendorName,
      vendorAddress: this.state.vendorAddress,
      contactEmail: this.state.contactEmail,
      contactPhone: this.state.contactPhone,
      contactPerson: this.state.contactPerson,
    }
    axios.post(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/vendor/create`,vendorData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      if(res.data.result.length !==0){
        this.setState({addVendor:false})
        this.refresh()
      }
    })
  }

  showDeleteConfirm = (id) => {
    confirmAlert({
      message: 'Are you sure to do delete this Vendor Item.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const token = sessionStorage.getItem('token');
            const vendor = id.rowData[0]
            axios.delete(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/vendor/${vendor}`, {
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
  const Vendor = [
    {
        name: "Vendor Name",
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
  
        name: "Contact Email",
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
                  paddingRight: '0px',
                  whiteSpace: 'pre',
                  color: '#172433'
                }
            };
          }
        }
      },
      {
  
        name: "Contact Person",
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
                  paddingLeft: '0px',
                  whiteSpace: 'pre',
                  color: '#172433'
                }
            };
          }
        }
      },
      {
        name:'Contact Phone',
        options: {
          filter: false,
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
          }
        }
      },
      {
        name: "Vendor Address",
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
          }
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
              <Tooltip title="View Vednor">
              <Button onClick={this.viewVendorData.bind(this,tableMeta)} className="mt-0 mb-0" color="" style={{backgroundColor:'#017cc2'}} >
               <i className="fa fa-eye"></i>
              </Button>
              </Tooltip>
              <Tooltip title={"Delete Vendor"}>
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
  this.state.vendorData.forEach(res => {
    let jsObjs = res;
    innerArray = [];
    innerArray.push(jsObjs.vendorName);
    innerArray.push(jsObjs.contactEmail);
    innerArray.push(jsObjs.contactPerson);
    innerArray.push(jsObjs.contactPhone);
    innerArray.push(jsObjs.vendorAddress);
    innerArray.push(jsObjs.status);

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
                        <Button color="info" style={{backgroundColor:'#74a800'}} size="sm" onClick={this.addVendor}>Add Vendor <span className="mt-1 fa fa-plus-circle"></span></Button>

                       </div>
                      </div>
                    </Col>
                    <Col>
                     
                    </Col>
                  </Row>
                </CardBody>
              </Card>

       
         <MuiThemeProvider theme={this.getMuiTheme()}>
         <MUIDataTable
         title={"VENDOR MANAGEMENT"}
         data={outerArray}
         columns={Vendor}
         options={options}
         />
          </MuiThemeProvider>
 



              </div>
             
        <Modal
          title="Add New Vendor"
          visible={this.state.addVendor}
          onOk={this.handleSearch}
          onCancel={this.handleCancelAdd}
          footer={null}
          cancelText="Clear"
          maskClosable = {false}
        
         
        >
          <div>
          <Form>
    
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Vendor Name</Label>
      
          <Input type="text" name="vendorName" id="exampleEmail" onChange={this.onChange}   />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Contact Email</Label>
          <Input type="text" name="contactEmail" id="exampleEmail" onChange={this.onChange}   />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Contact Person</Label>
      
          <Input type="text" name="contactPerson" id="exampleEmail" onChange={this.onChange}   />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Contact Phone</Label>
      
          <Input type="text" name="contactPhone" id="exampleEmail" onChange={this.onChange}   />
      </FormGroup>
      
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Vendor Address</Label>
       <Input type="textarea" name="vendorAddress" id="exampleEmail"  onChange={this.onChange}  />
      </FormGroup>
    
      
   
      
      <div className="text-right">
        <Button color="info" style={{backgroundColor:'#017cc2'}} onClick={this.addNewVendor}>ADD VENDOR</Button>
      </div>
     
    

      </Form>
          </div>
        </Modal>
         {this.props.vendor.length !==0 &&
        <Modal
          title={"view Vendor details"}
          visible={this.state.view}
          onCancel={this.viewclose}
          footer={null}
          cancelText="Clear"
          maskClosable = {false}          
        >
        <Card>
        <CardBody>
         
      <Form>
      <Row>
      <Col className="" md="6">
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Vendor Name</Label> 
      <Input type="text"  value={this.props.vendor.vendorName}
      disabled 
      />    
      </FormGroup>
      </Col>
      <Col  md="6">
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Vendor Address</Label> 
      <Input type="text"   value= {this.props.vendor.vendorAddress}   disabled />
      
      </FormGroup>
      </Col>
      </Row>
    
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Contact Person</Label> 
      <Input type="text"   value= {this.props.vendor.contactPerson}   disabled  />
      
      </FormGroup>
      <Row>
      <Col md="6">
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Contact Phone</Label> 
      <Input type="text"   value= {this.props.vendor.contactPhone}  disabled  />
      
      </FormGroup>
      </Col>

      <Col md="6">
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Contact Email</Label> 
      <Input type="text"  value= {this.props.vendor.contactEmail}  disabled  />

      </FormGroup>
      </Col>
      </Row>
     

       
       <FormControlLabel
        control={
          <Checkbox
          //  checked ={this.props.singleData.status === 1 ? true : false}
            color="primary"
          />
        }
        label={this.props.vendor.status === 1 ? "Status : Enabled " : "Status: Disabled"}>

        </FormControlLabel>
         <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-3 pb-3 btn-block mt-3 mb-3' size="sm" onClick={this.fileUpload}>EDIT VENDOR</Button>
      
      </Form> 
  
          </CardBody>
          <div>
          

          </div>
        </Card>
      </Modal>
 }


        
      </>
    );
  }
  dataSet = [
    ["Direct Payment", "Direct Pay-ment Recievable","0012345678","Holds Direct Payment Recievable Transaction", "Active","NGN", 2],
  




    
];
}

const map = (state) =>({
  vendor : state.vendor.singleVendor
})
export default connect(map, {singleVendor})(Vendor);
