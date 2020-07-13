const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/Event');
const Categories = require('../models/Categories');
const Image = require('../models/Image');

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

router.post('/create-event', async (req, res) => {

    try{
    const event = new Event({title: req.body.title, 
        max_capacity: req.body.max_capacity,
        price: req.body.price,
        tags: req.body.tags,
        reviews:req.body.reviews,
        localization: req.body.localization});

    await event.save();

    const image  = new Image({ismap : true,
    photo : req.body.blueprint,
    foreingKey: event});
    await image.save();

    const image2  = new Image({ismap : false,
        photo : req.body.image,
        foreingKey: event});

        await image2.save();

    }
    catch(e)
    {
        console.log("error");
    }

})

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
},
    (error, req, res, next) => {
        if (error) {
            res.status(500).send({
                upload_error: error.message
            });
        }
    }
);

router.get('/photos', async (req, res) => {
    try {
        const photos = await Image.find({});
        res.send(photos);
    } catch (error) {
        res.status(500).send({ get_error: 'Error while getting list of photos.' });
    }
});


// router.get('/photos/:id', async (req, res) => {
//     try {
//         const result = await Image.findById(req.params.id);
//         res.set('Content-Type', 'image/jpeg');
//         res.send(result.photo);
//     } catch (error) {
//         res.status(400).send({ get_error: 'Error while getting photo.' });
//     }
// });

router.get('/', (req, res) => {
    const categories = Categories;
    res.render('index', { categories })
})

router.get('/home', async (req, res) => {
    const activities = await Event.find();
    //activities.find(activity => activity.Categoria == )
    res.render('home', { activities, Categories })
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

module.exports = router;