let express = require('express');
let app = express();
let path = require('path');
const port = 3000

// app.post('/createUser', (req,res) => {
//     req.body.()
// })

app.listen(port, () => {console.log('listening on ' + port)})