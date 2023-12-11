let express = require('express');

const session = require("express-session");

let app = express();

const bcrypt = require("bcrypt");

let path = require('path');

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "pages"));

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

// app.post('/createUser', (req,res) => {
//     req.body.()
// })

app.listen(port, () => {console.log('listening on ' + port)})