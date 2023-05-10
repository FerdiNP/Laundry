import React, { Component } from 'react';

import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import '../../assets/css/main.css';
import axios from "axios"
import $ from "jquery"

class User extends Component {

  constructor() {
      super()
      this.state = {
          token: "",
          id_user: "",
          username: "",
          email: "",
          password: "",
          role: "",
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
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/"
      }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization : `Bearer ${this.state.token}` }
        }
        return header
  }
  getUser = async () => {
      let url = "http://localhost:8080/user/"
      await axios.get(url, this.headerConfig())
      .then(response => {
          this.setState({user: response.data.data})
          console.log(response)
      })
      .catch(error => {
              console.log(error);
      })
      console.log(this.state.user)
  }
  componentDidMount = () => {
      this.getUser()
  }
  handleAdd = () =>{
      this.setState({
          id_user: "",
          username: "",
          email: "",
          password: "",
          role: "",
          action: "insert",
          isModalOpen: true
      })
  }
  handleEdit = (item) =>{
      this.setState({
          id_user: item.id_user,
          username: item.username,
          email: item.email,
          password: "",
          role: item.role,
          action: "update",
          isModalOpen: true
      })
  }
  handleSave = (event) =>{
      event.preventDefault();
      $("#modal_user").modal("hide")
      let url = "http://localhost:8080/user/"
      let form = {
        id_user: this.state.id_user,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role
      }

      if(this.state.action === "insert"){
          axios.post(url, form,this.headerConfig())
          .then(response => {
              this.getUser()
              console.log(response)
          })
          .catch(error => {
              console.log(error);
          })
      }else if(this.state.action === "update"){
          axios.put(url, form,this.headerConfig())
          .then(response => {
              this.getUser()
              console.log(response)
          })
          .catch(error => {
              console.error();
          })
      }
  }
  handleDelete = (id_user) => {
      let url = "http://localhost:8080/user/" + id_user
      if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        axios.delete(url,this.headerConfig())
        .then(response => {
          this.getUser();
          window.alert(response.data.message)
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        })
      }
  }
  handleClose = () => {
      this.setState({
          isModalOpen: false
      })
  }

    render() {
        return (
            <div>
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper" >

                    {/* <!-- Sidebar --> */}
                    <Sidebar />
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
                              <div>
                                <PageHeading title="Members" />
                                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_user" onClick={() => this.handleAdd()}>
                                        <i class="fas fa-plus"> Add User</i>
                                  </button>
                                  <hr />
                                            <div class="container-fluid tab">
                                              <ul className="list-group mx-3">
                                              {this.state.user.map((user, index) => (
                                                  <li className="list-group-item">
                                                      <div className="row">
                                                         <div className="col-lg-2">
                                                           <small className="text-secondary">No.</small>
                                                           <h6>{index+1}.</h6>
                                                         </div>
                                                          <div className="col-lg-3">
                                                              <small className="text-secondary">Username :</small> <br />
                                                              <h6>{user.username}</h6>
                                                          </div>
                                                          <div className="col-lg-3">
                                                              <small className="text-secondary">Email :</small> <br />
                                                              <h6>{user.email}</h6>
                                                          </div>
                                                          <div className="col-lg-2">
                                                              <small className="text-secondary">Role :</small> <br />
                                                              <h6>{user.role}</h6>
                                                          </div>
                                                          <div className="col-lg-2">
                                                              <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal_user" onClick={() => this.handleEdit(user)}>
                                                                <i class="fas fa-edit">  </i>
                                                              </button>
                                                              <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(user.id_user)}>
                                                                <i class="fas fa-trash-alt">  </i>
                                                              </button>
                                                          </div>
                                                      </div>
                                                  </li>
                                                  ))}
                                              </ul>
                                            </div>

                                              <div class="modal fade" id="modal_user" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" show={this.state.isModalOpen} onHide={this.handleClose}>
                                                <div class="modal-dialog" role="document">
                                                  <div class="modal-content">
                                                    <div class="modal-header">
                                                      <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
                                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                      </button>
                                                    </div>
                                                    <div className="modal-body">
                                                      <form onSubmit={this.handleSave}>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Username :</label>
                                                        <input type="text" class="form-control" id="recipient-name" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} />
                                                      </div>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Email :</label>
                                                        <input type="email" class="form-control" id="recipient-name" value={this.state.email} onChange={ev => this.setState({email: ev.target.value})} />
                                                      </div>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Password :</label>
                                                        <input type="password" class="form-control" id="recipient-name" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})} />
                                                      </div>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Role :</label>
                                                          <select required class="form-control" value={this.state.role} onChange={ev => this.setState({role: ev.target.value})}>
                                                              <option value="" disabled selected hidden> -- Please Select --</option>
                                                              <option value="Admin"> Admin </option>
                                                              <option value="Kasir"> Kasir </option>
                                                              <option value="Owner"> Owner </option>
                                                          </select>
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

export default User;
