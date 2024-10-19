const express = require('express')
const {createPdf, fetchPdf, sendPdf} = require('../controllers/pdfController')
const router = express.Router();


router.post('/createPdf',createPdf) // to generate pdf
router.post('/fetchPdf',fetchPdf) // to get pdf
router.post('/sendPdf',sendPdf) //sentpdf to mail mail


module.exports = router
