const models = require("../../models/index");
const member = models.member;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports = {
    // controller GET All
    controllerGetAll:(req,res)=>{
        member.findAll()
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
        const param = { id_member: req.params.id_member}
        member.findOne({where:param})
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
          nama: req.body.nama,
          alamat: req.body.alamat,
          jenis_kelamin: req.body.jenis_kelamin,
          tlp: req.body.tlp
        }
        member.create(data)
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
        const param = {id_member: req.body.id_member}
        const data = {
          nama: req.body.nama,
          alamat: req.body.alamat,
          jenis_kelamin: req.body.jenis_kelamin,
          tlp: req.body.tlp
        }
        member.update(data , {where: param})
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
        const param = {id_member: req.params.id_member}
        member.destroy({where: param})
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
