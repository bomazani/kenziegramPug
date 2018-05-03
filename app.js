
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'public/uploads' });
// set port to localhost:3000
const port = 3000;
const app = express();

const publicPath = './public';
const uploadsPath = publicPath + '/uploads/';

const uploaded_files = [];

app.set('view engine','pug');
// app.use(express.static(./public))
app.use(express.static(publicPath));
// app.use(express.static(./public/uploads/))
app.use(express.static(uploadsPath));

// const html = {
//     `,
//     foot: `
//         <script src="./index.js"></script>
//         </body>
//         </html>
//     `,
// }



app.get('/', (req, res) => {
    fs.readdir(uploadsPath, function (err, items) {
        console.log(items);
        

        console.log("code that will run in node, instead of in the browser")
        res.render('index', {items})
    });
});


app.post('/uploads', upload.single('myFile'), function (req, res, next) {
    
    let html = '<a href="/">Return</a>';

    console.log("Uploaded: " + req.file.filename);
    // console.log(`Uploaded: ${req.file.filename}`;    
    uploaded_files.push(req.file.filename);
    res.render('success');
});


app.listen(port);
