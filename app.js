const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'public/uploads' });
const port = 3000;
const app = express();

const uploaded_files = [];

app.use(express.static('public'));
app.use(express.static('./public/uploads/'));

app.get('/home', (req, res) => {
    const path = './public/uploads/';
    fs.readdir(path, function (err, items) {
        console.log(items);
        let html = `<h1>Welcome to Kenziegram!</h1>`;
        for (i=0; i<items.length; i++){
            html += `<img src="${items[i]}">`;
        }
        
        res.send(html);
    });
});

app.post('/upload', upload.single('myFile'), function (req, res, next) {

    // req.file is the `myFile` file
    // req.body will hold the text fields, if there are any
    console.log("Uploaded: " + req.file.filename);
    // console.log(`Uploaded: ${req.file.filename}`;    
    uploaded_files.push(req.file.filename);
    res.end("Uploaded file!");
});


app.listen(port);