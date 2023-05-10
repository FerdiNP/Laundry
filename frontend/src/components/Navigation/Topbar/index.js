import React, {Component} from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';
import axios from "axios"
import $ from "jquery"

class Topbar extends Component {
  constructor(){
        super()
        this.state = {
            token: "",
            userName: ""
            }
            if (localStorage.getItem("token")) {
                  this.state.token = localStorage.getItem("token")
              } else {
                  window.location = "/"
              }
          }
      headerConfig = () => {
          let header = {
              headers: { Authorization : `Bearer ${this.state.token}` }
          }
          return header
      }
      getUsers = () => {
          let user = JSON.parse(localStorage.getItem('user'))
          this.setState({userName: user.username})
      }
      componentDidMount = () => {
          this.getUsers()
      }
      Logout = () => {
           localStorage.removeItem("token")
           localStorage.removeItem("user")
           window.location = "/"
       }
    render() {
      const { clickMenuOpen } = this.props;

        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow p-3">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button onClick={() => { clickMenuOpen() }}  id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars"></i>
            </button>

            {/* <!-- Topbar Search --> */}

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

              {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}


              {/* <!-- Nav Item - Alerts --> */}


              <div className="topbar-divider d-none d-sm-block"></div>

              {/* <!-- Nav Item - User Information --> */}
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-dark font-weight-bold"> {this.state.userName}</span>
                  <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                </a>
                {/* <!-- Dropdown - User Information --> */}
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <a className="dropdown-item" href="#" data-toggle="modal" onClick={() => this.Logout()}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-500"></i>
                    Logout
                      </a>
                </div>
              </li>

            </ul>

          </nav>

        )
    }
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = store => ({
  toggled: store.menuState.menuOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
