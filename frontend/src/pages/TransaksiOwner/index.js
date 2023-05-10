import React, { Component } from 'react';

import SidebarOwner from '../../components/Navigation/SidebarOwner';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import '../../assets/css/main.css';
import axios from "axios"
import $ from "jquery"

class TransaksiOwner extends Component {
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

    render() {
        return (
          <div>
              {/* <!-- Page Wrapper --> */}
              <div id="wrapper" >

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
                          <div className="container-fluid tab">
                            <div>
                              <PageHeading title="Transaksi" />
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
                                                            <button className="btn btn-sm btn-info m-2" onClick={() => window.open(`/detail/${transaksi.id_transaksi}`,`_blank`)}>
                                                            <i class="fas fa-book">  </i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                                ))}
                                            </ul>
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

export default TransaksiOwner;
