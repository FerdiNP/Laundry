const models = require("../../models/index");
const paket = models.paket;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports = {
    // controller GET All
    controllerGetAll:(req,res)=>{
        paket.findAll()
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
        const param = { id_paket: req.params.id_paket}
        paket.findOne({where:param})
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
            nama_paket: req.body.nama_paket,
            jenis: req.body.jenis,
            harga: req.body.harga
        }
        paket.create(data)
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
        const param = {id_paket: req.body.id_paket}
        const data = {
            nama_paket: req.body.nama_paket,
            jenis: req.body.jenis,
            harga: req.body.harga
        }
        paket.update(data , {where: param})
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
        const param = {id_paket: req.params.id_paket}
        paket.destroy({where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result,
                message: "Berhasil Dihapus"
            })
        })
        .catch(error => {
            res.json({
                message: "Hapus Gagal!"
            })
        })
    }
}
