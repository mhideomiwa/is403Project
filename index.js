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
        password: process.env.RDS_PASSWORD || 'C1$$&!Xi46RRu0HS',
        database: process.env.RDS_DB_NAME || 'users',
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

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/about', (req, res) => {
    res.render('about');

app.get('/dance', (req, res) => {
    res.render('dance');
});
app.get('/gym', (req, res) => {
    res.render('gym');
});
app.get('/study', (req, res) => {
    res.render('study');
});
app.get('/simp', (req, res) => {
    res.render('simp');
});
app.get('/letsDate', (req, res) => {
    res.render('letsDate');
});

// app.post('/createUser', (req,res) => {
//     req.body.()
// })

app.listen(port, () => {console.log('listening on ' + port)})