const express = require('express');
const session = require("express-session");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const path = require('path');
const { guestNavbar, userNavbar } = require('./public/modules/navbars.js');
const { addSongButton, addSongModal } = require('./public/modules/addSong.js');

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
        password: process.env.RDS_PASSWORD || 'C1$$&!Xi46RRu0HS',
        database: process.env.RDS_DB_NAME || 'project',
        port: process.env.RDS_PORT || 5432,
        ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
    }
});

// Routes
app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('../index', {navbar: userNavbar});
    } else {
        res.render(path.join(__dirname, 'public/index'), { navbar: guestNavbar });
    }
});



app.get("/login", (req, res) => {
    res.render(__dirname + "/public/pages/login", {message: "", navbar: guestNavbar});
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
                res.render(__dirname + "/public/index.ejs", {navbar: userNavbar});
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


//logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.render(__dirname + "/public/index.ejs", {navbar: guestNavbar});
})


app.get("/signup", (req, res) => {
    res.render(__dirname + "/public/pages/signup.ejs", {message: "", navbar: guestNavbar});
});

app.post("/createUser", (req, res) => {
    let firstname = req.body.user_first_name;
    let lastname = req.body.user_last_name;
    let username = req.body.username;
    let password = req.body.password;

    knex("user").select().where("username", username).then(user => {
        if (user.length > 0) {
            // If username already exists, display error message in signup.ejs
            res.render(__dirname + "/public/pages/signup", {message: 'Username already exists.'});
        }
        else if(firstname === "" || lastname === "" || username === "" || password === "") {
            // If any field is empty, display error message in signup.ejs
            res.render(__dirname + "/public/pages/signup", {message: 'Please fill in all fields.'});
        }
        else if (firstname.length > 30 || lastname.length > 30 || username.length > 30 || password.length > 30) {
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
                req.session.user = {
                    username: username
                }
                res.render(__dirname + "/public/index.ejs", {navbar: guestNavbar});
            });
        }
    });

})

app.get('/addSong', (req, res) => {
    res.render('addSong', {navbar: guestNavbar });
});

/*
app.get('/login', (req, res) => {
    res.render('login');
});
*/

app.get('/about', (req, res) => {
    if (req.session.user) {
        res.render('about', { navbar: userNavbar });
    } else {
        res.render('about', {navbar: guestNavbar});
    }
});

app.get('/dance', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 1);
        const songs2 = await songs;
        // console.log(songs2)
        if (req.session.user) {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: 'src="./assets/img/portfolio/cabin.png" alt="dating image"',
                navbar: userNavbar,
                addSongButton: addSongButton,
                addSongModal: addSongModal, });
            res.send(tableRowsHTML);
        } else {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: 'src="./assets/img/portfolio/cabin.png" alt="dating image"',
                navbar: guestNavbar,
                addSongButton: '',
                addSongModal: '',
            });
            res.send(tableRowsHTML);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

//'<img src="./assets/img/portfolio/cabin.png" alt="dating image" name="playlistImg" id="playlistImg">'

app.post('/dance', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 1);
        const songs2 = await songs;
        // console.log('Successful Post Request')
        const tableRowsTHML = await ejs.renderFile(__dirname + '/public/modules/songTable.ejs', { songs: songs2 });
        res.send(tableRowsTHML);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

app.get('/gym', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 5);
        const songs2 = await songs;
        // console.log(songs2)
        if (req.session.user) {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: 'src="./assets/img/portfolio/safe.png" alt="dating image"',
                navbar: userNavbar,
                addSongButton: addSongButton,
                addSongModal: addSongModal,
            });
            res.send(tableRowsHTML);
        }
        else {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: 'src="./assets/img/portfolio/safe.png" alt="dating image"',
                navbar: guestNavbar,
                addSongButton: '',
                addSongModal: '',
            });
            res.send(tableRowsHTML);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

app.post('/gym', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 5);
        const songs2 = await songs;
        console.log('Successful Post Request')
        const tableRowsTHML = await ejs.renderFile(__dirname + '/public/modules/songTable.ejs', { songs: songs2 });
        res.send(tableRowsTHML);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

app.get('/study', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 3);
        const songs2 = await songs;
        // console.log(songs2)
        if (req.session.user) {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: 'src="./assets/img/portfolio/circus.png" alt="dating image"',
                navbar: userNavbar,
                addSongButton: addSongButton,
                addSongModal: addSongModal,
            });
            res.send(tableRowsHTML);
        }
        else {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: 'src="./assets/img/portfolio/circus.png" alt="dating image"',
                navbar: guestNavbar,
                addSongButton: '',
                addSongModal: '',
            });
            res.send(tableRowsHTML);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

app.post('/study', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 3);
        const songs2 = await songs;
        console.log('Successful Post Request')
        const tableRowsTHML = await ejs.renderFile(__dirname + '/public/modules/songTable.ejs', { songs: songs2 });
        res.send(tableRowsTHML);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

app.get('/simp', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 2);
        const songs2 = await songs;
        // console.log(songs2)
        if (req.session.user) {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: 'src="./assets/img/portfolio/cake.png" alt="simp image"',
                navbar: userNavbar,
                addSongButton: addSongButton,
                addSongModal: addSongModal,
            });
            res.send(tableRowsHTML);
        } else {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: 'src="./assets/img/portfolio/cake.png" alt="simp image"',
                navbar: guestNavbar,
                addSongButton: '',
                addSongModal: '',
            });
            res.send(tableRowsHTML);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

app.post('/simp', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 2);
        const songs2 = await songs;
        console.log('Successful Post Request')
        const tableRowsTHML = await ejs.renderFile(__dirname + '/public/modules/songTable.ejs', { songs: songs2 });
        res.send(tableRowsTHML);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

app.get('/letsDate', async (req, res) => {
    try {
        const songs = knex("songplay").select()
            .join("song", "songplay.song_id", "=", "song.song_id")
            .join("playlist", "songplay.playlist_id", "=", "playlist.playlist_id")
            .where("playlist.playlist_id", 4);
        const songs2 = await songs;
        // console.log(songs2)
        if(req.session.user) {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: '<img src="./assets/img/portfolio/game.png" alt="dating image" name="playlistImg" id="playlistImg">',
                navbar: userNavbar,
                addSongButton: addSongButton,
                addSongModal: addSongModal,
            });
            res.send(tableRowsHTML);
        }
        else {
            const tableRowsHTML = await ejs.renderFile(__dirname + '/public/pages/playlist.ejs', {
                songs: songs2,
                playlistImage: 'src="./assets/img/portfolio/game.png" alt="dating image"',
                navbar: guestNavbar,
                addSongButton: '',
                addSongModal: '',
            });
            res.send(tableRowsHTML);
        }
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



app.post('/submitSong', async (req, res) => {
    try {
        const songTitle = req.body.songTitle;
        const artistName = req.body.artistName;
        const genre = req.body.genre;
        const playlistCategory = req.body.playlistCategory;
        let playlistID = 0;

        if (playlistCategory === "dance") {
            playlistID = 1;
        } else if (playlistCategory === "simp") {
            playlistID = 2;
        } else if (playlistCategory === "study") {
            playlistID = 3;
        } else if (playlistCategory === "letsDate") {
            playlistID = 4;
        } else if (playlistCategory === "gym") {
            playlistID = 5;
        }

        const insertedSong = await knex("song")
            .insert({
                song_title: songTitle,
                artist: artistName,
                genre: genre
            })
            .returning('song_id');

        const songID = insertedSong[0].song_id; // Extract the song ID from the returned array

        await knex("songplay").insert({
            song_id: songID,
            playlist_id: playlistID
        });

        await knex("songuser").insert({
            song_id: songID,
            username: req.session.user.username
        });

        console.log('Song added')

        res.redirect("/" + playlistCategory);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/profile', (req, res) => {
    if (req.session.user) {
            knex("user").select().where("username", req.session.user.username).then(user => {
                res.render(__dirname + "/public/pages/profile.ejs", {navbar: userNavbar, user: user[0]}) 
        })

    } else {
        res.redirect('/login');
    }
});

app.get('/editProfile', (req, res) => {
    if (req.session.user) {
        knex("user").select().where("username", req.session.user.username).then(user => {
            res.render(__dirname + "/public/pages/editProfile.ejs", {navbar: userNavbar, user: user[0], message: ''});
        })
    } else {
        res.redirect('login');
    }
});

app.post('/editProfile', (req, res) => {
    let firstname = req.body.user_first_name;
    let lastname = req.body.user_last_name;

    console.log(firstname, lastname);

    if (firstname === "" || lastname === "") {
        // If any field is empty, display an error message
        res.render(__dirname + "/public/pages/editProfile", { message: 'Please fill in all fields.' });
    } else if (firstname.length > 30 || lastname.length > 30) {
        // If any field is longer than 30 characters, display an error message
        res.render(__dirname + "/public/pages/editProfile", { message: 'Please make sure all fields are less than 30 characters.' });
    } else {
        // Update the user's information in the database
        knex("user")
            .where("username", req.session.user.username)
            .update({
                first_name: firstname,
                last_name: lastname,
            })
            .then(() => {
                // Fetch the updated user data after the update operation
                knex("user")
                    .select()
                    .where("username", req.session.user.username)
                    .then(updatedUser => {
                        const user = updatedUser[0]; // Extract the user object from the array

                        // Render the profile page with the updated user information
                        res.render(__dirname + "/public/pages/profile", { message: "Account updated successfully.", navbar: userNavbar, user: user });

                    })
                    .catch(err => {
                        // Handle any error that occurred during fetching the updated user data
                        console.error("Error fetching updated user data:", err);
                        res.status(500).send("Internal Server Error");
                    });
            })
            .catch(err => {
                // Handle any error that occurred during the update operation
                console.error("Error updating user data:", err);
                res.status(500).send("Internal Server Error");
            });
    }
});

app.delete('/deleteUser/', async (req, res) => {
    try {
        // const {username} = req.session.user
        // console.log(username)

        // Delete the user from the 'users' table where the username matches
        await knex('user').where("username", req.session.user.username).del();

        res.sendStatus(200); // Send a success status upon successful deletion
    } catch (error) {
        console.error('Error deleting user:', error);
        res.sendStatus(500); // Send a server error status on failure
    }
});




app.listen(port, () => { console.log('listening on ' + port) });
