import React, {Component} from 'react';

import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import '../../assets/css/main.css';
import axios from "axios"
import $ from "jquery"

class Outlet extends Component {
  constructor() {
    super()
    this.state = {
      token: "",
      id_outlet: "",
      tempat: "",
      alamat: "",
      id_user:"",
      outlet: [],
      user: [],
      action: "",
      isModalOpen: false
    }
    if ((localStorage.getItem("token")) || (localStorage.getItem("user"))) {
          this.state.token = localStorage.getItem("token")
          this.state.role = JSON.parse(localStorage.getItem("user"))
          var roles = this.state.role.role
      } else {
          window.location = "/"
      }
    if (roles != "Admin") {
      window.alert("Anda Bukan Admin")
      window.location = "/"
    }
  }
  headerConfig = () => {
      let header = {
          headers: { Authorization : `Bearer ${this.state.token}` }
      }
      return header
  }

  displayOwner = (role, id) => {
      if (role === "Owner") {
          return (
              <option> {this.state.id_user} </option>
          )
      } else if (role === "Admin"){
        return (
            <option hidden> Admin </option>
            )
      }
  }

  getOutlet = async () => {
      let url = "http://localhost:8080/outlet/"
      await axios.get(url, this.headerConfig())
      .then(response => {
          this.setState({outlet: response.data.data})
      })
      .catch(error => {
              console.log(error);
      })
      console.log(this.state.outlet)
  }

  getUser = async () => {
      let url = "http://localhost:8080/user/"
      await axios.get(url, this.headerConfig())
      .then(response => {
          this.setState({user: response.data.data})
      })
      .catch(error => {
              console.log(error);
      })
      console.log(this.state.user)
  }

  componentDidMount = () => {
    this.getUser()
    this.getOutlet()
  }
  handleAdd = () => {
    this.setState({
      id_outlet: 0,
      tempat: "",
      alamat: "",
      id_user: 5,
      action: "insert",
      isModalOpen: true
    })
  }
  handleEdit = (item) => {
    this.setState({
      id_outlet: item.id_outlet,
      tempat: item.tempat,
      alamat: item.alamat,
      id_user: item.id_user,
      action: "update",
      isModalOpen: true
    })
  }
  handleSave = (event) => {
    event.preventDefault();
    $("#modal_outlet").modal("hide")
    let url = "http://localhost:8080/outlet/"
    let form = {
      id_outlet: this.state.id_outlet,
      tempat: this.state.tempat,
      alamat: this.state.alamat,
      id_user: this.state.id_user
    }

    if (this.state.action === "insert") {
      axios.post(url, form,this.headerConfig())
      .then(response => {
        this.getOutlet()
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      })
    } else if (this.state.action === "update") {
      axios.put(url, form,this.headerConfig())
      .then(response => {
        this.getOutlet()
        console.log(response)
      })
      .catch(error => {
        console.error();
      })
    }
  }
  handleDelete = (id_outlet) => {
    let url = "http://localhost:8080/outlet/" + id_outlet
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios.delete(url,this.headerConfig())
      .then(response => {
        this.getOutlet();
        window.alert(response.data.message)
        console.log(response);
      })
      .catch(error =>
        console.log(error))
    }
  }
  handleClose = () => {
    this.setState({
      isModalOpen: false
    })
  }


  render() {
    return (<div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">

        {/* <!-- Sidebar --> */}
        <Sidebar/> {/* <!-- End of Sidebar --> */}

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">

          {/* <!-- Main Content --> */}
          <div id="content">

            {/* <!-- Topbar --> */}
            <Topbar/> {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid tab">
              <div>
                <PageHeading title="Outlet"/>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_outlet" onClick={() => this.handleAdd()}>
                    <i class="fas fa-plus"> Add Outlet </i>
                </button>
                <hr/>
                <div class="container-fluid">
                  <ul className="list-group mx-3">
                    {this.state.outlet.map((outlet, index)=> (
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-lg-1">
                            <small className="text-secondary">No.</small>
                            <h6>{index+1}.</h6>
                          </div>
                          <div className="col-lg-3">
                            <small className="text-secondary">Nama Tempat :</small>
                            <h6>{outlet.tempat}</h6>
                          </div>
                          <div className="col-lg-3">
                            <small className="text-secondary">Alamat :</small>
                            <h6>{outlet.alamat}</h6>
                          </div>
                          <div className="col-lg-3">
                            <small className="text-secondary">Owner :</small>
                                <h6>{outlet.user.username}</h6>
                          </div>

                          <div className="col-lg-2">
                            <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal_outlet" onClick={() => this.handleEdit(outlet)}>
                              <i class="fas fa-edit">  </i>
                            </button>
                            <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(outlet.id_outlet)}>
                              <i class="fas fa-trash-alt">  </i>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div class="modal fade" id="modal_outlet" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" show={this.state.isModalOpen} onHide={this.handleClose}>
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Outlet</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={this.handleSave}>
                          <div class="form-group">
                            <label class="col-form-label">Nama Tempat :</label>
                            <input type="text" class="form-control" id="recipient-name" value={this.state.tempat} onChange={ev => this.setState({tempat: ev.target.value})}/>
                          </div>

                          <div class="form-group">
                            <label class="col-form-label">Alamat :</label>
                            <input type="text" class="form-control" id="recipient-name" value={this.state.alamat} onChange={ev => this.setState({alamat: ev.target.value})}/>
                          </div>

                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; 2022</span>
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

export default Outlet;
