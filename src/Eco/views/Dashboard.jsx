/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Pie, Radar } from "react-chartjs-2";
import Header from "../components/Navbars/DemoNavbar";
// reactstrap components
import {Redirect} from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardImg,
  Button,
  CardText,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "../variables/charts.jsx";

class Dashboard extends React.Component {

  mo = () => {
    alert('moo')

  }
  render() {
    if (!sessionStorage.getItem('token')){
     this.props.history.push('/login')
    }
    return (
      <div className=" mt-5 pt-1 ">
          
        <Card className="card-stats container-fluid">
                <CardBody>
                  <Row className="">
                    <Col md="12">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-info pt-1 pl-0"><a href="/admin/dashboard">Homepage </a>/ <span>EcoBank</span></p> 
                        <div className="d-flex justify-content-end">
                        <div className="stats">
                </div>
                       </div>
                      </div>
                    </Col>
                    <Col>
                     
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Row className="">
            <Col lg="12 ">
              <Card >
                <CardHeader>
                  <CardTitle tag="h5">Dashboard Information</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
               
              </Card>
            </Col>

            <Row className="ml-3">
            <Col lg="3" md="4" sm="3">
              <Card className="card-stats">
                <CardBody>
                  <Row style={{borderRadius: '0px'}}>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category text-justify">Total Number of Atms<br /> Done</p>
                        <CardTitle tag="p">150</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="4" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category text-justify">Total Number of Issues Raised </p>
                        <CardTitle tag="p">345</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                  <i className="fa fa-history" /> Updated Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="4" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category text-justify">Total Number of Issues Resolved By Vendor</p>
                        <CardTitle tag="p">23</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                  <i className="fa fa-history" /> Updated Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="4" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category text-justify">Pending Issues <br /> Done</p>
                        <CardTitle tag="p">23</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                  <i className="fa fa-history" /> Updated Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            
          </Row>
           
          </Row>
             
            <Row>
              <Col>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">RESOLUTION STATISTICS</CardTitle>
                <p className="font-weight-bold">Line Chart with Total Number of Issues Raised Vs No of Total Number of Issues of Unresolved</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Withdrawal{" "}
                  <i className="fa fa-circle text-warning" /> Deposits
                </div>
                
           
              </CardFooter>
            </Card>
                </Col>
              <Col md="12">
             <Card className="">

              <CardHeader>
                <CardTitle tag="h5">TRANSACTION ANALYSIS</CardTitle>
                <p className="font-weight-bold">Total Number of Issues Raised Versus No of Total Number of Pending Issues</p>
              </CardHeader>
              <CardBody>
                <Radar
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
               
              
              </CardFooter>
            </Card>
          </Col>
              </Row>
      </div>
    );
  }
}

export default Dashboard;
