const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const userRouter = require("./api/user/user.router");
app.use("/user", userRouter);

const outletRouter = require("./api/outlet/outlet.router");
app.use("/outlet", outletRouter);

const paketRouter = require("./api/paket/paket.router");
app.use("/paket", paketRouter);

const memberRouter = require("./api/member/member.router");
app.use("/member", memberRouter);

const transaksiRouter = require("./api/transaksi/transaksi.router");
app.use("/transaksi", transaksiRouter);

const port = 8080;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
