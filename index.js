const express = require('express');
const session = require("express-session");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const path = require('path');
const { guestNavbar, userNavbar } = require('./public/modules/navbars.js');

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/pages"));

// Static files and form data handling
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}));

// Session setup
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));

// Knex setup
const knex = require("knex")({
    client: "pg",
    connection: {
        host: process.env.RDS_HOSTNAME || 'localhost',
        user: process.env.RDS_USERNAME || 'postgres',
        password: process.env.RDS_PASSWORD || 'admin',
        database: process.env.RDS_DB_NAME || 'project3',
        port: process.env.RDS_PORT || 5432,
        ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
    }
});

// Routes
app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'public/index'), { navbar: guestNavbar });
    // console.log(guestNavbar);
    // To be updated after login implementation:
    // if (req.session.user) {
    //     res.render('../index', {navbar: userNavbar});
    // } else {
    //     res.render(path.join(__dirname, 'public/pages/index'), { navbar: guestNavbar });
    // }
});

app.get("/signup", (req, res) => {
    res.render(__dirname + "/public/pages/signup.ejs", {message: ""});
});

app.get("/login", (req, res) => {
    res.render(__dirname + "/public/pages/login", {message: ""});
});

app.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    knex.select().from("user").where("username", username).then(user => {
        if (user.length > 0) {
            if (user[0].password === password) {
                req.session.user = {
                    username: username
                }
                res.sendFile(__dirname + "/public/pages/index.ejs");
            } else {
                // If password is incorrect, display error message in login.ejs
                res.render(__dirname + "/public/pages/login", { message: 'Incorrect username or password.' });
            }
        } else {
            // If username doesn't exist, display error message in login.ejs
            res.render(__dirname + "/public/pages/login", { message: 'Incorrect username or password.' });
        }
    });
});

app.post("/signup", (req, res) => {
    let firstname = req.body.user_first_name;
    let lastname = req.body.user_last_name;
    let username = req.body.username;
    let password = req.body.password;

    knex("user").select().where("username", username).then(user => {
        if (user.length > 0) {
            // If username already exists, display error message in signup.ejs
            res.render(__dirname + "/public/pages/signup", {message: 'Username already exists.'});
        }
        else if(firstname === "" || lastname === "" || username === "" || password === "" || email === "") {
            // If any field is empty, display error message in signup.ejs
            res.render(__dirname + "/public/pages/signup", {message: 'Please fill in all fields.'});
        }
        else if (firstname.length > 30 || lastname.length > 30 || username.length > 30 || password.length > 30 || email.length > 30) {
            // If any field is longer than 30 characters, display error message in signup.ejs
            res.render(__dirname + "/public/pages/signup", {message: 'Please make sure all fields are less than 30 characters.'});
        }
        else {
            knex("user").insert({
                first_name: firstname,
                last_name: lastname,
                username: username,
                password: password
            }).then(user => {
                res.sendFile(__dirname + "/public/pages/index.ejs");
            });
        }
    });

})



/*
app.get('/login', (req, res) => {
    res.render('login');
});
*/

app.get('/about', (req, res) => {
    res.render('about', {navbar: guestNavbar });
});

app.get('/dance', (req, res) => {
    res.render('playlist');
});

app.get('/gym', (req, res) => {
    res.render('playlist');
});

app.get('/study', (req, res) => {
    res.render('playlist');
});

app.get('/simp', (req, res) => {
    res.render('playlist');
});

app.get('/letsDate', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 1);
        const songs2 = await songs;
        // console.log(songs2)
        const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', { songs: songs2, playlistImage: '<img src="./assets/img/portfolio/game.png" alt="dating image" name="playlistImg" id="playlistImg">' });
        res.send(tableRowsHTML);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

app.post('/letsDate', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 4);
        const songs2 = await songs;
        console.log('Successful Post Request')
        const tableRowsTHML = await ejs.renderFile(__dirname + '/public/modules/songTable.ejs', { songs: songs2 });
        res.send(tableRowsTHML);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

// app.post('/createUser', (req,res) => {
//     req.body.()
// })

app.listen(port, () => { console.log('listening on ' + port) });
