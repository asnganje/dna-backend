const express = require('express');
const { signup, login, updateUser, deleteUser } = require('../controllers/authController');
const router = express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/:id').patch(updateUser)
router.route('/:id').delete(deleteUser)

module.exports = router;