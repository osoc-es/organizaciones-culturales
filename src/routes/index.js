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

    try {


        console.log(req.body.category)

        let category_index;
        for (var i = 0; i < Categories.size; ++i) {
            if (Categories.get(i) == req.body.category) {
                category_index = i;
                break;
            }
        }

        var tags_array = req.body.tags.split(" ");


        const event = new Event({
            title: req.body.title,
            max_capacity: req.body.max_capacity,
            price: req.body.price,
            category: category_index,
            tags: tags_array,
            localization: req.body.localization,
            extraInfo: req.body.extra_info
            // falta target y web
        });

        await event.save();

        var evets_per_category = [
            await Event.find({ "category": 0 }),
            await Event.find({ "category": 1 }),
            await Event.find({ "category": 2 }),
            await Event.find({ "category": 3 })
        ];

        var cine_imgs =
            [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Sala_de_cine.jpg/800px-Sala_de_cine.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/8/8d/Cine_Teatro_L%C3%A1zaro_Urd%C3%ADn_desde_las_butacas.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQOjKlGKgB7NTPnEzpas1oDOWkvUm2YfuF32g&usqp=CAU",
                "https://cdn.pixabay.com/photo/2019/04/23/08/49/movie-4148841_1280.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/1/1b/Cine_Ideal_%28Madrid%29_01.jpg"
            ]

        // Add random images to cinemas
        evets_per_category.forEach(cat => {
            cat.forEach(ev => {
                if (ev.category == 0) // Cinemas
                    ev.main_picture = cine_imgs[Math.floor(Math.random() * cine_imgs.length)];

            });
        });



        // No funca
        // var evets_per_category = new Array();
        // for (let i = 0; i < Categories; ++i) {
        //     events_per_category.push(await Event.find({ "category": i }));
        // }




        res.send(evets_per_category)
        // TODO
        res.redirect('/home', { evets_per_category })

    }
    catch (e) {
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

// router.get('/', async (req, res) => {
//     const cine_events = await Event.find({});
//     //activities.find(activity => activity.Categoria == )
//     res.render('home', { activities, Categories })
// })

router.get('/', (req, res) => {
    const categories = Categories;
    res.render('index', { categories })
})


router.get('/home', async (req, res) => {

    var evets_per_category = [
        await Event.find({ "category": 0 }),
        await Event.find({ "category": 1 }),
        await Event.find({ "category": 2 }),
        await Event.find({ "category": 3 }),
        await Event.find({ "category": 4 })
    ];

    // res.render("hola")
    // Add random images to cinemas
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
    const activities = await Event.find();
    //activities.find(activity => activity.Categoria == )
    res.render('home_user', { activities, Categories })
})

router.get('/get', (req, res) => {
    res.render('index')
})

router.get('/home_user', async (req, res) => {
    const activities = await Event.find();
    //activities.find(activity => activity.Categoria == )
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
    //res.send(event_id)
    let event = await Event.findOne({ "_id": event_id });



    console.log(event)
    //res.send(event)
    res.render('evento', { "event": event })
})

router.get('/RegistroEmpresa2', (req, res) => {
    res.render('RegistroEmpresa2')
})

router.get('/page3', (req, res) => {
    res.render('page3')
})

module.exports = router;


//Conectando a la base de datos para sesiones
/*mongoose.connect('mongodb://localhost/session')
  .then(db => console.log('Db connected'))
  .catch(err => console.log(err))

mongoose.Promise = global.Promise;
const db = mongoose.connection;
*/

//express.use(cookieParser());
/*express.use(session({
  secret: 'borasa',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: db })
}));*/

//Inicio de la app

router.get('/', (req, res) => {
    req.session.cred = req.session.cuenta ? req.session.cuenta + 1 : 1;
    //res.redirect('/logueado');
});

const controladorCred = require('../Drivers/cred');
const { db } = require('../models/Image');
router.post('/signupUser', controladorCred.postSignupUser);
router.post('/signupOrganizacion', controladorCred.postSignupOrg);
router.post('/login', controladorCred.postLogin);
router.get('/logout', passportConfig.estaAutenticado, controladorCred.logout);

router.get('/usuarioInfo', passportConfig.estaAutenticado, (req, res) => {
    res.json(req.User);
}
)

router.post('/search', async (req, res) => {
    var aux = req.body.title;

    var titulo = aux.toLowerCase();


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

/*
router.get('/', (req, res) => {
    let sess = req.session;
    if (sess.email) {
        return res.redirect('/admin');//Ya logueado
    }

});

router.post("/user/register", async (req, res) => {
    const user = User.find(req.body.email);
    if (user == null) {
        try {
            const user = new User(req.body);
            user.credentials.contrasenia = await bcrypt.hash(req.body.password, 10);
            user.save();
            req.session.email = req.body.email;
            res.redirect('/Admin');
        } catch (e) {
            console.log(e);
            res.redirect('/');
        }

    }
    else {
        //alert("Usuario ya creado");
        res.redirect('/');
    }
});

router.post("/organization/register", async (req, res) => {
    var query = { email: req.body.email };
    const doc = Credentials.find(query);

    if ((await doc).length > 0) {
        console.log("YA HAY CUENTA");
        res.redirect("/page3");

    } else {
        console.log("NO HAY CUENTA");

        try {
            const org = new Organization({ name: req.body.name, location: req.body.location, webPage: req.body.webPage});
            const cred = new Credentials({foreignKey: org, email: req.body.email, password: await bcrypt.hash(req.body.password, 10) });
            await org.save();
            await cred.save();
            //req.session.email = req.body.email;
            console.log();
            res.redirect('/page3');

        } catch (e) {
            console.log(e);
            res.redirect('/page3');
        }
    }
});

router.post('/user/login', async (req, res) => {
    var query = { email: req.body.email };
    var cursor = Credentials.find(query);

    if ((await cursor).length == 0) {
        console.log("No se encontro el correo");
        return res.status(500);

    } else {
        try {
            const doc = (await cursor).pop();
            console.log(doc.password);

            if (await bcrypt.compare(req.body.password, doc.password)) {
                console.log("contraseña correcta");
                //res.send('Success');
                //req.session.email = req.body.email;
                res.redirect('/inicio_sesion');
            }
            else {
                res.send("La contrasenia no coincide");
            }
        }
        catch (e) {
            console.log("catch");
            console.log(e);
            return res.status(500);
        }
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});
*/
