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
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

import routes from "../../routes.js";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent",
      pcBar: true,
      pcBar2: true,
      faCondi: false
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.sidebarToggle = React.createRef();
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "dark"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  getBrand() {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  }
  openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  };



  fullScreen = () => {
    // document.documentElement.classList.toggle("main-panel");
    // this.sidebarToggle.current.classList.toggle("toggled");
    let { pcBar } = this.state;
    var all = document.getElementsByClassName("main-panel");
    var all1 = document.getElementsByClassName("sidebar");
    var dash = document.getElementsByClassName("vert");
    this.setState({ pcBar: !pcBar }, () => {
      if (pcBar) {
       
        for (var i = 0; i < all.length; i++) {
       
          all[i].style.width = `100%`;
        }
        for (var i = 0; i < all1.length; i++) {
        
          all1[i].style.width = `0px`;
        }
        for (var i = 0; i < dash.length; i++) {
          
          dash[i].style.marginLeft = "0px";;
        
        }
       
       
      } 
      
    });
  };

  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }

  login = e => {
    e.preventDefault();
    sessionStorage.setItem('token', '')
    this.props.history.push("/");
  };
  render() {
    return (
      <Navbar
        color="light"
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute "
            : "navbar-absolute " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid className="fixed-top dash py-1 pt-1">
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand className="vert text-white">
              {this.state.pcBar2 && <i className="fa fa-desktop  pl-0 pr-2" data-toggle="tooltip" data-placement="top" title="Double click for full screen" onMouseOver={this.hov} onClick={this.fullScreen}></i> }
              {this.getBrand()} {" "}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <Nav navbar>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-circle-10 text-white" />
                  <p className="text-white">EcoBank</p>
                  <p>
                    <span className="d-lg-none d-md-block text-white">
                      Some Actions
                    </span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a">Tomiwa</DropdownItem>
                  <DropdownItem tag="a">settings</DropdownItem>
                  <DropdownItem tag="a" onClick={this.login}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
