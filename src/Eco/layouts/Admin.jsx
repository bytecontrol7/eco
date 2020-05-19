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
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import DemoNavbar from "../components/Navbars/DemoNavbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import routes from "../routes.js";

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "green",
      activeColor: "info",
      open: false,
      pcBar: false
    };
    this.mainPanel = React.createRef();
    this.toggle = this.toggle.bind.this;
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }

  toggle = e => {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  slide = () => {
    // let { pcBar } = this.state;
    // var all = document.getElementsByClassName("main-panel");
    // var all1 = document.getElementsByClassName("sidebar");
    // var dash = document.getElementsByClassName("vert");
    // this.setState({ pcBar: !pcBar }, () => {
    //   if (pcBar) {
    //     for (var i = 0; i < all.length; i++) {
    //       all[i].style.width = "100%";
    //     }
    //     for (var i = 0; i < all1.length; i++) {
    //       all1[i].style.display = "none";
    //     }
    //     for (var i = 0; i < dash.length; i++) {
    //       dash[i].style.marginLeft = "0px";
    //     }
    //   } else {
    //     for (var i = 0; i < all.length; i++) {
    //       all[i].style.width = `calc(100% - 260px)`;
    //     }
    //     for (var i = 0; i < all1.length; i++) {
    //       all1[i].style.display = "block";
    //     }
    //   }
    // });
  };

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;
