
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/paper-dashboard.min.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Byte from './views/login'
import './App.css'
import 'antd/dist/antd.css'; 
import AdminLayout from "./layouts/Admin.jsx";
import {Provider} from 'react-redux'
import store from './store'
const hist = createBrowserHistory();
class App extends React.Component{
    render(){
        return(
      <Provider store= {store}>
          <Router history={hist}>
       <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/login"  exact component = {Byte} />

      <Redirect to="/admin/dashboard" />
    </Switch>
  </Router>
        
      </Provider>
    
         

        )
    }
}

  
export default App


