import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';

class SidebarKasir extends Component {
  // componentDidMount() {
  //   document.getElementById('body').className = 'page-top';
  // }
  // state = {
  //   sidebarToggled: false,
  // }

  // handleSideBarToggle() {
  //   if (this.sidebarToogled === true) {
  //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
  //     document.getElementById('body').className = 'page-top sidebar-toggled';
  //   } else {
  //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
  //     document.getElementById('body').className = 'page-top';
  //   }

  // }
  Logout = () => {
       localStorage.removeItem("token")
       localStorage.removeItem("user")
       window.location = "/"
   }

  render() {
    const { clickMenuOpen, toggled } = this.props;
    return (
      <ul className={toggled ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled' : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'} id="accordionSidebar">

        {/* <!-- Sidebar - Brand --> */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-circle-notch"></i>
          </div>
          <div className="sidebar-brand-text mx-3"> Laundry </div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item">
          <Link className="nav-link" to="/kasir/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">
          Main Feature
        </div>

        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        <li className="nav-item">
          <Link className="nav-link" to="/kasir/member">
            <i className="fas fa-users"></i>
            <span> Registrasi Member</span></Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/kasir/transaksi">
            <i className="fas fa-receipt"></i>
            <span> Transaksi</span></Link>
        </li>

        <hr className="sidebar-divider" />
        {/* <!-- Nav Item - Tables --> */}
        <div className="sidebar-heading">
          Logout
        </div>

        <li className="nav-item">
          <a className="nav-link" onClick={() => this.Logout()}>
            <i className="fas fa-sign-out-alt"></i>
            <span> Logout</span></a>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div className="text-center d-none d-md-inline">
          <button onClick={() => { clickMenuOpen() }} className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

      </ul>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = store => ({
  toggled: store.menuState.menuOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarKasir);
