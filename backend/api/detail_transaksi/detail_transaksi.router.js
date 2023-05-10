const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetId
  } = require('./detail_transaksi.controller');
const authorize = require('../auth/authorize');
const {IsKasir, IsAdmin, IsOwner, IsAdminKasir} = require('../auth/role');

// routes
router.get('/',authorize, controllerGetAll); //admin only
router.get('/:id_detail_transaksi',authorize,  controllerGetId); //admin only
module.exports = router;
