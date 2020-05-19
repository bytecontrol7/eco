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
/*eslint-disable*/
import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
   Label, FormText } from 'reactstrap';
   import logo from '../assets/img/g5453.png';
   import {Redirect } from 'react-router-dom'
   import Footer from '../components/Footer/Footer'
   import axios from 'axios'
   import Logo from '../assets/img/ecoLogo.PNG'
class Byte extends React.Component {
  state = {
    load: false,
    status: false,
    email: '',
    password: '',
    token: false,
    catch:false
    
  };

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name] : value
    })

  }

  onClick = (e) => {
    e.preventDefault();
    this.setState({
      visible: true
    })
  }

  login = (e) =>{
    e.preventDefault();
    console.log('clicked')
    const login ={
      email: this.state.email,
      password: this.state.password
    };
    if( login.email && login.password){
      this.setState({
        load: true
      })
      axios.post(`http://54.194.183.10:5000/devicemaintenance-service/api/v1/auth/login`, login).
      then((res)=> {
      if(res.data.result.accessToken){
        sessionStorage.setItem('token',res.data.result.accessToken)
        this.setState({token:true})
        this.props.history.push('/admin/dashboard')
      } 
    }).
    catch((err) => {
      console.log(err)
      this.setState({
        catch: true, load:!this.state.load
      })
      setTimeout(()=>{
        this.setState({
          catch: false
        })
      },800)
    })

    }
    else{
      this.setState({
        status: true
      })
      setTimeout(()=>{
        this.setState({
          status: false
        })
      },1000)
    }
    
  }

 
 
  render() {
    if(sessionStorage.getItem('token')){
      return (
        <Redirect to = "admin/dashboard" />
      )
    }
    if(this.state.token){
      return(
        <Redirect to="admin/dashboard" />
      )
    }
    return (
      <>
        <div className="content login-bg">
          <br />
          <br />
          <br />
          <br />
          <br />
        
         
         
  <div className="mt-5  d-flex justify-content-center align-items-center">
  <div class="card" style={{width: "20rem"}}>
  <img src={Logo}  className="w-100" />
  <div class="card-body login-inner">
    {this.state.status && <p class="card-text text-danger text-center">Fields Cannot be Empty</p>}
    {this.state.catch && <p class="card-text text-danger text-center ">Invalid Login</p>}
    <Form className="col-md-12 pt-1">
      <FormGroup>
        <Label for="exampleEmail" className="text-left text-black font-weight-bold">Email</Label>
        {!this.state.status ? <Input type="email" name="email" id="exampleEmail"  onChange={this.onChange} /> : <Input type="email" className="error"  name="email" id="exampleEmail"  onChange={this.onChange} /> }
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword" className="text-left text-black font-weight-bold">Password</Label>
    {!this.state.status ? <Input type="password" name="password" id="examplePassword"  onChange={this.onChange} /> : <Input type="password" name="password" id="examplePassword" className="error" onChange={this.onChange} /> }
      </FormGroup>
    
      {this.state.load ? 
      <button className ="btn btn-default btn-block" type="button">
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
     Logging In...
    </button> :
      <Button onClick={this.onClick} onClick={this.login} color="info" className="btn btn-block dash" style={{backgroundColor:'#003152'}}>Login</Button>
      
      }
      
    </Form>
  </div>
</div>
      
                  </div>
                 
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                
              
         
        </div>
      </>
    );
  }
}

export default Byte;
