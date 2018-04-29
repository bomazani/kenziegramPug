
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'public/uploads' });
const port = 3000;
const app = express();

const publicPath = './public';
const uploadsPath = publicPath + '/uploads/';

const uploaded_files = [];

app.use(express.static(publicPath));
app.use(express.static(uploadsPath));

const html = {
    head: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>My Kenziegram</title>
            <link rel="stylesheet" href="./style.css">
        </head>
    `,
    bodyHeader: `
        <body>
            <h1>Welcome to Kenziegram!</h1>
    `,
    form: `
        <form action="http://localhost:3000/uploads" method="post" enctype="multipart/form-data">
            <div>
            <label for="file">Choose a File</label>
            <!-- <input type="file" id="file" name="myFile"> -->
            <input type="file" id="file" name="myFile">
            
            <!-- <input type="file" name="file" id="file" accept="image/*" multiple> -->
            </div>
            <div>
            <button>Send the file</button>
            </div>
        </form>
    `,
    foot: `
        <script src="./index.js"></script>
        </body>
        </html>
    `,
}



app.get('/', (req, res) => {
    fs.readdir(uploadsPath, function (err, items) {
        console.log(items);
        
        let htmlImageGallery = ``;
        for (let i = 0; i < items.length; i++) {
            htmlImageGallery += `<img src="${ items[i] }">`;
        }

        const htmlOutput = 
            html.head + 
            html.bodyHeader + 
            html.form + 
            htmlImageGallery + 
            html.foot;

        console.log("code that will run in node, instead of in the browser")
        res.send(htmlOutput);
    });
});

app.post('/uploads', upload.single('myFile'), function (req, res, next) {

    // req.file is the `myFile` file
    // req.body will hold the text fields, if there are any
    console.log("Uploaded: " + req.file.filename);
    // console.log(`Uploaded: ${req.file.filename}`;    
    uploaded_files.push(req.file.filename);
    res.end("Uploaded file!");
});


app.listen(port);
