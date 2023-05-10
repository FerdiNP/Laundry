const express = require('express');
const router = express.Router();
const {
    controllerGetAll,
    controllerGetId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
  } = require('./paket.controller');
const authorize = require('../auth/authorize');
const {IsKasir, IsAdmin, IsOwner, IsAdminKasir} = require('../auth/role');

// routes
router.get('/', authorize,controllerGetAll); //admin only
router.get('/:id_paket',authorize, controllerGetId); //admin only
router.post('/',authorize,controllerAdd); // all authenticated users
router.put('/',authorize,controllerEdit); //admin only
router.delete('/:id_paket', authorize,controllerDelete); //admin only
module.exports = router;
