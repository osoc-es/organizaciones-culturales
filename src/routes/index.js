const express = require('express');
const router = express.Router();
const Evento = require('../models/Event');


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/get', (req, res) => {
    res.render('index')
})

router.get('/home', (req, res) => {
    res.render('home')
})
router.get('/page-2', (req, res) => {
    res.render('page-2')
})

router.post('/event', async (req, res) => {

    const event = new Evento(req.body);
    await event.save();
    console.log(req.body);
})

module.exports = router;

