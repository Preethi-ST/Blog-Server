const express = require('express');
const router = express.Router();
const {Register} = require('../Controller/Auth/Register')
const {Login,isLoggedIn} = require('../Controller/Auth/Login')
const ForgotPassword = require('../Controller/Auth/ForgotPassword')
const ResetPassword = require('../Controller/Auth/ResetPassword')

router.post('/register',Register)

/* router.get('/activate-account/:activateToken',ActivateAccount) */
router.post('/login',Login)

router.get('/isLoggedIn',isLoggedIn);

router.post('/forgot-password',ForgotPassword)

router.put('/reset-password/:resetToken',ResetPassword)

module.exports = router