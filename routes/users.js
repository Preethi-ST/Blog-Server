const express = require('express');
const router = express.Router();
const SingleUser = require('../Controller/Users/SingleUser');
const UpdateUser = require('../Controller/Users/UpdateUser');
const DeleteUser = require('../Controller/Users/DeleteUser')

router.get('/get/:id',SingleUser)

router.put('/edit/:id',UpdateUser)

router.delete('/remove/:id',DeleteUser)


module.exports = router