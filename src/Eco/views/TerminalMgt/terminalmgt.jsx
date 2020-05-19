
import React from "react";
// react plugin used to create charts
import { Line, Pie,Bar,Radar ,Doughnut} from "react-chartjs-2";
// reactstrap components
import axios from 'axios'
import Tooltip from "@material-ui/core/Tooltip";
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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import {showTerminal } from  '../../action/terminal'
import {connect} from  'react-redux';
class TerminalManagement extends React.Component {
  state = {
    searchTerminal: false,
    searchData: false,
    addTerminal: false,
    viewTerminalData: false,
    edit: false,
    addBulk: false,
    atmName: '',
    atmType: '',
    branchAddress: '',
    branchCode: '',
    branchName: '',
    vendor: '',
    terminalId: '',
    terminalData: [],
    vendorData: [],
    singleTerminalData: {},
    terminalChanger: false

  }

  searchTerminal = (e) => {
    e.preventDefault();
    this.setState({
      searchTerminal: true
    })

  }

  addBulk = () => {
    this.setState({addBulk: true})
  }

  onChange= (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]:  value
    })
    if(e.target.value === "Bulk Terminal"){
      this.setState({
        terminalChanger: true
      })
    }
    else if(e.target.value === "Single Terminal"){
      this.setState({
        terminalChanger: !this.state.terminalChanger

      })
    }
    // else{
    //   this.setState({
    //     
    //   })
    // }

  }


  addTerminal = (e) => {
    e.preventDefault();
    this.setState({
      addTerminal: true
    })

  }

  edit = () => {
    this.setState({edit: true, viewTerminalData: false})
  }

  editclose =() => {
    this.setState({edit:false})
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

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      searchData: true
    })
  }

  handleCancelSearch = (e) => {
    this.setState({
      searchTerminal: false
    })

  }

  handleCancelAdd = (e) => {
    this.setState({
      addTerminal: false
    })

  }

  viewTerminalData = (id) => {
    this.setState({viewTerminalData: true})
    const terminal = id.rowData[0]
    const token = sessionStorage.getItem('token')
    this.props.showTerminal(token,terminal)
  }

  viewclose = (id) => {
    this.setState({viewTerminalData: false})
  
  }

  cancelBulk =() => {
    this.setState({addBulk: false})
  }

  refresh =() => {
    const token = sessionStorage.getItem('token')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/atmterminal/all`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data.result);
      if(res.data.result.length !==0 ){
        this.setState({
          terminalData: res.data.result
        })
      }
    })

  }

  componentWillMount = () => {
    const token = sessionStorage.getItem('token')
    this.refresh();
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/vendor`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data.result);
      if(res.data.result.length !== 0){
        this.setState({
     
          vendorData: res.data.result
        })
      }
    })
  }

  addNewTerminal  = (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem('token')
    const singleData = {
      atmName: this.state.atmName,
      atmType: this.state.atmType,
      branchAddress: this.state.branchAddress,
      branchCode: this.state.branchCode,
      branchName: this.state.branchName,
      terminalId: this.state.terminalId,
      vendor: this.state.vendor,

    }
    console.log(singleData)
    axios.post(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/atmterminal/single`,singleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data)
      this.setState({addTerminal: false})
      this.refresh()
    })
  
  }

  showDeleteConfirm = (id) => {
    confirmAlert({
      message: 'Are you sure to do delete this item.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const token = sessionStorage.getItem('token');
            const terminal = id.rowData[0]
            axios.delete(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/atmterminal/${terminal}`, {
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

  fileUpload = () => {
    let formData = new FormData();
    const token = sessionStorage.getItem('token')
    formData.append('file', this.state.csv, this.state.csv.name);
    axios.post(`http://34.246.178.255:5000/byteproof-service/api/v1/terminal/bulk`,formData,{
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType : 'multipart/form-data'
      }
    }).
    then((res) => {
      console.log(res.data.result)
      this.setState({addTerminal: false})
    }).
    catch((err)=> {
      console.log(err)
    })
  }
  
 render(){
  
  const vendor =  this.state.vendorData.map((vendors) => {
    return(
      <option>{vendors.vendorName}</option>
    )
  })
  const Terminal = [
    {
        name: "Terminal ID",
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
  
        name: "Branch Name",
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
  
        name: "Branch Code",
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
        name:'Branch Address',
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
        name:'Atm Name',
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
        name: "Atm Type",
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
        name:'Vendor',
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
        name:'Status',
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
        name:'  createdBy',
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
              <Tooltip title={"View Terminal"}>
              <Button onClick={this.viewTerminalData.bind(this,tableMeta)} className="mt-0 mb-0" color=""  style={{backgroundColor:'#017cc2'}} >
               <i className="fa fa-eye"></i>
              </Button>
             </Tooltip>
             <Tooltip title={"Delete Terminal"}>
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
  this.state.terminalData.forEach(res => {
    let jsObjs = res;
    innerArray = [];
    innerArray.push(jsObjs.terminalId);
    innerArray.push(jsObjs.branchName);
    innerArray.push(jsObjs.branchCode);
    innerArray.push(jsObjs.branchAddress);
    innerArray.push(jsObjs.atmType);
    innerArray.push(jsObjs.atmName);
    innerArray.push(jsObjs.vendor);
    innerArray.push(jsObjs.status);
    innerArray.push(jsObjs.createdBy);
    outerArray.push(innerArray);
  });
    return (
      <>
      <div className="mt-5 pt-1">
        <Card className="card-stats">
                <CardBody>
                  <Row className="">
                    <Col md="12">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-info pt-1 pl-2"><a href="/admin/dashboard">Terminal Management </a>/ <span>EcoBank</span></p> 
                        <div className="d-flex justify-content-end">
                        <Button color="info" style={{backgroundColor:'#74a800'}} size="sm" onClick={this.addTerminal}>Add Terminal <span className="mt-1 fa fa-plus"></span></Button>

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
         title={"TERMINAL MANAGEMENT"}
         data={outerArray}
         columns={Terminal}
         options={options}
         />
          </MuiThemeProvider>

          
 



              </div>
             

        <Modal
          title="Add New Terminal"
          visible={this.state.addTerminal}
         footer={null}
          onCancel={this.handleCancelAdd}
          okText="Add Terminal"
          cancelText="Clear"
          maskClosable = {false}
          width= {750}
        
         
        >
          <div>
          
          <Form>
       <div className="row">
       <div className="col-md-12 pt-1">     
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Terminal Type</Label>
        <Input type="select" name="vendor" id="exampleSelect" onChange={this.onChange}>
          <option value="Single Terminal">Single Terminal</option>
          <option value="Bulk Terminal">Bulk Terminal</option>
        </Input>
      </FormGroup>
      </div>
         
         </div>   
     
      {!this.state.terminalChanger ?
      <div className="row">
            <div className="col-md-4">
            <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold pt-2">Terminal ID</Label>
        <Input type="text" name="terminalId" className="" id="exampleEmail" onChange={this.onChange}   />
      </FormGroup>
      </div>
      <div className="col-md-4">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold pt-2">Branch Code</Label>
        <Input type="text" name="branchCode" id="exampleEmail" className=""  onChange={this.onChange} />
    
      </FormGroup>
      </div>
      <div className="col-md-4">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold pt-2">Atm Name</Label>
      <Input type="text" name="atmName" className="" id="exampleEmail" onChange={this.onChange}   />

      </FormGroup>
      </div>
     
      <div className="col-md-6 pt-2">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Branch Name</Label>
      <Input type="text" name="branchName" className="" id="exampleEmail"  onChange={this.onChange}  />
       
      </FormGroup>
      </div>
      <div className="col-md-6 pt-2">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Branch Address</Label>
      <Input type="text" name="branchAddress" className="" id="exampleEmail"  onChange={this.onChange}  /> 
      </FormGroup>
      </div>
      <div className="col-md-6 pt-2">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Atm Type</Label>
       <Input type="select" name="atmType" className="" id="exampleEmail"  onChange={this.onChange} >
       <option>Select An Atm Type</option>
       <option>Wincor</option>
       <option>Hyosung</option>
       <option>NCR</option>
       <option>Dabould</option>
       </Input>
      </FormGroup>
      </div>
      

      <div className="col-md-6 pt-2">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Vendor</Label>
        <Input type="select" name="vendor" id="exampleSelect" onChange={this.onChange}>
          <option>Select A vendor</option>
          {vendor}
        </Input>
      </FormGroup>
      </div>
          
      <div className="ml-auto">
      <Button color="info" style={{backgroundColor:'#017cc2'}} className="pt-2 pb-2 mt-4" size="sm" onClick={this.addNewTerminal}>ADD TERMINAL </Button>
      </div>
      </div> :
      <div>
         <FormGroup className="pt-2">
        <label for="exampleFormControlFile1" className="text-center font-weight-bold pt-2">Attach .csv to upload bulk terminal<br/>
         <i className="fa fa-upload fa-4x pt-2"></i></label>
          <input type="file" name="csv" class="form-control-file " onChange={this.fileChange} />

       
      </FormGroup>
      <div className="text-right">
            <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" onClick={this.fileUpload} >ADD TERMINAL</Button>

            </div>

      </div>
     
      }

      </Form>
{/* 
      <form>
         <div class="form-group text-center">
         <label for="exampleFormControlFile1" className="text-center font-weight-bold">Upload Csv File<br/>
         <i className="fa fa-upload fa-3x"></i></label>
          <input type="file" name="csv" class="form-control-file" onChange={this.fileChange} />
          </div>
         <div className="text-right">
         <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" onClick={this.fileUpload}>ADD BULK TERMINAL</Button>

        </div>

      </form> */}
      
          </div>
        </Modal>


        <Modal
          title={"View Terminal Details"}
          visible={this.state.viewTerminalData}
          onCancel={this.viewclose}
          footer={null}
          cancelText="Clear"
          maskClosable = {false} 
          width={750}         
        >
        <Card>
        <CardBody>
        <div>
         
          <Form>
          <div className="row">
            <div className="col-md-4">
            <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Terminal ID</Label>
        <Input type="text" name="terminalId" value={this.props.single.terminalId}  disabled />
      </FormGroup>
      </div>
      <div className="col-md-4">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Branch Code</Label>
        <Input type="text" name="branchCode" id="exampleEmail" value={this.props.single.branchCode}  disabled  />
    
      </FormGroup>
      </div>
      <div className="col-md-4">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Atm Name</Label>
      <Input type="text" name="atmName" value={this.props.single.atmName}  disabled   />

      </FormGroup>
      </div>
     
      <div className="col-md-6 pt-2">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Branch Name</Label>
      <Input type="text" name="branchName" className="" value={this.props.single.branchName ? this.props.single.branchName : "Not Available"}  disabled   />
       
      </FormGroup>
      </div>
      <div className="col-md-6 pt-2">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Branch Address</Label>
      <Input type="text" name="branchAddress" className="" value={this.props.single.branchAddress}  disabled   /> 
      </FormGroup>
      </div>
      <div className="col-md-6 pt-2">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Atm Type</Label>
       <Input type="text" name="atmType" className="" value={this.props.single.atmType}  disabled  />
      </FormGroup>
      </div>
      

      <div className="col-md-6 pt-2">
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Vendor</Label>
        <Input type="text" name="vendor" value={this.props.single.vendor}  disabled />
       
      </FormGroup>
      </div>
          </div>
      <div className="text-right">
      <Button color="info" style={{backgroundColor:'#017cc2'}} className="pt-3 pb-3 btn btn-block" size="sm" onClick={this.addNewTerminal}>EDIT TERMINAL </Button>
      </div>

      </Form>
 
          </div>
          



          </CardBody>
     
        </Card>
      </Modal>

      <Modal
          title={"Update Terminal Details"}
          visible={this.state.edit}
          onCancel={this.editclose}
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
      <Label for="exampleSelect" className="font-weight-bold">Terminal ID</Label> 
      <Input type="text"  />    
      </FormGroup>
      </Col>
      <Col  md="6">
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Branch Code</Label> 
      <Input type="text"   />
      
      </FormGroup>
      </Col>
      </Row>
    
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Terminal Name</Label> 
      <Input type="text"      />
      
      </FormGroup>
      <Row>
      <Col md="6">
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Till Account</Label> 
      <Input type="text"   />
      
      </FormGroup>
      </Col>

      <Col md="6">
      <FormGroup>
      <Label for="exampleSelect" className="font-weight-bold">Atm Type</Label> 
      <Input type="text"     />

      </FormGroup>
      </Col>
      </Row>
      <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-3 pb-3 btn-block mt-3 mb-3' size="sm" onClick={this.edit}>UPDATE TERMINAL</Button>

       
       {/* <FormControlLabel
        control={
          <Checkbox
          //  checked ={this.props.singleData.status === 1 ? true : false}
            color="primary"
          />
        } */}
        {/* // label={this.props.singleData.status === 1 ? "Status : Enabled " : "Status: Disabled"} */}
      
      </Form> 
  
          </CardBody>
          <div>
          

          </div>
        </Card>
      </Modal>

      <Modal
          title="Add Bulk Terminal"
          visible={this.state.addBulk}
         footer={null}
          onCancel={this.cancelBulk}
          okText="Add Terminal"
          cancelText="Clear"
          maskClosable = {false} 
        >
          <div>
          <form>
         <div class="form-group text-center">
         <label for="exampleFormControlFile1" className="text-center font-weight-bold">Upload Csv File<br/>
         <i className="fa fa-upload fa-3x"></i></label>
          <input type="file" name="csv" class="form-control-file" onChange={this.fileChange} />
          </div>
         <div className="text-right">
         <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" onClick={this.fileUpload}>ADD BULK TERMINAL</Button>

        </div>

      </form>
          </div>
        </Modal>
        
      </>
    );
  }
  dataSet = [
    ["Direct Payment", "Direct Pay-ment Recievable","0012345678","Holds Direct Payment Recievable Transaction", "Active","NGN", 2],
  




    
];
}

const map = (state) => ({
  single: state.terminal.singleTerminal
})
 
export default connect(map,{showTerminal})(TerminalManagement);