const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/Event');
const Categories = require('../models/Categories');
const Image = require('../models/Image');

const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Organization = require('../models/Organization');
const Credentials = require('../models/Credential');

const bodyparser = require('body-parser');
const passport = require('passport');
const passportConfig = require('../config/passport');

// set uf for uploading images to db
const upload = multer({
    limits: {
        fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
            cb(new Error('only upload files with jpg or jpeg format.'));
        }
        cb(undefined, true); // continue with upload
    }
});

// Post for creating a event
router.post('/create-event', /*passportConfig.estaAutenticado,*/ async (req, res) => {

    try {
        // Check what category is the new event
        let category_index;
        for (var i = 0; i < Categories.size; ++i) {
            if (Categories.get(i) == req.body.category) {
                category_index = i;
                break;
            }
        }

        // Slit tags 
        var tags_array = req.body.tags.split(" ");

        // Create the event
        const event = new Event({
            title: req.body.title,
            max_capacity: req.body.max_capacity,
            price: req.body.price,
            category: category_index,
            tags: tags_array,
            localization: req.body.localization,
            extraInfo: req.body.extra_info,
            web: req.body.web
        });

        await event.save(); // save it

        // Get all events of all categories
        var evets_per_category = [
            await Event.find({ "category": 0 }),
            await Event.find({ "category": 1 }),
            await Event.find({ "category": 2 }),
            await Event.find({ "category": 3 }),
            await Event.find({ "category": 4 }),
        ];

        // In case a event dont have a main picture, we provide it
        evets_per_category.forEach(cat => {
            cat.forEach(ev => {
                if (ev.main_picture == null) {
                    console.log("-------- " + ev._id)
                    ev.main_picture = "https://4.bp.blogspot.com/-05Vg3I4j-TU/VDPR0iIsBpI/AAAAAAAAycQ/IWb1oD0H5Ug/s1600/image_oikos3.jpg"
                }

            })
        });

        // Render the home view with the data
        res.render('home', { Categories, evets_per_category });

    }
    catch (e) {
        console.log("error:");
        console.log(e);
    }

})

// post to submit an image
router.post('/submitImg', upload.single("image"), async (req, res) => {
    try {
        const photo = new Image(req.body);
        const file = req.file.buffer;
        photo.photo = file;

        await photo.save();
        res.status(201).send({ _id: photo._id });

    } catch (error) {
        res.status(500).send({
            upload_error: 'Error while uploading file...Try again later.'
        });
    }
});


router.get('/', (req, res) => {

    // var evets_per_category = [
    //     await Event.find({ "category": 0 }),
    //     await Event.find({ "category": 1 }),
    //     await Event.find({ "category": 2 }),
    //     await Event.find({ "category": 3 }),
    //     await Event.find({ "category": 4 })
    // ];

    // // In case a event dont have a main picture, we provide it
    // evets_per_category.forEach(cat => {
    //     cat.forEach(ev => {
    //         if (ev.main_picture == null) {
    //             console.log("-------- " + ev._id)
    //             ev.main_picture = "https://4.bp.blogspot.com/-05Vg3I4j-TU/VDPR0iIsBpI/AAAAAAAAycQ/IWb1oD0H5Ug/s1600/image_oikos3.jpg"
    //         }

    //     })
    // });

    res.redirect('home');
})


router.get('/home', async (req, res) => {

    var evets_per_category = [
        await Event.find({ "category": 0 }),
        await Event.find({ "category": 1 }),
        await Event.find({ "category": 2 }),
        await Event.find({ "category": 3 }),
        await Event.find({ "category": 4 })
    ];

    // In case a event dont have a main picture, we provide it
    evets_per_category.forEach(cat => {
        cat.forEach(ev => {
            if (ev.main_picture == null) {
                console.log("-------- " + ev._id)
                ev.main_picture = "https://4.bp.blogspot.com/-05Vg3I4j-TU/VDPR0iIsBpI/AAAAAAAAycQ/IWb1oD0H5Ug/s1600/image_oikos3.jpg"
            }

        })
    });


    res.render('home', { evets_per_category: evets_per_category, Categories });

})


router.get('/home_user', async (req, res) => {
    var evets_per_category = [
        await Event.find({ "category": 0 }),
        await Event.find({ "category": 1 }),
        await Event.find({ "category": 2 }),
        await Event.find({ "category": 3 }),
        await Event.find({ "category": 4 })
    ];

    // In case a event dont have a main picture, we provide it
    evets_per_category.forEach(cat => {
        cat.forEach(ev => {
            if (ev.main_picture == null) {
                console.log("-------- " + ev._id)
                ev.main_picture = "https://4.bp.blogspot.com/-05Vg3I4j-TU/VDPR0iIsBpI/AAAAAAAAycQ/IWb1oD0H5Ug/s1600/image_oikos3.jpg"
            }

        })
    });

    res.render('home_user', { evets_per_category: evets_per_category, Categories });
})

router.get('/index', (req, res) => {
    const categories = Categories;
    res.render('index', { categories })
})

router.get('/get', (req, res) => {
    res.render('index')
})

router.get('/home_user', async (req, res) => {
    const activities = await Event.find();
    res.render('home_user', { activities, Categories })
})

router.get('/inicio_sesion', (req, res) => {
    res.render('inicio_sesion')
})

router.get('/settings', (req, res) => {
    res.render('settings')
})

router.get('/registro', (req, res) => {
    res.render('registro')
})

router.get('/RegistroEmpresa', (req, res) => {
    res.render('RegistroEmpresa')
})

router.get('/evento/:event_id', async (req, res) => {

    var event_id = req.params.event_id;
    let event = await Event.findOne({ "_id": event_id });

    res.render('evento', { "event": event })
})

router.get('/RegistroEmpresa2', (req, res) => {
    res.render('RegistroEmpresa2')
})

router.get('/page3', (req, res) => {
    res.render('page3')
})


router.post('/search', async (req, res) => {
    // get the title 
    var aux = req.body.title;
    var titulo = aux.toLowerCase();

    // get the category
    var string_cat = (req.body.category)
    var cat = -1;

    if (string_cat == "CINE") {
        cat = 0;
    }
    else if (string_cat == "TEATRO") {
        cat = 1;
    }
    else if (string_cat == "GASTRONOMÍA") {
        cat = 2;
    }
    else if (string_cat == "MUSEO") {
        cat = 3;
    }
    else if (string_cat == "MÚSICA") {
        cat = 4;
    }

    var regex = ".*";
    var text = regex.concat(titulo).concat(regex);


    let doc;
    if (cat == -1) {
        doc = await Event.find(
            {
                $or: [{ "title": { $regex: text } }, { "tags": { $regex: text } }]
            })
    }
    else {
        doc = await Event.find(
            {
                $or: [{ "title": { $regex: text }, category: cat }, { "tags": { $regex: text }, category: cat }]
            })

    }

    //res.send(doc);
    res.render('busqueda', { Categories, doc: doc });
});

module.exports = router;


const controladorCred = require('../Drivers/cred');
const { db } = require('../models/Image');
router.post('/signupUser', controladorCred.postSignupUser);
router.post('/signupOrganizacion', controladorCred.postSignupOrg);
router.post('/login', controladorCred.postLogin);
router.get('/logout', passportConfig.estaAutenticado, controladorCred.logout);

router.get('/usuarioInfo', passportConfig.estaAutenticado, (req, res) => {
    res.json(req.User);
})

