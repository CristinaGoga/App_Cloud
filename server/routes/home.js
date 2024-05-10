const express = require('express');
const router = express.Router();//creare obiect router

router.get('/',(req, res)=>res.send('welcome'));//definire ruta
//req-cerere http si res raspuns http trimite res care client folosid send
module.exports = router;
//se exporta pt a putea fi utilizat.
