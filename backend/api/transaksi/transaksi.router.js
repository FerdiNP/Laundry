const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
  } = require('./transaksi.controller');
const authorize = require('../auth/authorize');
const {IsKasir, IsAdmin, IsOwner, IsAdminKasir} = require('../auth/role');

// routes
router.get('/', authorize,controllerGetAll); //admin only
router.get('/:id_transaksi', authorize, controllerGetId); //admin only
router.post('/', authorize,  controllerAdd); // all authenticated users
router.put('/', authorize, controllerEdit); //admin only
router.delete('/:id_transaksi', authorize,controllerDelete); //admin only
module.exports = router;
