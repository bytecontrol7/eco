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
import Dashboard from "./views/Dashboard.jsx";
// import Notifications from './views/notify'
// import Icons from "./views/Icons.jsx";
import TerminalManagement from './views/TerminalMgt/terminalmgt.jsx'
import IssueManagement from './views/IssueMgt/issuemgt'
import Vendor from './views/Vendor/vendor'
import Issue from './views/Issue/issue'
import Test from './views/test'


var routes = [
  {
    path: "/dashboard",
    name: "Homepage",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },

  {
    path: "/terminal_management",
    name: "Terminal Management",
    icon: "nc-icon nc-bank",
    component: TerminalManagement,
    layout: "/admin"
  },

  {
    path: "/incident_management",
    name: "Incident Management",
    icon: "nc-icon nc-bank",
    component: IssueManagement,
    layout: "/admin"
  },

  {
    path: "/vendor",
    name: "Vendor Mangement",
    icon: "nc-icon nc-bank",
    component: Vendor,
    layout: "/admin"
  },

  {
    path: "/issues",
    name: "Issues Management",
    icon: "nc-icon nc-bank",
    component: Issue,
    layout: "/admin"
  },

  {
    path: "/test",
    name: "Issues Management",
    icon: "nc-icon nc-bank",
    component: Test,
    layout: "/admin"
  },



  // {
  //   path: "/GL_management",
  //   name: "EJ Bulk Transaction Search",
  //   icon: "nc-icon nc-bank",
  //   component: GLM,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },

  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/gl_proofing",
  //   name: "Proof Dashboard",
  //   icon: "nc-icon nc-tile-56",
  //   component: GLRDash,
  //   layout: "/admin"
  // },
 
  //  {
  //   path: "/glr_class",
  //   name: "ByteProof",
  //   icon: "nc-icon nc-tile-56",
  //   component: GLRClass,
  //   layout: "/admin"
  // },
  // {
  //   path: "/glr_account",
  //   name: "ByteProof ",
  //   icon: "nc-icon nc-tile-56",
  //   component: GLRAccounts,
  //   layout: "/admin"
  // },
  // {
  //   path: "/glr_component",
  //   name: "ByteProof ",
  //   icon: "nc-icon nc-tile-56",
  //   component: GLRComponents,
  //   layout: "/admin"
  // },
  // {
  //   path: "/glr_items",
  //   name: "ByteProof",
  //   icon: "nc-icon nc-tile-56",
  //   component: GLRItems,
  //   layout: "/admin"
  // },
  // {
  //   path: "/glr_matching",
  //   name: "ByteProo",
  //   icon: "nc-icon nc-tile-56",
  //   component: GLRMatching,
  //   layout: "/admin"
  // },
  // {
  //   path: "/glr_proof",
  //   name: "ByteProof",
  //   icon: "nc-icon nc-tile-56",
  //   component: GLRProof,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },
  
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
  
];
export default routes;
