import React, { Component } from 'react';

import SidebarKasir from '../../components/Navigation/SidebarKasir';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import '../../assets/css/main.css';
import axios from "axios"
import $ from "jquery"

class MemberKasir extends Component {
  constructor() {
      super()
      this.state = {
          role: "",
          token: "",
          id_member: "",
          nama: "",
          alamat: "",
          jenis_kelamin: "",
          tlp: "",
          member: [],
          action: "",
          role: JSON.parse(localStorage.getItem("user")),
          isModalOpen: false
      }
      if ((localStorage.getItem("token")) || (localStorage.getItem("user"))) {
            this.state.token = localStorage.getItem("token")
            this.state.role = JSON.parse(localStorage.getItem("user"))
            var roles = this.state.role.role
        } else {
            window.location = "/"
        }
      if (roles != "Kasir") {
        window.alert("Anda Bukan Kasir");
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/kasir"
      }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization : `Bearer ${this.state.token}` }
        }
        return header
  }

  displayJenis = (jenis_kelamin, id) => {
      if (jenis_kelamin === "L") {
          return (
              <div className="badge badge-primary">Laki Laki</div>
          )
      } else if (jenis_kelamin === "P") {
          return (
              <div className="badge badge-dark">Perempuan</div>
          )
      }
  }
  getMember = async () => {
      let url = "http://localhost:8080/member/"
      await axios.get(url, this.headerConfig())
      .then(response => {
          this.setState({member: response.data.data})
      })
      .catch(error => {
              console.log(error);
      })
      console.log(this.state.member)
  }
  componentDidMount = () => {
      this.getMember()
  }
  handleAdd = () =>{
      this.setState({
          id_member: 0,
          nama: "",
          alamat: "",
          jenis_kelamin: "",
          tlp: "",
          action: "insert",
          isModalOpen: true
      })
  }
  handleEdit = (item) =>{
      this.setState({
          id_member: item.id_member,
          nama: item.nama,
          alamat: item.alamat,
          jenis_kelamin: item.jenis_kelamin,
          tlp: item.tlp,
          action: "update",
          isModalOpen: true
      })
  }
  handleSave = (event) =>{
      event.preventDefault();
      $("#modal_member").modal("hide")
      let url = "http://localhost:8080/member/"
      let form = {
          id_member: this.state.id_member,
          nama: this.state.nama,
          alamat: this.state.alamat,
          jenis_kelamin: this.state.jenis_kelamin,
          tlp: this.state.tlp
      }

      if(this.state.action === "insert"){
          axios.post(url, form, this.headerConfig())
          .then(response => {
              this.getMember()
              console.log(response)
          })
          .catch(error => {
              console.log(error);
          })
      }else if(this.state.action === "update"){
          axios.put(url, form,this.headerConfig())
          .then(response => {
              this.getMember()
              console.log(response)
          })
          .catch(error => {
              console.error();
          })
      }
  }
  handleDelete = (id_member) => {
      let url = "http://localhost:8080/member/" + id_member
      if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        axios.delete(url,this.headerConfig())
        .then(response => {
          this.getMember();
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

                    {/* <!-- SidebarKasir --> */}
                    <SidebarKasir />
                    {/* <!-- End of SidebarKasir --> */}

                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">

                        {/* <!-- Main Content --> */}
                        <div id="content">

                            {/* <!-- Topbar --> */}
                            <Topbar />
                            {/* <!-- End of Topbar --> */}

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid tab">
                              <div>
                                <PageHeading title="Member" />
                                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_member" onClick={() => this.handleAdd()}>
                                        <i class="fas fa-plus"> Add Member </i>
                                  </button>
                                  <hr />
                                            <div class="container-fluid tab">
                                              <ul className="list-group mx-3">
                                              {this.state.member.map((member, index) => (
                                                  <li className="list-group-item">
                                                      <div className="row">
                                                         <div className="col-lg-2">
                                                           <small className="text-secondary">No.</small>
                                                           <h6>{index+1}.</h6>
                                                         </div>
                                                          <div className="col-lg-2">
                                                              <small className="text-secondary">Nama :</small>
                                                              <h6>{member.nama}</h6>
                                                          </div>
                                                          <div className="col-lg-2">
                                                              <small className="text-secondary">Alamat :</small> <br />
                                                              <h6>{member.alamat}</h6>
                                                          </div>
                                                          <div className="col-lg-2">
                                                              <small className="text-secondary">Jenis Kelamin :</small> <br />
                                                              <h6>{this.displayJenis(member.jenis_kelamin)}</h6>
                                                          </div>
                                                          <div className="col-lg-2">
                                                              <small className="text-secondary">Telepon :</small> <br />
                                                              <h6>+62 {member.tlp}</h6>
                                                          </div>
                                                          <div className="col-lg-2">
                                                              <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal_member" onClick={() => this.handleEdit(member)}>
                                                                <i class="fas fa-edit">  </i>
                                                              </button>
                                                              <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(member.id_member)}>
                                                                <i class="fas fa-trash-alt">  </i>
                                                              </button>
                                                          </div>
                                                      </div>
                                                  </li>
                                                  ))}
                                              </ul>
                                            </div>

                                              <div class="modal fade" id="modal_member" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" show={this.state.isModalOpen} onHide={this.handleClose}>
                                                <div class="modal-dialog" role="document">
                                                  <div class="modal-content">
                                                    <div class="modal-header">
                                                      <h5 class="modal-title" id="exampleModalLabel">Add Member</h5>
                                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                      </button>
                                                    </div>
                                                    <div className="modal-body">
                                                      <form onSubmit={this.handleSave}>
                                                      <div class="form-group">
                                                        <label class="col-form-label">Nama :</label>
                                                        <input type="text" class="form-control" id="recipient-name" value={this.state.nama} onChange={ev => this.setState({nama: ev.target.value})} />
                                                      </div>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Alamat :</label>
                                                        <input type="text" class="form-control" id="recipient-name" value={this.state.alamat} onChange={ev => this.setState({alamat: ev.target.value})} />
                                                      </div>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Jenis Kelamin :</label>
                                                          <select required class="form-control" value={this.state.jenis_kelamin} onChange={ev => this.setState({jenis_kelamin: ev.target.value})}>
                                                              <option value="" disabled selected hidden> -- Please Select --</option>
                                                              <option value="P">Perempuan</option>
                                                              <option value="L">Laki Laki</option>
                                                          </select>
                                                      </div>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Telepon :</label>
                                                        <input type="text" class="form-control" maxlength="8" id="recipient-name" value={this.state.tlp} onChange={ev => this.setState({tlp: ev.target.value})} />
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

export default MemberKasir;
