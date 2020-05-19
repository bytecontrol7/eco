
import React from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import cssimport { Line, Pie,Bar,Radar ,Doughnut} from "react-chartjs-2";
import Tooltip from "@material-ui/core/Tooltip";
import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import moment from 'moment'
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
import {connect} from 'react-redux'
import {showIncident , incident} from '../../action/terminal'
class IssueManagement extends React.Component {
  state = {
    first: true,
    second: false,
    third: false,
    fourth: false,
    resolveIncident: false,
    addBulk: false,
    addIncident: false,
    terminal: false,
    view: false,
    issueList: [],
    incidentData: [],
    terminalId:'',
    incidentRef: '',
    issue: '',
    faultDesc: '',
    vendor: '',
    field: '',
    name: '',
    status: '',
    resolution:'',
    age:'',
    atmType: '',
    dateLogged: '',
    dateResolved: '',
    num:'',
    allTerminals: [],
    allVendors: [],
    allIssues: [],
    incidentTerminalData: [],
    terminalChanger: false,
    searchChangerIncident:false,
    searchChangerTerminal: false,
    searchIncident: '',
    searchTerminal: '',
    searchDate1: '',
    searchDate2: '',
    csv: '',
    bulkData: [],
    totalincident: [],
    viewIncident: false
  }

  resolveIncident = (e) => {
    e.preventDefault();
    this.setState({
      resolveIncident: true
    })

  }

  viewincidentclose =() => {
    this.setState({viewIncident: false})
  }

  terminal = () => {
    this.setState({terminal: true})
  }

  fileUpload = () => {
    console.log(this.state.csv)
    let formData = new FormData();
    const token = sessionStorage.getItem('token')
    formData.append('incidents', this.state.csv, this.state.csv.name);
    axios.post(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/incident/bulk`,formData,{
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType : 'multipart/form-data'
      }
    }).
    then((res) => {
      console.log(res.data.result)
     
        this.setState({
          addIncident: false, bulkData: res.data.result, first: false, second:true
        })
    }).
    catch((err)=> {
      console.log(err)
    })
  }

  // componentWillReceiveProps =(nextProps)  => {
  //   if(nextProps.singleIncident.length !== 0 ){
  //     this.setState({viewIncident: true, terminal: false})
  //   }
  //   else{
  //     this.setState({viewIncident: false})
  //   }

  // }

  
  Cancelterminal = () => {
    this.setState({terminal: false})
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
        terminalChanger:!this.state.terminalChanger
      })
    }

    if(e.target.value === "By Incident Ref"){
      this.setState({
        searchChangerIncident: true, searchChangerTerminal:false
      })
    }
    else if(e.target.value === "By Terminal ID"){
      this.setState({
        searchChangerIncident: false, searchChangerTerminal:true
      })
    }

    else if(e.target.value === "Select Search Method"){
      this.setState({
        searchChangerIncident: false, searchChangerTerminal:false
      })
    }

    

  }

  fileChange = (event) => {
    this.setState({
      csv: event.target.files[0]
    })
  }

  add = () => {
    this.setState({
      addIncident: true
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

  handleCancelBulk = (e) => {
    this.setState({
     addBulk: false
    })

  }

  handleCancelAdd = (e) => {
    this.setState({
      addIncident: false
    })

  }

  viewIssueData = (id) => {
    
    const token = sessionStorage.getItem('token')
    const incident = id.rowData[1];
    this.props.showIncident(token,incident);
    this.setState({view: true})
  
  }

  getAllVendors = () => {
    const token = sessionStorage.getItem('token')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/vendor`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data.result);
      if(res.data.result.length !==0 ){
        this.setState({
          allVendors: res.data.result
        })
      }
    })


  }
  getAllTerminals = () => {
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
          allTerminals: res.data.result
        })
      }
    })

    
  }
  getAllIssues = () => {
    const token = sessionStorage.getItem('token')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/issue`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data.result);
      if(res.data.result.length !==0 ){
        this.setState({
          allIssues: res.data.result
        })
      }
    })

    
  }

  getAllIncidents = () => {
    const token = sessionStorage.getItem('token')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/incident/all`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data.result);
      if(res.data.result.length !==0 ){
        this.setState({
          totalincident: res.data.result
        })
      }
    })

    
  }

  refresh = () => {
    const token = sessionStorage.getItem('token')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/incident/all`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data.result);
      if(res.data.result.length !==0 ){
        this.setState({
          incidentData: res.data.result
        })
      }
    })

    
    
  }

  componentWillMount = () => {
    const token = sessionStorage.getItem('token')
    this.refresh();
    this.getAllTerminals();
    this.getAllIssues();
    this.getAllVendors();
    this.getAllIncidents();
  }

  getIncident = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token')
    
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/incident/all/${this.state.incidentTerminal}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data.result);
      if(res.data.result.length !== 0){
        this.setState({
          incidentTerminalData: res.data.result, terminal:false
        })
      }
    })

  }

  addIncident  = (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem('token')
    const singleData = {
      terminalid: this.state.terminalId,
      issue: this.state.issue,
      faultDescription: this.state.faultDesc,
      vendor: this.state.vendor,
      custodianName: this.state.name,
      status: this.state.status,
      resolution: this.state.resolution,
      age:this.state.age,
      atmType: this.state.atmType,
      dateLogged: this.state.dateLogged,
      dateResolved: this.state.dateResolved,
      callNo: this.state.num,
      fieldReport: this.state.field,

      
      // incidentRef: this.state.incidentRef.length === 16 ? this.state.incidentRef : this.state.incidentRef + '0'

    }
    axios.post(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/incident/single`,singleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data)
      this.setState({incidentRef: res.data.result.incidentRef, addIncident: false})
      this.refresh()

    })
  }

  showDeleteConfirm = (id) => {
    confirmAlert({
      message: 'Are you sure to do delete this Incident.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const token = sessionStorage.getItem('token');
            const terminal = id.rowData[1]
            axios.delete(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/incident/${terminal}`, {
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

  byDate = () => {
    const dates = {
      dateFrom : this.state.searchDate1,
      dateTo: this.state.searchDate2
    }
    console.log(dates)
  }

  byTerminal = () => {
    const token =sessionStorage.getItem('token')
    axios.get(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/incident/all/${this.state.searchTerminal}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).
    then((res) => {
      console.log(res.data)
      this.setState({incidentTerminalData: res.data.result, first:false, second:false, third:true, terminal: false})
      
      

    })
  }

  byIncident =() => {
    const token =sessionStorage.getItem('token')
    this.props.incident(token,this.state.searchIncident)
    this.setState({terminal:false})

  }
  
 render(){
  const Issue = [
    {
        name: "Terminal ID",
        options: {
          filter: true,
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '30px',
                  fontWeight: 'bold'
                }
            };
          },
  
        }
      },
      {
  
        name: "Incident Ref",
        options: {
          filter: true,
         
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  paddingRight: '90px',
                  whiteSpace: 'pre',
                  color: '#172433',
                  fontWeight: 'bold'

                }
            };
          }
        }
      },
      
      {
        name:'Fault Description',
        options: {
          filter: false,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  paddingRight: '70px',
                  whiteSpace: 'pre',
                  color: '#172433',
                  fontWeight: 'bold'
                }
            };
          }
        }
      },
      
      {
        name: "Field Report",
        options: {
          filter: true,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '50px',
          
                }
            };
          }
        }
      },
      {
        name: "Resolution",
        options: {
          filter: true,
         
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  color: '#172433',
                  paddingRight: '30px',
          
                }
            };
          }
        }
      },
      {
        name: "Custodian Name",
        options: {
          filter: true,
         
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  paddingRight: '80px',
                  whiteSpace: 'pre',
                  color: '#172433',
                  fontWeight: 'bold'
          
                }
            };
          }
        }
      },
      {
  
        name: "Issue",
        options: {
          filter: true,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  paddingRight: '60px',

  
                  whiteSpace: 'pre',
                  color: '#172433',
                  fontWeight: 'bold'
                }
            };
          }
        }
      },
      {
        name: "Vendor",
        options: {
          filter: true,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '50px',
          
                }
            };
          }
        }
      },
   
      {
        name: "Atm Type",
        options: {
          filter: true,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '30px',
          
                }
            };
          }
        }
      },
      {
        name: "Call No",
        options: {
          filter: true,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '70px',
          
                }
            };
          }
        }
      },
      {
        name: "Age",
        options: {
          filter: true,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '30px',
          
                }
            };
          }
        }
      },
      {
        name: "Date Logged",
        options: {
          filter: true,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '30px',
          
                }
            };
          }
        }
      },
      {
        name: "Date Resolved",
        options: {
          filter: true,
         
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '30px',
          
                }
            };
          }
        }
      },
      {
        name: "Created By",
        options: {
          filter: true,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '30px',
          
                }
            };
          }
        }
      },
      {
        name: "Status",
        options: {
          filter: true,
          
          setCellHeaderProps: (value) => {
            return {
             
                style: {
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#172433',
                  paddingRight: '30px',
          
                }
            };
          }
        }
      },
      {
        name: "Action",
        options: {
          filter: false,
         
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
              <Tooltip title="View Incident">
              <Button onClick={this.viewIssueData.bind(this,tableMeta)} className="mt-0 mb-0" color="" style={{backgroundColor:'#017cc2'}} >
               <i className="fa fa-eye"></i>
              </Button>
              </Tooltip>
              <Tooltip title={"Delete Incident"}>
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
    setRowProps: (row) => {
      return {
        style: {whiteSpace: 'nowrap',}
      };
    },
  }; 

  let outerArray = [];
  let innerArray= [];
  this.state.incidentData.forEach(res => {
    let jsObjs = res;
    innerArray = [];
    innerArray.push(jsObjs.terminalid);
    innerArray.push(jsObjs.incidentRef);
    innerArray.push(jsObjs.faultDescription);
    innerArray.push(jsObjs.fieldReport);
    innerArray.push(jsObjs.resolution);
    innerArray.push(jsObjs.custodianName);
    innerArray.push(jsObjs.issue);
    innerArray.push(jsObjs.vendor);
    innerArray.push(jsObjs.atmType);
    innerArray.push(jsObjs.callNo);
    innerArray.push(jsObjs.age);
    innerArray.push(jsObjs.dateLogged);
    innerArray.push(jsObjs.dateResolved);
    innerArray.push(jsObjs.createdBy);
    innerArray.push(jsObjs.status);
    outerArray.push(innerArray);
  });

  let outerArray2 = [];
  let innerArray2= [];
  this.state.incidentTerminalData.forEach(res => {
    let jsObjs = res;
    innerArray2 = [];
    innerArray.push(jsObjs.terminalid);
    innerArray2.push(jsObjs.incidentRef);
    innerArray2.push(jsObjs.faultDescription);
    innerArray2.push(jsObjs.fieldReport);
    innerArray2.push(jsObjs.resolution);
    innerArray2.push(jsObjs.custodianName);
    innerArray2.push(jsObjs.issue);
    innerArray2.push(jsObjs.vendor);
    innerArray2.push(jsObjs.atmType);
    innerArray2.push(jsObjs.callNo);
    innerArray2.push(jsObjs.age);
    innerArray2.push(jsObjs.dateLogged);
    innerArray2.push(jsObjs.dateResolved);
    innerArray2.push(jsObjs.createdBy);
    innerArray2.push(jsObjs.status);
    outerArray2.push(innerArray);
  });

  let outerArray3 = [];
    let innerArray3= [];
    this.state.bulkData.map(res => {
      let jsObjs = res;
      innerArray3 = [];
      innerArray3.push(jsObjs.terminalid);
      innerArray3.push(jsObjs.incidentRef);
      innerArray3.push(jsObjs.faultDescription);
      innerArray3.push(jsObjs.fieldReport);
      innerArray3.push(jsObjs.resolution);
      innerArray3.push(jsObjs.custodianName);
      innerArray3.push(jsObjs.issue);
      innerArray3.push(jsObjs.vendor);
      innerArray3.push(jsObjs.atmType);
      innerArray3.push(jsObjs.callNo);
      innerArray3.push(jsObjs.age);
      innerArray3.push(jsObjs.dateLogged);
      innerArray3.push(jsObjs.dateResolved);
      innerArray3.push(jsObjs.createdBy);
      innerArray3.push(jsObjs.status);
      outerArray3.push(innerArray3);
    });



  const allTerminals = this.state.allTerminals.map((terminals) => {
    return(
      <option>{terminals.terminalId}</option>
    )
  })

  const allVendors = this.state.allVendors.map((vendors) => {
    return(
      <option>{vendors.vendorName}</option>
    )
  })

  const allIssues = this.state.allIssues.map((issues) => {
    return(
      <option>{issues.issueName}</option>
    )
  })

  const getAllIncidents = this.state.totalincident.map((incident)=>{
    return(
      <option>{incident.incidentRef}</option>
    )
  })

  console.log('Props are' + this.props.iss.issue)

 
  


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
                        <Button color="info" style={{backgroundColor:'#74a800'}} size="sm" onClick={this.terminal}>Search <span className="mt-1 fa fa-search"></span></Button>
                        <Button color="info" style={{backgroundColor:'#74a800'}} size="sm" onClick={this.add}>Add Incident <span className="mt-1 fa fa-plus-circle"></span></Button>
                        <Button color="info" style={{backgroundColor:'#74a800'}} size="sm" onClick={this.resolveIncident}>Resolve Issue <span className="mt-1 fa fa-plus-circle"></span></Button>

                       </div>
                      </div>
                    </Col>
                    <Col>
                     
                    </Col>
                  </Row>
                </CardBody>
              </Card>

         {this.state.first   &&
         <MuiThemeProvider theme={this.getMuiTheme()}>
         <MUIDataTable
         title={"INCIDENT MANAGEMENT"}
         data={outerArray}
         columns={Issue}
         options={options}
         />
          </MuiThemeProvider>
 }
         {this.state.second &&
        <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
        title={"BULK"}
        data={outerArray3}
        columns={Issue}
        options={options}
        />
         </MuiThemeProvider>}

          {this.state.third &&
          <MuiThemeProvider theme={this.getMuiTheme()}>
         <MUIDataTable
         title={"RESULT"}
         data={outerArray2}
         columns={Issue}
         options={options}
         />
          </MuiThemeProvider>}

        
          
 



              </div>
              <Modal
          title="Add Bulk Incidents"
          visible={this.state.addBulk}
          onCancel={this.handleCancelBulk}
          okText="Create"
          cancelText=""
          maskClosable = {false}
          footer={null}
        >
          <div>
          <form>
    <div class="form-group text-center">
    <label for="exampleFormControlFile1" className="text-center font-weight-bold">Upload Csv File<br/>
    <i className="fa fa-upload fa-3x"></i></label>
    <input type="file" name="csv" class="form-control-file" onChange={this.fileChange} />
  </div>
  <div className="text-right">
  <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" onClick={this.fileUpload}>ADD BULK INCIDENTS</Button>

  </div>

      </form>
          </div>
        </Modal>
  

        <Modal
          title="Add New Incident"
          visible={this.state.addIncident}
          onOk={this.handleSearch}
          onCancel={this.handleCancelAdd}
          footer={null}
          cancelText="Clear"
          maskClosable = {false}
          width = {950}
         
       
        
         
        >
          <div>
          <Form onSubmit = {this.addIncident}>
            <div class="row">
            <div className="col-md-12">
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
            <div>
            <Row>
              <div class="col-md-6">
             
      <FormGroup>
        <Label for="exampleEmail" className="font-weight-bold">Terminal ID</Label>
      <Input type="select" name="terminalId" id="exampleEmail" onChange={this.onChange} >
        <option>Select Terminal ID</option>
        {allTerminals}
      </Input>
      </FormGroup>
    
              </div>
              <div class="col-md-6">
             
              <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Fault Description</Label>
             <Input type="textarea" name="faultDesc" id="exampleEmail"  onChange={this.onChange}  />
      </FormGroup>
           
                     </div>
              <Col md = "4">
              {/* <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Incident Ref</Label>
      <Input type="text" name="incidentRef" id="exampleEmail" value={this.state.incidentRef} disabled />
       
      </FormGroup> */}
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Issue</Label>
          <Input type="select" name="issue" id="exampleEmail" onChange={this.onChange}>
            <option>Select An Issue</option>
        {allIssues}>
          </Input>
      </FormGroup>
   
      
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Terminal Vendor</Label>
             <Input type="select" name="vendor" id="exampleEmail"  onChange={this.onChange}>
             <option>Select Vendor</option>
              {allVendors}
             </Input>
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Field Report</Label>
             <Input type="textarea" name="field" id="exampleEmail"  onChange={this.onChange}  />
      </FormGroup>

              </Col>
              <Col md = "4">
              <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold"> Custodian Name</Label>
      <Input type="text" name="name" id="exampleEmail" onChange={this.onChange} />
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Status</Label>
      
          <Input type="text" name="status" id="exampleEmail" onChange={this.onChange}   />
      </FormGroup>
   
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Resolution</Label>
             <Input type="text" name="resolution" id="exampleEmail"  onChange={this.onChange}  />
     
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Age</Label>
             <Input type="text" name="age" id="exampleEmail"  onChange={this.onChange}  />
     
      </FormGroup>
              </Col>
              <Col md = "4">
        <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Atm Type</Label>
      <Input type="select" name="atmType" id="exampleEmail" onChange={this.onChange}>
         <option>Select An Atm Type</option>
        <option>Wincor</option>
        <option>NCR</option>
        <option>Daolib</option>
        <option>Hyosung</option>
      </Input>
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Date Logged</Label>
          <Input type="text" name="dateLogged" id="exampleEmail" onChange={this.onChange}   />
      </FormGroup>
   
      <FormGroup className="pt-1">
        <Label for="exampleEmail"  className="font-weight-bold">Date Resolved</Label>
             <Input type="text" name="dateResolved" id="exampleEmail"  onChange={this.onChange}  />
     
      </FormGroup>
      
      <FormGroup className="pt-1">
        <Label for="exampleEmail"  className="font-weight-bold">Call Number</Label>
             <Input type="text" name="num" id="exampleEmail"  onChange={this.onChange}  />
     
      </FormGroup>
     
     
  
        </Col>
     
     
      
              
            </Row>
            <div className="text-right">
            <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" >ADD INCIDENT</Button>

            </div>
            </div>:
          <div>
            <FormGroup className="pt-2">
          <label for="exampleFormControlFile1" className="text-center font-weight-bold pt-2">{this.state.csv ? this.state.csv.name : "Attach .csv to upload bulk terminal"}<br/>
           <i className="fa fa-upload fa-4x pt-2"></i></label>
            <input type="file" name="csv" class="form-control-file " onChange={this.fileChange} />

          </FormGroup>
          <div className="text-right">
            <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" onClick={this.fileUpload} >ADD INCIDENT</Button>

            </div>
         

          </div>
          
          
        
           }

      
      </Form>
          </div>
        </Modal>

        <Modal
          title="Search Incident"
          visible={this.state.terminal}
          onCancel={this.Cancelterminal}
          okText="Create"
          cancelText=""
          maskClosable = {false}
          footer={null}
          width={500}
        >
          <div>
          <form>
          <FormGroup className="pt-2">
        <Label for="exampleEmail"  className="font-weight-bold">Search By</Label>
             <Input type="select" name="incidentTerminal" id="exampleEmail"  onChange={this.onChange} >
               <option>Select Search Method</option>
               <option>By Incident Ref</option>
               <option>By Terminal ID</option>
             </Input>
      </FormGroup>
      {/* {!this.state.searchChangerIncident ? 
       <div className="row">
         <div className="col-md-6">
         <FormGroup className="pt-2">
        <Label for="exampleEmail"  className="font-weight-bold">Date From</Label>
             <Input type="text" name="searchDate1" id="exampleEmail"  onChange={this.onChange} />
             </FormGroup>

         </div>
         <div className="col-md-6">
         <FormGroup className="pt-2">
        <Label for="exampleEmail"  className="font-weight-bold">Date To</Label>
             <Input type="text" name="searchDate2" id="exampleEmail"  onChange={this.onChange} />
             </FormGroup>

         </div>
       </div>: ""} */}
       {this.state.searchChangerIncident && 
       <div>
         <FormGroup className="pt-2">
        <Label for="exampleEmail"  className="font-weight-bold">Input Incident Ref</Label>
             <Input type="select" name="searchIncident" id="exampleEmail"  onChange={this.onChange}>
             <option>Select Incident</option>
               {getAllIncidents}
             </Input>
             </FormGroup>
             <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" onClick={this.byIncident}>SEARCH BY INCIDENT</Button>


       </div>
       
 }
    {this.state.searchChangerTerminal  &&
    <div>
       <FormGroup className="pt-2">
        <Label for="exampleEmail"  className="font-weight-bold">Input Terminal ID</Label>
             <Input type="select" name="searchTerminal" id="exampleEmail"  onChange={this.onChange}>
               <option>Select Terminal</option>
               {allTerminals}
             </Input>
             </FormGroup>
          
                 <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" onClick={this.byTerminal}>SEARCH BY TERMINAL</Button>


    </div>
 }
{!this.state.searchChangerTerminal && !this.state.searchChangerIncident &&
<Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" onClick={this.byDate}>SEARCH BY DATE</Button>
 }
 
      
   
      </form>
          </div>
        </Modal>
  

        <Modal
          title="Resolve Incidents"
          visible={this.state.resolveIncident}
          // onOk={this.fileUpload}
          onCancel={this.handleCancelSearch}
          okText="Create"
          cancelText=""
          maskClosable = {false}
          footer={null}
        >
          <div>
          <form>
    <div class="form-group text-center">
    <label for="exampleFormControlFile1" className="text-center font-weight-bold">Upload Csv File<br/>
    <i className="fa fa-upload fa-3x"></i></label>
    <input type="file" name="csv" class="form-control-file" onChange={this.fileChange} />
  </div>
  <div className="text-right">
  <Button color="info" style={{backgroundColor:'#017cc2'}} className='pt-2 pb-2' size="sm" onClick={this.fileUpload}>RESOLVE INCIDENTS</Button>

  </div>

      </form>
          </div>
        </Modal>


         {this.props.iss.length !== 0 &&
        <Modal
          title={"view Issue details"}
          visible={this.state.view}
          onCancel={this.viewclose}
          footer={null}
          cancelText="Clear"
          maskClosable = {false}     
          width={850}     
        >
                  <div>
          <Form>

            <div className="d-flex justify-content-start align-items-center">

            <FormGroup className="pl-0 ml-0 col-md-4">
        <Label for="exampleEmail" className="font-weight-bold">Terminal ID</Label>
             <Input type="text" value={this.props.iss.terminalid} disabled />
      </FormGroup>
            </div>
            <Row>
              <Col md = "4">
              <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Incident Ref</Label>
      <Input type="text"  value={this.props.iss.incidentRef}  disabled  />
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Issue</Label>
          <Input type="text" name="issue" value={this.props.iss.issue} disabled />
          
      </FormGroup>
   
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Fault Description</Label>
             <Input type="text" value={this.props.iss.faultDescription} disabled  />
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold"> Atm terminal vendor</Label>
             <Input type="text" value={this.props.iss.vendor}  disabled />
            
      </FormGroup>

              </Col>
              <Col md = "4">
              <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold"> Custodian Name</Label>
      <Input type="text" name="name" value={this.props.iss.custodianName}  disabled />
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Status</Label>
      
          <Input type="text" name="status" value={this.props.iss.status} disabled  />
      </FormGroup>
   
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Resolution</Label>
             <Input type="text" value={this.props.iss.resolution} disabled  />
     
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Age</Label>
             <Input type="text" name="age" value={this.props.iss.age}  disabled  />
     
      </FormGroup>
              </Col>
              <Col md = "4">
        <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Atm Type</Label>
      <Input type="text" name="atmType" value={this.props.iss.atmType}  disabled />
    
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Date Logged</Label>
          <Input type="text" name="dateLogged" value={this.props.iss.dateLogged} disabled   />
      </FormGroup>
   
      <FormGroup className="pt-1">
        <Label for="exampleEmail"  className="font-weight-bold">Date Resolved</Label>
             <Input type="text" name="dateResolved" value={this.props.iss.dateResolved} disabled  />
     
      </FormGroup>
      
      <FormGroup className="pt-1">
        <Label for="exampleEmail"  className="font-weight-bold">Call Number</Label>
             <Input type="text" name="CallNo" value={this.props.iss.callNo} disabled  />
     
      </FormGroup>
     
     
  
        </Col>  
</Row>
         
         
      </Form>
          </div>
      </Modal>
   }


{/* {this.props.singleIncident.length !== 0 &&
      <Modal
          title={"view Incident Search details"}
          visible={this.state.viewIncident}
          onCancel={this.viewincidentclose}
          footer={null}
          cancelText="Clear"
          maskClosable = {false}     
          width={850}     
        >
                  <div>
          <Form>

            <div className="d-flex justify-content-start align-items-center">

            <FormGroup className="pl-0 ml-0 col-md-4">
        <Label for="exampleEmail" className="font-weight-bold">Terminal ID</Label>
             <Input type="text" value={this.props.singleIncident.terminalid} disabled />
      </FormGroup>
      <FormGroup className="pl-0 ml-0 col-md-8">
        <Label for="exampleEmail" className="font-weight-bold">Field Report</Label>
             <Input type="text" value={this.props.singleIncident.fieldReport} disabled />
      </FormGroup>
            </div>
            
            <Row>
              <Col md = "4">
              <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Incident Ref</Label>
      <Input type="text"  value={this.props.singleIncident.incidentRef}  disabled  />
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Issue</Label>
          <Input type="text" name="issue" value={this.props.singleIncident.issue} disabled />
          
      </FormGroup>
   
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Fault Description</Label>
             <Input type="text" value={this.props.singleIncident.faultDescription} disabled  />
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold"> Atm terminal vendor</Label>
             <Input type="text" value={this.props.singleIncident.vendor}  disabled />
            
      </FormGroup>

              </Col>
              <Col md = "4">
              <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold"> Custodian Name</Label>
      <Input type="text" name="name" value={this.props.singleIncident.custodianName}  disabled />
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Status</Label>
      
          <Input type="text" name="status" value={this.props.singleIncident.status} disabled  />
      </FormGroup>
   
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Resolution</Label>
             <Input type="text" value={this.props.singleIncident.resolution} disabled  />
     
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Age</Label>
             <Input type="text" name="age" value={this.props.singleIncident.age}  disabled  />
     
      </FormGroup>
              </Col>
              <Col md = "4">
        <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Atm Type</Label>
      <Input type="text" name="atmType" value={this.props.singleIncident.atmType}  disabled />
    
      </FormGroup>
      <FormGroup className="pt-1">
        <Label for="exampleEmail" className="font-weight-bold">Date Logged</Label>
          <Input type="text" name="dateLogged" value={this.props.singleIncident.dateLogged} disabled   />
      </FormGroup>
   
      <FormGroup className="pt-1">
        <Label for="exampleEmail"  className="font-weight-bold">Date Resolved</Label>
             <Input type="text" name="dateResolved" value={this.props.singleIncident.dateResolved} disabled  />
     
      </FormGroup>
      
      <FormGroup className="pt-1">
        <Label for="exampleEmail"  className="font-weight-bold">Call Number</Label>
             <Input type="text" name="CallNo" value={this.props.singleIncident.callNo} disabled  />
     
      </FormGroup>
     
     
  
        </Col>  
            </Row>
         
        
      
      </Form>
          </div>
      </Modal>} */}



        
      </>
    );
  }
 
}

const map = state => ({
  iss: state.terminal.single,
  singleIncident: state.terminal.incident
})

export default connect(map, {showIncident, incident})(IssueManagement);
