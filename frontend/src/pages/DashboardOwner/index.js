import React, { Component } from 'react';

//Navigation
import CardInfo from '../../components/Cards/Info';
import PageHeading from '../../components/PageHeading';
import SidebarOwner from '../../components/Navigation/SidebarOwner';
import Topbar from '../../components/Navigation/Topbar';
import '../../assets/css/main.css';
import axios from "axios"
import $ from "jquery"
import { base_url } from "../../Config"

class DashboardOwner extends Component {
  constructor(){
        super()
        this.state = {
            token: "",
            userName: "",
            countMember: "",
            countTransaksi: "",
            countPaket: "",
            countOutlet: "",
            role: JSON.parse(localStorage.getItem("user"))
        }
        if ((localStorage.getItem("token")) || (localStorage.getItem("user"))) {
              this.state.token = localStorage.getItem("token")
              this.state.role = JSON.parse(localStorage.getItem("user"))
              var roles = this.state.role.role
          } else {
              window.location = "/"
          }
        if (roles != "Owner") {
          window.alert("Anda Bukan Owner");
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          window.location = "/owner"
        }
      }
      headerConfig = () => {
          let header = {
              headers: { Authorization : `Bearer ${this.state.token}` }
          }
          return header
      }
      getMember = () => {
          let url = "http://localhost:8080/member"
          axios.get(url, this.headerConfig())
          .then(response => {
            this.setState({countMember: response.data.data.length});
          })
          .catch(error => {
              if (error.res) {
                  if (error.res.status) {
                      window.alert(error.res.data.message)
                      this.props.history.push("/")
                  }
              } else {
                  console.log(error);
              }
          })
      }
    getTransaksi = () => {
        let url = "http://localhost:8080/transaksi"
        axios.get(url, this.headerConfig())
        .then(response => {
          this.setState({countTransaksi: response.data.data.length});
        })
        .catch(error => {
            if (error.res) {
                if (error.res.status) {
                    window.alert(error.res.data.message)
                    this.props.history.push("/")
                }
            } else {
                console.log(error);
            }
        })
    }
    getPaket = () => {
        let url = "http://localhost:8080/paket"
        axios.get(url, this.headerConfig())
        .then(response => {
          this.setState({countPaket: response.data.data.length});
        })
        .catch(error => {
            if (error.res) {
                if (error.res.status) {
                    window.alert(error.res.data.message)
                    this.props.history.push("/")
                }
            } else {
                console.log(error);
            }
        })
    }
    getOutlet = () => {
        let url = "http://localhost:8080/outlet"
        axios.get(url, this.headerConfig())
        .then(response => {
          this.setState({countOutlet: response.data.data.length});
        })
        .catch(error => {
            if (error.res) {
                if (error.res.status) {
                    window.alert(error.res.data.message)
                    this.props.history.push("/")
                }
            } else {
                console.log(error);
            }
        })
    }

    getUsers = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({userName: user.username})
    }

    componentDidMount = () => {
        this.getMember()
        this.getTransaksi()
        this.getOutlet()
        this.getPaket()
        this.getUsers()
    }
  render() {
    return (

      <div>
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">

          {/* <!-- Sidebar --> */}
          <SidebarOwner />
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/* <!-- Main Content --> */}
            <div id="content">

              {/* <!-- Topbar --> */}
              <Topbar />
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">

                {/* <!-- Page Heading --> */}

                <PageHeading title="Home" />

                  <h3 className="my-2">
                                  <strong>Welcome Back, {this.state.userName}</strong>
                              </h3>

                {/* <!-- Content Row --> */}
                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                          <div className="card-body">
                              <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Paket</div>
                                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.countPaket}</div>
                                  </div>
                                  <div className="col-auto">
                                      <i className="fas fa-box fa-2x text-primary"></i>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Outlet</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.countOutlet}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-map-marker-alt fa-2x text-success"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>

                      <div className="col-xl-3 col-md-6 mb-4">
                          <div className="card border-left-danger shadow h-100 py-2">
                              <div className="card-body">
                                  <div className="row no-gutters align-items-center">
                                      <div className="col mr-2">
                                          <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Member</div>
                                          <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.countMember}</div>
                                      </div>
                                      <div className="col-auto">
                                          <i className="fas fa-users fa-2x text-danger"></i>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Transaksi</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.countTransaksi}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-receipt fa-2x text-warning"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

              </div>
              {/* <!-- /.container-fluid --> */}

            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2019</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}

          </div>
          {/* <!-- End of Content Wrapper --> */}

        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a></div>
    )
  }
}

export default DashboardOwner;
