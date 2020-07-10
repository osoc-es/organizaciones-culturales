const express = require('express');
const router = express.Router();
const Event = require('../models/Event');


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/home', async (req, res) => {
    const activities = await Event.find();
    res.render('home', { activities })
})

router.get('/get', (req, res) => {
    res.render('index')
})

router.get('/inicio_sesion', (req, res) => {
    res.render('inicio_sesion')
})

router.get('/settings', (req, res) => {
    res.render('settings')
})

router.get('/page-2', (req, res) => {
    res.render('page-2')
})

router.get('/evento', (req, res) => {
    res.render('evento')
})

router.get('/page3', (req, res) => {
    res.render('page3')
})

router.post('/event', async (req, res) => {

    const event = new Event(req.body);
    await event.save();
    console.log(req.body);
})

module.exports = router;