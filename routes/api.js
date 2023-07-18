const express = require('express')
const router = express.Router()

const movieController = require('../controller/movie')
router.get('/movies', movieController.getList)

module.exports = router
