import React, { Component } from 'react';

import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';
import '../../assets/css/main.css';
import axios from "axios"
import Pdf from "react-to-pdf"
import $ from "jquery"

export default class DetailTransaksi extends Component {
  constructor() {
  super();
  this.state = {
    token: "",
    transaksi: {},
    isLoading: true
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

formatNumber = (num) => {
  return parseFloat(num)
    .toFixed(0)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
    // untuk convert time
    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()} `
    }

  convertStatus(id_transaksi, status) {
    if (status === "baru") {
      return <h6 className="text-info">Transaksi Baru</h6>;
    } else if (status === "proses") {
      return <h6 className="text-warning">Sedang Di Proses</h6>;
    } else if (status === "selesai") {
      return <h6 className="text-success">Siap Di Ambil</h6>;
    } else if (status === "diambil") {
      return <h6 className="text-success">Sudah Diambil</h6>;
    }
  }
  convertBayar(id_transaksi, dibayar) {
    if (dibayar === "belum_dibayar") {
      return <h6 className="text-danger">Belum Dibayar</h6>;
    } else if (dibayar === "dibayar") {
      return <h6 className="text-success">Sudah Dibayar</h6>;
    }
  }

  getData() {
    let endpoint = `http://localhost:8080/transaksi/${this.getParams()}`;
    axios
      .get(endpoint, this.headerConfig())
      .then((response) => {
        let dataTransaksi = response.data.data;
        let total = 0;
        for (let j = 0; j < dataTransaksi.detail_transaksi.length; j++) {
          let harga = dataTransaksi.detail_transaksi[j].paket.harga;
          let qty = dataTransaksi.detail_transaksi[j].qty;
          total += harga * qty;
        }
        dataTransaksi.total = total;
        this.setState({ transaksi: dataTransaksi });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  getParams() {
    let baseUrl = window.location.href;
    var id = baseUrl.substring(baseUrl.lastIndexOf("/") + 1);
    return id;
  }

  componentDidMount() {
    this.getData();
  }

    render() {
      const { transaksi, isLoading } = this.state;
      if (isLoading) {
        return (
          <div
            class="spinner-border text-primary position-absolute top-50 start-50 translate-middle"
            role="status"></div>
        );
      } else {
        const ref = React.createRef()
        const options = {
          orientation: 'portrait',
          format: [500,300]
        };
        return(
          <div className="container">
            <br />
            <div className="card">
              <div className="card-body">
                <div className="row justify-content-between">
                <h4 className="card-title">
                      Detail Transaksi
                  </h4>
                  <div className="">
                        <Pdf targetRef={ref} filename="detail-transaksi.pdf" options={options} x={10}>
                              {({toPdf}) =>
                                  <button className="btn btn-primary" onClick={toPdf}>
                                    <i className="fas fa-file-download"> </i>
                                  </button>
                              }
                          </Pdf>
                    </div>
                  </div>
              <div className="card-body" ref={ref} id="target">
                <div class="d-flex justify-content-between">
                  <h4>Member : {transaksi.member.nama}</h4>
                  <h4>Petugas : {transaksi.user.username}</h4>
                </div>
                <div class="d-flex justify-content-between">
                  <h6>Tanggal Transaksi : {this.convertTime(transaksi.tgl)}</h6>
                  <h6> ID Transaksi : {transaksi.id_transaksi}</h6>
                </div>
                <h6>Batas Waktu : {this.convertTime(transaksi.batas_waktu)}</h6>
                <h6>Tanggal Bayar : {this.convertTime(transaksi.tgl_bayar)}</h6>
                  <table className="table table-bordered">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Paket</th>
                              <th>Harga</th>
                              <th>Qty</th>
                              <th>Total</th>
                          </tr>
                      </thead>

                      <tbody>
                          {transaksi.detail_transaksi.map((item, index) => (
                              <tr key={item.paket.id_paket}>
                                  <td>{`${index + 1}`}</td>
                                  <td>{item.paket.nama_paket}</td>
                                  <td>Rp {this.formatNumber(item.paket.harga)}</td>
                                  <td>{item.qty}</td>
                                  <td className="text-right">Rp {this.formatNumber(item.paket.harga * item.qty)}</td>
                              </tr>
                          ))}
                          <tr>
                              <td colSpan="4" className="text-danger text-bold">
                                  <h4>Total</h4>
                              </td>
                              <td className="text-right text-danger text-bold">
                                  <h4>
                                      Rp {this.formatNumber(transaksi.total)}
                                  </h4>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
          </div>
   );
    }
}
}
