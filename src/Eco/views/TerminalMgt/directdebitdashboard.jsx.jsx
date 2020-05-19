import React from "react";
import { Modal } from 'antd';
import ClassAlertSuccess from '../../Alerts/Success/class'
import {Card,CardHeader,CardBody,CardFooter,CardTitle,Row,Button,Form, FormGroup, Label, Input, FormText,Col,CardText,UncontrolledAlert, } from "reactstrap";
import logo2 from "../../assets/img/zen.jpeg";
import { dashboard24HoursPerformanceChart, dashboardEmailStatisticsChart,dashboardNASDAQChart} from "../../variables/charts";
import Header from '../../components/Navbars/DemoNavbar'
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import axios from 'axios';
import {columnsSearchClass, columnsaddClass, columnSearchAccount  } from '../../module_columns/account';
import classnames from 'classnames';
import { Helmet } from 'react-helmet'
class DirectDebitDashboard extends React.Component {

  state = {
    modal: false,
    createModal: false,
    show: false,
    data:[],
    status: false,
    active: false,
    select: '',
    groupname: '',
    groupList : [],
    groupnameErr: false,
    classstatus: '',
    classstatusErr: false,
    message: '',
    status2: '',
    message2: '',
    bpgroupname:'',
    bpdesc:'',
    bpclass:'',
    createdby: '',
    matching:'',
    classStatus: '',
    apiStatus: false,
    apiStatus2: false,
    classData: [],
    msg: false,
    bill: true,
    apiError: false
  }
  componentWillMount = () => {
   
   this.groupApi();
  }
  // refresh = () => {
  //   axios.get(`http://localhost:13006/api/byteproof/v1/class/getclass?groupname=Prudential Zenith NIG.&classstatus=Active&page=0&size=10`,{
  //     auth: {
  //       username: 'ByteClient2',
  //       password: 'Password'
  //     }
  //   }).
  //   then((res)=> {
  //     console.log(res.data)
  //     console.log('testing')
  //     console.log('api')
  //     this.setState({
  //       classData: res.data.result
  //     }) 
  //   }).
  //   catch((err) => {
  //     console.log(err)
  //   })

  // }
  groupApi = () => {
    axios.get(`http://34.246.178.255:13006/api/byteproof/v1/bpgroup/getAllGroupNames`,{
      auth: {
        username: 'ByteClient2',
        password: 'Password'
      }
    }).
    then((res)=> {
      this.setState({
        groupList: res.data
      }) 
    }).
    catch((err) => {
    
    })
  }

handleCancel = e => {
  console.log(e);
  this.setState({
    modal: false, status: false
  });


 
};

handleOk2 = e => {
  console.log(e);
  this.setState({
    createModal: false,
  });
};

handleCancel2 = e => {
  console.log(e);
  this.setState({
    createModal: false,
  });
};

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
        backgroundColor: '#0e4d92'
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

  toggle = (e) => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal, show: true
    })
  }

    toggle2 = (e) => {
      e.preventDefault();
      this.setState({
        createModal: !this.state.createModal
      })
  }

  validateSearch = () => {
    let groupnameErr = false;
    let classstatusErr = false;
    if(!this.state.groupname){
      groupnameErr = true
    }
    if(!this.state.classstatus){
      classstatusErr = true
    }
    if(groupnameErr){
      this.setState({
        groupnameErr, classstatusErr
      })
      setTimeout(()=>{
        this.setState({
          classstatusErr: false, groupnameErr: false
        })

      },500)
      return false;
    }
   
  
    return true;
  }

  classSearch = (e) => {
    e.preventDefault();
    const classData = {
      groupname: this.state.groupname,
      classstatus: this.state.classstatus
    }
    const isValid = this.validateSearch();
    if(isValid){
      this.setState({
        status: true
      })
      axios.get(`http://34.246.178.255:13006/api/byteproof/v1/class/getclass?groupname=${this.state.groupname}&classstatus=${this.state.classstatus}`,{
        auth: {
          username: 'ByteClient2',
          password: 'Password'
        }
      }).
      then((res)=> {
        console.log(res.data)
        this.setState({
          status: false, data: res.data.result, message: res.data.message, modal: false, apiStatus: res.data.status, apiStatus2: false,bill: false
        }) 
      }).
      catch((err) => {
        console.log(err)
        this.setState({
          apiError: true
        })
        setTimeout(()=> {
          this.setState({
            apiError: false
          })
        },2000)
        
      })

    }
    else{
      this.setState({
        error: true
      })
      setTimeout(()=>{
        this.setState({
          error: false
        })
      },1000)
    }
  }

  classCreate = (e) => {
    e.preventDefault();
    const classData = {
      groupname: this.state.bpgroupname,
      classstatus: this.state.classStatus,
      classname: this.state.bpclass,
      classdescription: this.state.bpdesc,
      createdBy: this.state.createdby,
      classAutoMatching: this.state.matching,
    }
    console.log(classData)
    if(classData.groupname && classData.classstatus && classData.classname && classData.classdescription && classData.classAutoMatching && classData.createdBy){
      this.setState({
        status2: true
      })
      axios.post(`http://34.246.178.255:13006/api/byteproof/v1/class/create`,classData,{
        auth: {
          username: 'ByteClient2',
          password: 'Password'
        }
      }).
      then((res)=> {
        console.log(res.data)
        this.setState({
          status2: false, createModal: false, apiStatus2: res.data.status, msg: true, apiStatus: false,bill: false
        })
        this.refresh();
        setTimeout(()=>{
          this.setState({
            msg: false
          })
        },2600)
      }).
      catch((err) => {
        console.log(err)
      })

    }
    else{
      this.setState({
        error: true
      })
      setTimeout(()=>{
        this.setState({
          error: false
        })
      },1000)
    }
  }


  onChange =(e) => {
    const {name, value} = e.target;
    this.setState({
      [name] :  value
    })

  }

  render() {
    
    const data = [
      ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000", "$100,000", "$100,000"],
      ["Aiden Lloyd", "Business Consultant", "Dallas",  55, "$200,000", "$200,000", "$200,000"],
      ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000", "$500,000", "$500,000"],
      ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000", "$50,000", "$50,000"],
      ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000", "$75,000", "$75,000"],
      ["Blake Duncan", "Business Management Analyst", "San Diego", 65, "$94,000", "$94,000", "$94,000"],
      ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000", "$210,000", "$210,000"],
      ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000", "$65,000", "$65,000"],
      ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000", "$77,000", "$77,000"],
      ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000", "$135,000", "$135,000"],
      ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000", "$420,000", "$420,000"],
      ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000", "$150,000", "$150,000"],
      ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000", "$170,000", "$170,000"],
      ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000", "$90,000", "$90,000"],
      ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000", "$133,000", "$133,000"],
      ["Addison Navarro", "Business Management Analyst", "New York", 50, "$295,000", "$295,000", "$295,000"],
      ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000", "$200,000", "$200,000"],
      ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000", "$400,000", "$400,000"],
      ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000", "$110,000", "$110,000"],
      ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000", "$220,000", "$220,000"],
      ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000", "$180,000", "$180,000"],
      ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000", "$99,000", "$99,000"],
      ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000", "$90,000", "$90,000"],
      ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000", "$140,000", "$140,000"],
      ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000", "$330,000", "$330,000"],
      ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000", "$250,000", "$250,000"],
      ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000", "$190,000", "$190,000"],
      ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000", "$80,000", "$80,000"],
      ["Gabby Strickland", "Business Process Consultant", "Scottsdale", 26, "$45,000", "$45,000", "$45,000"],
      ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000", "$142,000", "$142,000"]
    ];
    let outerArray = [];
    let innerArray= [];
    this.state.data.forEach(res => {
      let jsObjs = res;
      innerArray = [];
      innerArray.push(jsObjs.groupName);
      innerArray.push(jsObjs.className);
      innerArray.push(jsObjs.classStatus);
      innerArray.push(jsObjs.classDescription);
      innerArray.push(jsObjs.classAutoMatching);
      outerArray.push(innerArray);
    });

    let outerArray2 = [];
    let innerArray2= [];
    this.state.classData.forEach(res => {
      let jsObjsa = res;
      innerArray2 = [];
      innerArray2.push(jsObjsa.groupName);
      innerArray2.push(jsObjsa.className);
      innerArray2.push(jsObjsa.classStatus);
      innerArray2.push(jsObjsa.classDescription);
      innerArray2.push(jsObjsa.classAutoMatching);
      outerArray2.push(innerArray2);
    });
    

    // const groupActions = this.state.groupList.map((grouplist)=>{
    //   return(
    //     <div>
    //      <option>{grouplist.accountName}</option>
    //     </div>
      
    //   )
      
    // })
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
    }; 
    const opt = this.state.groupList.map((cd) => {
      console.log(cd.groupName)
      return(
        <option>{cd.groupName}</option>
      )
     
    })
    console.log(this.state.groupname)
    return (
      <>
        <div className="mt-5 pt-1">
        <Helmet><title>ByteProof Classes</title></Helmet>
              <Card className="card-stats">
                <CardBody>
                  <Row >
                    <Col md="12">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-info pt-1 pl-2"><a href="/admin/dashboard">Direct Debit Dashboard</a> / <span>Direct Debit</span></p> 
                        <div className="d-flex justify-content-end">
                        <div className="card-stats">
                  <i className="pl-3 fa fa-sync-alt" /> Update now
                </div>
                        </div>
                      </div>
                    </Col>
                    <Col>
                     
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Row>
                <Col md="12">
                <MuiThemeProvider theme={this.getMuiTheme()}>
         <MUIDataTable
         title={"DIRECT DEBIT DASHBOARD"}
         data={data}
         columns={columnSearchAccount}
         options={options}
         />
          </MuiThemeProvider>
              </Col>
              </Row>

    </div>   
        
      </>
    );
  }
}
export default DirectDebitDashboard;