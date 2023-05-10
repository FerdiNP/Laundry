import React, { Component } from 'react';

import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import '../../assets/css/main.css';
import axios from "axios"
import $ from "jquery"
import { Modal } from "bootstrap";
import { base_url } from "../../Config.js";


class TambahTransaksi extends Component {
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

    handleAdd(e) {
      e.preventDefault()
      this.modal.hide()
      let idPaket = this.state.id_paket;
      let list_paket = this.state.paket;
      let selectedPaket = list_paket.find(
      ({ id_paket }) => id_paket === parseInt(idPaket)
        );

      console.log(selectedPaket);
      let newPaket = {
        id_paket: this.state.id_paket,
        qty: this.state.qty,
        nama_paket: selectedPaket.nama_paket,
        harga: selectedPaket.harga
      };

      // Ambil array detail_transaksi
      let temp = this.state.detail_transaksi
      temp.push(newPaket)
      this.setState({ detail_transaksi: temp })
      console.log(temp);
    }
    addPaket() {
      this.modal = new Modal(document.getElementById("modal_paket"));
      this.modal.show();
      this.setState({
        id_paket: "",
        qty: "",
        jenis_paket: "",
        harga: 0
      });
    }

    handleSave() {
      if (document.getElementById("member").value === "") {
        window.alert("Tolong lengkapi data Member");
        return;
      }
      if (document.getElementById("batas_waktu").value === "") {
        window.alert("Tolong lengkapi data Batas Waktu");
        return;
      }
      if (this.state.detail_transaksi.length === 0) {
        window.alert("Tolong Tambah Paket");
        return;
      }
      let url = `${base_url}transaksi`
      let user = JSON.parse(localStorage.getItem("user"))
      let newData = {
        id_member: this.state.id_member,
        tgl: Date().toLocaleString(),
        batas_waktu: this.state.batas_waktu,
        status: "baru",
        dibayar: "belum_dibayar",
        id_outlet: this.state.id_outlet,
        id_user: user.id_user,
        detail_transaksi: this.state.detail_transaksi,
      }

      axios.post(url, newData, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          window.location.href = `/transaksi`
        })
        .catch(error => console.log(error))
    }

    handleDelete(id_paket) {
      if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {

        //mencari posisi index dari data yang akan dihapus
        console.log(id_paket);
        let temp = this.state.detail_transaksi
        let index = temp.findIndex(detail => detail.id_paket === id_paket)

        //menghapus data pada array
        temp.splice(index, 1)

        this.setState({ detail: temp })
      }
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
                            <PageHeading title="Tambah Transaksi" />
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div class="form-group">
                <label class="col-form-label">Member :</label>
                  <select id="member" class="form-control" value={this.state.id_member} onChange={ev => this.setState({id_member: ev.target.value})}>
                      <option value="" disabled selected hidden> -- Please Select --</option>
                      {this.state.member.map(member => (
                        <option value={member.id_member}> {member.nama}</option>
                      ))}
                  </select>
             </div>

             <div class="form-group">
               <label class="col-form-label">Batas Waktu :</label>
               <input id="batas_waktu" type="date" class="form-control" value={this.state.batas_waktu} onChange={ev => this.setState({batas_waktu: ev.target.value})} />
             </div>

             <div class="form-group">
               <label class="col-form-label">Outlet :</label>
                 <select id="outlet" class="form-control" value={this.state.id_outlet} onChange={ev => this.setState({id_outlet: ev.target.value})}>
                     <option value="" disabled selected hidden> -- Please Select --</option>
                     {this.state.outlet.map(outlet => (
                       <option value={outlet.id_outlet}> {outlet.tempat}</option>
                     ))}
                 </select>
              </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-success"
                    onClick={() => this.addPaket()}
                  >
                    Add Paket
                  </button>
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleSave()}
                >
                  Save
                </button>
              </div>
              <hr />
              {/* tampilkan isi detail */}

              <h5 class="text-center font-weight-bold text-secondary">Paket List</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Paket</th>
                            <th>Harga</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.detail_transaksi.map((item, index) => (
                            <tr key={item.id_paket}>
                                <td>{`${index + 1}`}.</td>
                                <td>{item.nama_paket}</td>
                                <td>Rp {this.formatNumber(item.harga)}</td>
                                <td>{item.qty}</td>
                                <td>Rp {this.formatNumber(item.harga * item.qty)}</td>
                                <td> <button className="btn btn-sm btn-danger" onClick={() => this.handleDelete(item.id_paket)}>
                                          <i class="fas fa-trash-alt">  </i>
                                     </button>
                                </td>
                          </tr>
                        ))}
                    </tbody>
                </table>
              {/* Modal utk pilihan paket */}
              <div class="modal fade" id="modal_paket" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Add Paket</h5>
                  </div>
                    <div className="modal-body">
                      <form onSubmit={(e) => this.handleAdd(e)}>
                        <div class="form-group">
                          <label class="col-form-label">Paket :</label>
                            <select required class="form-control" value={this.state.id_paket} onChange={ev => this.setState({id_paket: ev.target.value})}>
                                <option value="" disabled selected hidden> -- Please Select --</option>
                                {this.state.paket.map(paket => (
                                  <option value={paket.id_paket}> {paket.nama_paket}</option>
                                ))}
                            </select>
                         </div>

                        <div class="form-group">
                          <label class="col-form-label">Jumlah / Qty :</label>
                          <input required type="number" class="form-control" id="recipient-name" value={this.state.qty} onChange={ev => this.setState({qty: ev.target.value})} />
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
      </div>
  </div>
</div>
<br />
<br />
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

export default TambahTransaksi;
