import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button } from 'reactstrap';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";

import axios from "axios"

class Test extends React.Component{
  state = {
    bulkData: [],
    csv: ''
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
          bulkData: res.data.result
        })
    }).
    catch((err)=> {
      console.log(err)
    })
  }

  fileChange = (event) => {
    this.setState({
      csv: event.target.files[0]
    })
  }
  render(){
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
    return (
      <>
      <br />
      <br />
      <br />
      <br />
      <div className="col-md-12">
        <input type="file" name="csv" onChange={this.fileChange} />
        <Button onClick={this.fileUpload} color="info">submit</Button>
      </div>
      <div>
      <MuiThemeProvider theme={this.getMuiTheme()}>
         <MUIDataTable
         title={"RESULT"}
         data={outerArray3}
         columns={Issue}
         options={options}
         />
          </MuiThemeProvider>
      </div>
   
    </>
  );
  }
}

export default Test;