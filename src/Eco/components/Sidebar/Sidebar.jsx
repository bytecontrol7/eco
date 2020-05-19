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
import { NavLink } from "react-router-dom";
import { Nav, Collapse, Button, CardBody, Card } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import logo from "../../assets/img/eco.jpg";
import logo2 from "../../assets/img/eco.jpg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpen2: false,
      collapse: false,
      pcBar: true,
      color:false,
      hovColor: false,
      hovColor2: false,
      hovColor3: false,
      hovColor4: false,
      hovColor5: false
    };
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
    this.toggle.bind(this);
    this.toggle2.bind(this);
  }

  hover = (e) => {
    e.preventDefault();
    this.setState({
      hovColor: true
    })

  }
  hover2 = (e) => {
    e.preventDefault();
    this.setState({
      hovColor2: true
    })

  }
  hover3 = (e) => {
    e.preventDefault();
    this.setState({
      hovColor3: true
    })

  }
  hover4 = (e) => {
    e.preventDefault();
    this.setState({
      hovColor4: true
    })

  }
  hover5 = (e) => {
    e.preventDefault();
    this.setState({
      hovColor5: true
    })

  }

  toggle = e => {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  out  = () => {
    this.setState({
      hovColor: false
    })
  }
  out2  = () => {
    this.setState({
      hovColor2: false
    })
  }
  out3  = () => {
    this.setState({
      hovColor3: false
    })
  }
  out4  = () => {
    this.setState({
      hovColor4: false
    })
  }

  out5  = () => {
    this.setState({
      hovColor5: false
    })
  }
  
  toggle3 = e => {
    e.preventDefault();
    this.setState({
      isOpen2: !this.state.isOpen2
    });
  };

  slide = () => {
    // document.documentElement.classList.toggle("main-panel");
    // this.sidebarToggle.current.classList.toggle("toggled");
    let { pcBar } = this.state;
    var all = document.getElementsByClassName("main-panel");
    var all1 = document.getElementsByClassName("sidebar");
    var dash = document.getElementsByClassName("vert");
    this.setState({ pcBar: !pcBar }, () => {
      if (!pcBar) {
        for (var i = 0; i < all.length; i++) {
          all[i].style.width = `calc(100% - 45px)`;
        }
        for (var i = 0; i < all1.length; i++) {
          all1[i].style.width = `45px`;
          this.setState({
            color: true
          })
        }
        for (var i = 0; i < dash.length; i++) {
          dash[i].style.marginLeft = "40px";
          
        }
      } else {
        for (var i = 0; i < all.length; i++) {
          all[i].style.width = `calc(100% - 256px)`;
          all[i].style.position = `relative`;
        }
        for (var i = 0; i < all1.length; i++) {
          all1[i].style.width = "256px";
        
          this.setState({
            color: false
          })
        }
        for (var i = 0; i < dash.length; i++) {
          dash[i].style.marginLeft = "249px";
     
        }
      }
    });
  };

  toggle2 = e => {
    e.preventDefault();
    this.setState({
      isOpen2: !this.state.isOpen2
    });
  };

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    this.setState({
      color: true
    })
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
   
  }
  render() {
    return (
      <>
     
      <div
        className="sidebar bg body"
        data-color={this.props.bgColor}
        data-active-color="{this.props.activeColor}"
        onMouseLeave={this.slide}
        onMouseEnter={this.slide}
        
      >
      
       {this.state.color ? 
        <div className="logo mb-1 mt-0" >
           <a
            href="/admin/dashboard"
            className="simple-text logo-mini"
          >
            <div >
              <img src={logo} alt="react-logo" className="py-2" />
            </div>
          </a>
        </div> 
        :
        <div className="simple-text py-2 image-underbg " >
        <a
         href="/admin/dashboard"
         className="simple-text logo-mini"
       >
         <div >
           <img src={logo2} alt="react-logo" className="w-99 pt-2" style={(this.state.color)?{maxHeight:'100px'}:{maxHeight:'50px', marginLeft: '90px' }}/>
         </div>
       </a>
     </div>
       }
       
     
      
        <div className="sidebar-wrapper" ref={this.sidebar} >
          <Nav className="pl-0 mt-4" >
            <li className="pl-0" >
              <NavLink
                to="/admin/dashboard"
                className="nav-link ml-0 "
                activeClassName="choosen"
                onMouseOver={this.hover}
                onMouseLeave={this.out}
              >
                {this.state.hovColor ?  
                <i className="text-white fa fa-home pr-3 pb-0 fcmbtext" >
                  <span className="pl-3 text-white font-weight-bold fcmbtext">DASHBOARD</span>
                </i> :
                 <i className="text-white fa fa-home pr-3 pb-0" >
                 <span className="pl-3 text-white font-weight-bold">DASHBOARD</span>
               </i> 

  }
             
              </NavLink>
             
            </li>
            <br />
            <li className="pl-0">
              <NavLink
                to="/admin/terminal_management"
                className="nav-link ml-0  text-white"
                activeClassName="choosen"
              
                onMouseOver={this.hover2}
                onMouseLeave ={this.out2}
              >
                {this.state.hovColor2 ?    
                 <i className="text-white fa fa-list-alt fcmbtext">
                  <span  className="pl-3 font-weight-bold fcmbtext">TERMINAL MANAGEMENT
                  </span> 
                </i>:
                                 <i className="text-white fa fa-list-alt ">
                                 <span className="pl-3 text-white font-weight-bold">TERMINAL MANAGEMENT
                                  </span>
                               </i>
  }
               
  
                
              </NavLink>
        
            </li>
            <br />
            <li className="pt-0">
              <NavLink
                to="/admin/incident_management"
                className="nav-link ml-0  text-dark"
                activeClassName="choosen"
                onMouseOver={this.hover3}
                onMouseLeave ={this.out3}
               
              >
                {this.state.hovColor3 ?
                <i className="text-white fa fa-exchange fcmbtext">
                  <span className="pl-3 text-white font-weight-bold fcmbtext">INCIDENT MANAGEMENT{" "}
                   </span>
                </i>:
                  <i className="text-white fa fa-exchange">
                  <span className="pl-3 text-white font-weight-bold">INCIDENT MANAGEMENT{" "}
                  </span>
                </i>
  }

                
              </NavLink>
              
              
            </li>
            <br />
            <li className="pt-0">
              <NavLink
                to="/login"
                className="nav-link ml-0  text-white"
                activeClassName="choosen"
                onMouseOver={this.hover4}
                onMouseLeave ={this.out4}
                onClick={this.toggle}
              >
              {this.state.hovColor4 ? 
                <i className="text-white fa fa-rebel fcmbtext">
                  <span className="text-white pl-3 font-weight-bold fcmbtext ">UTILITIES</span>
                </i>
                :
                <i className="text-white fa fa-rebel" onClick={this.toggle}>
                  <span className="text-white pl-3 font-weight-bold">UTILITIES</span>
                </i>
  }

                

            
              </NavLink>
              <Collapse
                isOpen={this.state.isOpen}
                className="text-white ml-2 mt-0"
              >
                <div className="accord pt-0 text-white">
                  <NavLink
                    to="/admin/vendor"
                    activeClassName="choosen"
                    className="text-white nav-link pl-5"
                  >
                    Vendors
                  </NavLink>
                  <NavLink
                    to="/admin/issues"
                    activeClassName="choosen"
                    className="text-white nav-link pl-5"
                  >
                    Issues
                  </NavLink>
                </div>
              </Collapse>
            </li>
            <br />
            <li className="pt-0">
              <NavLink
                to="/login"
                className="nav-link ml-0  text-white"
                activeClassName="choosen"
                onMouseOver={this.hover5}
                onMouseLeave ={this.out5}
              >
              {this.state.hovColor5 ?
                <i className="text-white fa fa-sign-out fcmbtext">
                  <span className="text-white pl-3 font-weight-bold fcmbtext">LOG OUT</span>
                </i>:
                <i className="text-white fa fa-sign-out ">
                <span className="text-white pl-3 font-weight-bold">LOG OUT</span>
              </i>
  }

                

            
              </NavLink>
            </li>
          </Nav>
        </div>
      </div>
      </>
    );
  }
}

export default Sidebar;
