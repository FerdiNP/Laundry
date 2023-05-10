const models = require("../../models/index");
const outlet = models.outlet;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports = {
    // controller GET All
    controllerGetAll:(req,res)=>{
        outlet.findAll({ include: [{ all: true, nested: true }] })
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    // controller GET by ID
    controllerGetId:(req,res)=>{
        const param = { id_outlet: req.params.id_outlet}
        outlet.findOne({where:param, include: [{ all: true, nested: true }]})
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    // controller ADD
    controllerAdd: (req, res) => {
        const data = {
            tempat: req.body.tempat,
            alamat: req.body.alamat,
            id_user: req.body.id_user
        }
        outlet.create(data)
        .then(result => {
            res.json({
                message: "Data berhasil ditambahkan",
                success: 1,
                data: result,data
            })
        })
    },
    // controller EDIT
    controllerEdit:(req,res)=>{
        const param = {id_outlet: req.body.id_outlet}
        const data = {
          tempat: req.body.tempat,
          alamat: req.body.alamat,
          id_user: req.body.id_user
        }
        outlet.update(data , {where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result,data
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    // controller DELETE
    controllerDelete: (req,res)=>{
        const param = {id_outlet: req.params.id_outlet}
        outlet.destroy({where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result,
                message: "Berhasil Dihapus"
            })
        })
        .catch(error => {
            res.json({
                message: "Hapus Gagal! Outlet ini sedang digunakan di Transaksi"
            })
        })
    }
}
