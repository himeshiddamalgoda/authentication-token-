const express = require('express')
const router = express.Router();

const { register, login, forgetpassword, resetpassword } = require('../controllers/auth')


router.post('/register', register)

router.post('/login', login)

router.post('/forgetpassword', forgetpassword)

router.put('/resetpassword/:resetToken', resetpassword)



module.exports = router;