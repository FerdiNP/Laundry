import React, {Component} from 'react';

import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import '../../assets/css/main.css';
import axios from "axios"
import $ from "jquery"

class Paket extends Component {
  constructor() {
    super()
    this.state = {
      token: "",
      id_paket: "",
      nama_paket: "",
      jenis: "",
      harga: "",
      paket: [],
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
  formatNumber = (num) => {
    return parseFloat(num)
      .toFixed(0)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };
  getPaket = async () => {
    let url = "http://localhost:8080/paket/"
    await axios.get(url, this.headerConfig())
    .then(response => {
      this.setState({paket: response.data.data})
      console.log(response)
    })
    .catch(error => {
      console.log(error);
      })
      console.log(this.state.paket)
  }
  componentDidMount = () => {
    this.getPaket()
  }
  handleAdd = () => {
    this.setState({
      id_paket: "",
      nama_paket: "",
      jenis: "",
      harga: "",
      action: "insert",
      isModalOpen: true
    })
  }
  handleEdit = (item) => {
    this.setState({
      id_paket: item.id_paket,
      nama_paket: item.nama_paket,
      jenis: item.jenis,
      harga: item.harga,
      action: "update",
      isModalOpen: true
    })
  }
  handleSave = (event) => {
    event.preventDefault();
    $("#modal_paket").modal("hide")
    let url = "http://localhost:8080/paket/"
    let form = {
      id_paket: this.state.id_paket,
      nama_paket: this.state.nama_paket,
      jenis: this.state.jenis,
      harga: this.state.harga
    }

    if (this.state.action === "insert") {
      axios.post(url, form,this.headerConfig())
      .then(response => {
        this.getPaket()
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      })
    } else if (this.state.action === "update") {
      axios.put(url, form,this.headerConfig())
      .then(response => {
        this.getPaket()
        console.log(response)
      })
      .catch(error => {
        console.error();
      })
    }
  }
  handleDelete = (id_paket) => {
    let url = "http://localhost:8080/paket/" + id_paket
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      axios.delete(url,this.headerConfig())
      .then(response => {
        this.getPaket();
        window.alert(response.data.message)
        console.log(response)
      }).catch(error => {
        console.log(error);
      })
    }
  }
  handleClose = () => {
    this.setState({isModalOpen: false})
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
                <PageHeading title="Paket"/>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_paket" onClick={() => this.handleAdd()}>
                    <i class="fas fa-plus"> Add Paket </i>
                </button>
                <hr/>
                <div class="container-fluid">
                  <ul className="list-group mx-3">
                    {
                      this.state.paket.map((paket, index)=> (
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-lg-2">
                            <small className="text-secondary">No.</small>
                            <h6>{index+1}.</h6>
                          </div>
                          <div className="col-lg-3">
                            <small className="text-secondary">Nama Paket :</small>
                            <h6>{paket.nama_paket}</h6>
                          </div>
                          <div className="col-lg-2">
                            <small className="text-secondary">Jenis :</small>
                            <h6>{paket.jenis}</h6>
                          </div>
                          <div className="col-lg-3">
                            <small className="text-secondary">Harga :</small>
                            <h6>Rp {this.formatNumber(paket.harga)}</h6>
                          </div>
                          <div className="col-lg-2">
                            <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal_paket" onClick={() => this.handleEdit(paket)}>
                              <i class="fas fa-edit">  </i>
                            </button>
                            <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(paket.id_paket)}>
                              <i class="fas fa-trash-alt">  </i>
                            </button>
                          </div>
                        </div>
                      </li>))
                    }
                  </ul>
                </div>

                <div class="modal fade" id="modal_paket" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" show={this.state.isModalOpen} onHide={this.handleClose}>
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Paket</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={this.handleSave}>
                          <div class="form-group">
                            <label class="col-form-label">Nama Paket :</label>
                            <input type="text" class="form-control" id="recipient-name" value={this.state.nama_paket} onChange={ev => this.setState({nama_paket: ev.target.value})} />
                          </div>

                          <div class="form-group">
                            <label class="col-form-label">Jenis :</label>
                              <select required class="form-control" value={this.state.jenis} onChange={ev => this.setState({jenis: ev.target.value})}>
                                <option value="" disabled selected hidden> -- Please Select --</option>
                                <option value="Kiloan">Kiloan</option>
                                <option value="Satuan">Satuan</option>
                              </select>
                            </div>

                            <div class="form-group">
                              <label class="col-form-label">Harga :</label>
                              <input type="double" class="form-control" id="recipient-name" value={this.state.harga} onChange={ev => this.setState({harga: ev.target.value})} />
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

export default Paket;
