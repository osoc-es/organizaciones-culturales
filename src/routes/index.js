const express = require('express');
const router = express.Router();
//const Evento = require('../models/Event');


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/get', (req, res) => {

    res.render('index')
})

router.post('/event', async (req, res) => {
    //var data = req.body;
    //const event = new Evento(req.body);
    //await event.save();
    console.log(req.body);
    res.send('received')
})

module.exports = router;
