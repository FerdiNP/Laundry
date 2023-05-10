import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


//Pages
import Login from "./pages/Login";
import LoginKasir from "./pages/LoginKasir";
import LoginOwner from "./pages/LoginOwner";
import Dashboard from "./pages/Dashboard";
import DashboardKasir from "./pages/DashboardKasir";
import DashboardOwner from "./pages/DashboardOwner";
import NotFound from "./pages/NotFound";
import Member from "./pages/Member";
import MemberKasir from "./pages/MemberKasir";
import Outlet from "./pages/Outlet";
import Paket from "./pages/Paket";
import User from "./pages/User";
import Transaksi from "./pages/Transaksi";
import TransaksiKasir from "./pages/TransaksiKasir";
import TransaksiOwner from "./pages/TransaksiOwner";
import DetailTransaksi from "./pages/DetailTransaksi";
import TambahTransaksi from "./pages/TambahTransaksi";
import TambahTransaksiKasir from "./pages/TambahTransaksiKasir";


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/kasir" component={LoginKasir} />
            <Route exact path="/owner" component={LoginOwner} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/kasir/dashboard" component={DashboardKasir} />
            <Route exact path="/owner/dashboard" component={DashboardOwner} />
            <Route path="/member" component={Member} />
            <Route path="/kasir/member" component={MemberKasir} />
            <Route path="/outlet" component={Outlet} />
            <Route path="/paket" component={Paket} />
            <Route path="/user" component={User} />
            <Route path="/transaksi" component={Transaksi} />
            <Route path="/kasir/transaksi" component={TransaksiKasir} />
            <Route path="/owner/transaksi" component={TransaksiOwner} />
            <Route path="/detail" component={DetailTransaksi} />
            <Route path="/tambah" component={TambahTransaksi} />
            <Route path="/kasir/tambah" component={TambahTransaksiKasir} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
