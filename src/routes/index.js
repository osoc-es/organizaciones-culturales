const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
    const events = await Event.find();
    res.render('index', { events });
})


router.get('/home', (req, res) => {
    res.render('home')
})

router.get('/inicio_sesion', (req, res) => {
    res.render('inicio_sesion')
})

router.get('/settings', (req, res) => {
    res.render('settings')
})

router.post('/event', async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.redirect('/');
    console.log(req.body);
})


module.exports = router;

