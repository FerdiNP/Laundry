import React, { Component } from 'react';

import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import '../../assets/css/main.css';
import axios from "axios"
import $ from "jquery"

class Transaksi extends Component {
  constructor() {
      super()
      this.state = {
          token: "",
          id_transaksi: "",
          id_member: "",
          tgl: "",
          batas_waktu: "",
          tgl_bayar: "",
          status: "",
          dibayar: "",
          id_user: "",
          id_outlet: "",
          id_paket: "",
          qty: "",
          transaksi: [],
          user: [],
          outlet: [],
          member: [],
          detail_transaksi: [],
          paket: [],
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
convertTime = time => {
  let date = new Date(time)
  return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()} `
}

displayStatus = (status, id) => {
    if (status === "baru") {
        return (
            <div className="badge badge-primary">Baru</div>
        )
    } else if (status === "proses") {
        return (
            <div className="badge badge-warning">Proses</div>
        )
    } else if (status === "selesai") {
        return (
            <div className="badge badge-success">Selesai</div>
        )
    } else if (status === "diambil") {
        return (
            <div className="badge badge-info">Diambil</div>
        )
    }
}

displayBayar = (dibayar, id) => {
    if (dibayar === "belum_dibayar") {
        return (
            <div className="badge badge-danger">Belum Lunas</div>
        )
    } else if (dibayar === "dibayar") {
        return (
            <div className="badge badge-success">Lunas</div>
        )
    }
}
getTransaksi() {
       let url = "http://localhost:8080/transaksi/"
       axios.get(url, this.headerConfig())
           .then(response => {
               let dataTransaksi = response.data.data
               for (let i = 0; i < dataTransaksi.length; i++) {
                   let total = 0;
                   for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                       let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                       let qty = dataTransaksi[i].detail_transaksi[j].qty

                       total += (harga * qty)
                   }

                   //tambahkan key "total"
                   dataTransaksi[i].total = total
               }
               this.setState({ transaksi: dataTransaksi })
           })
           .catch(error => console.log(error))
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
  getPaket = async () => {
      let url = "http://localhost:8080/paket/"
      await axios.get(url, this.headerConfig())
      .then(response => {
          this.setState({paket: response.data.data})
      })
      .catch(error => {
              console.log(error);
      })
      console.log(this.state.paket)
  }
  getUsers = () => {
      let user = JSON.parse(localStorage.getItem('user'))
      this.setState({id_user: user.id_user})
  }
  componentDidMount = () => {
      // this.getTransaksi()
      this.getUser()
      this.getOutlet()
      this.getMember()
      this.getPaket()
      this.getUsers()
      this.getTransaksi()
  }
  handleEdit = (item) =>{
      this.setState({
          id_transaksi: item.id_transaksi,
          id_member: item.id_member,
          tgl: item.tgl,
          batas_waktu: item.batas_waktu,
          tgl_bayar: item.tgl_bayar,
          status: item.status,
          dibayar: item.dibayar,
          id_user: item.id_user,
          id_outlet: item.id_outlet,
          action: "update",
          isModalOpen: true
      })
  }
  handleSave = (ev) => {
      ev.preventDefault();
      $("#modal_edittransaksi").modal("hide")
      let url = "http://localhost:8080/transaksi/"
      // menampung data pada detail transaksi
      let detail = {
          id_paket: this.state.id_paket,
          qty: this.state.qty,
      }

      //ambil array detail_transaksi
      let temp = this.state.detail_transaksi
      temp.push(detail)
      this.setState({ detail_transaksi: temp })

      let form = {
        id_transaksi: this.state.id_transaksi,
        id_member: this.state.id_member,
        tgl: this.state.tgl,
        batas_waktu: this.state.batas_waktu,
        tgl_bayar: this.state.tgl_bayar,
        status: this.state.status,
        dibayar: this.state.dibayar,
        id_user: this.state.id_user,
        id_outlet: this.state.id_outlet,
        detail_transaksi: this.state.detail_transaksi
      }

      if(this.state.action === "update"){
          axios.put(url, form,this.headerConfig())
          .then(response => {
              this.getTransaksi()
              console.log(response)
          })
          .catch(error => {
              console.error();
          })
      }
  }
  handleDelete = (id_transaksi) => {
      let url = "http://localhost:8080/transaksi/" + id_transaksi
      if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        axios.delete(url,this.headerConfig())
        .then(response => {
          this.getTransaksi();
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
                            <div className="container-fluid tab">
                              <div>
                                <PageHeading title="Transaksi" />
                                  <button type="button" class="btn btn-primary" onClick={() => {
                                    window.location.href = "/tambah";
                                  }}>
                                      <i class="fas fa-plus"> Add Transaksi </i>
                                  </button>
                                  <hr />
                                    {/* Transaksi List */}
                                            <div class="container-fluid tab">
                                              <ul className="list-group mx-3">
                                              {this.state.transaksi.map((transaksi, index) => (
                                                  <li className="list-group-item">
                                                      <div className="row">
                                                         <div className="col-lg-2">
                                                           <small className="text-secondary">No.</small>
                                                           <h6>{index+1}.</h6>
                                                         </div>
                                                          <div className="col-lg-2">
                                                              <small className="text-secondary">Member :</small>
                                                                  <h6>{transaksi.member.nama}</h6>
                                                          </div>
                                                          <div className="col-lg-2">
                                                              <small className="text-secondary">Status :</small> <br />
                                                              <h6>{this.displayStatus(transaksi.status, transaksi.id_transaksi)}</h6>
                                                          </div>
                                                          <div className="col-lg-2">
                                                              <small className="text-secondary">Pembayaran :</small> <br />
                                                                <h6>{this.displayBayar(transaksi.dibayar, transaksi.id_transaksi)}</h6>
                                                          </div>
                                                          <div className="col-lg-2">
                                                              <small className="text-secondary">Total :</small> <br />
                                                                <h6>Rp {this.formatNumber(transaksi.total)}</h6>
                                                          </div>

                                                          <div className="col-lg-2">
                                                              <button className="btn btn-sm btn-info" onClick={() => window.open(`/detail/${transaksi.id_transaksi}`,`_blank`)}>
                                                              <i class="fas fa-book">  </i>
                                                              </button>
                                                              <button className="btn btn-sm btn-primary m-2" data-toggle="modal" data-target="#modal_edittransaksi" onClick={() => this.handleEdit(transaksi)}>
                                                                <i class="fas fa-edit">  </i>
                                                              </button>
                                                              <button className="btn btn-sm btn-danger" onClick={() => this.handleDelete(transaksi.id_transaksi)}>
                                                                <i class="fas fa-trash-alt">  </i>
                                                              </button>
                                                          </div>
                                                      </div>
                                                  </li>
                                                  ))}
                                              </ul>
                                            </div>

                                              {/* Modal Edit Transaksi */}
                                              <div class="modal fade" id="modal_edittransaksi" show={this.state.isModalOpen} onHide={this.handleClose}>
                                                <div class="modal-dialog" role="document">
                                                  <div class="modal-content">
                                                    <div class="modal-header">
                                                      <h5 class="modal-title" id="exampleModalLabel">Edit Transaksi</h5>
                                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                      </button>
                                                    </div>
                                                    <div className="modal-body">
                                                      <form onSubmit={this.handleSave}>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Status :</label>
                                                          <select required class="form-control" value={this.state.status} onChange={ev => this.setState({status: ev.target.value})}>
                                                              <option value="" disabled selected hidden> -- Please Select --</option>
                                                              <option value="baru"> Baru </option>
                                                              <option value="proses"> Proses </option>
                                                              <option value="selesai"> Selesai </option>
                                                              <option value="diambil"> Diambil </option>
                                                          </select>
                                                      </div>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Dibayar :</label>
                                                          <select required class="form-control" value={this.state.dibayar} onChange={ev => this.setState({dibayar: ev.target.value})}>
                                                              <option value="" disabled selected hidden> -- Please Select --</option>
                                                              <option value="dibayar"> Lunas </option>
                                                              <option value="belum_dibayar"> Belum Lunas</option>
                                                          </select>
                                                      </div>

                                                      <div class="form-group">
                                                        <label class="col-form-label">Tanggal Bayar :</label>
                                                        <input type="date" class="form-control" id="recipient-name" value={this.state.tgl_bayar} onChange={ev => this.setState({tgl_bayar: ev.target.value})} />
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

export default Transaksi;
