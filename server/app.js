const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var streamifier = require('streamifier');
var fs = require('fs');
var fileUpload = require("express-fileupload");
var path = require('path');
const router = require('./router');
var cors = require('cors');
const mongoURI = "mongodb://localhost:27017/myfiles";


// Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    // handle db
    if (err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    }
    else {
        console.log('Connected To DB...');
    }

});


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

app.use(fileUpload());
app.use(cors());
app.use(router);


app.get("/", (req, res) => {
    //initialized gridfsbuckets
    var gridfsbucket = new mongoose.mongo.GridFSBucket(conn.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });
    res.render('index');

})

//list down all available files
app.get("/list_1", (req, res) => {
    // var posts = [
    //     {ObjectID: 1, filename : "file1", description: "this is description1"},
    //     {ObjectID: 2, filename : "file2", description: "this is description2"}
    // ];

    // return res.status(200).json({
    //     success: true,
    //     message: "herr in section...",
    //     posts: posts
    // });
    // initialized gridfsbuckets
    var result = conn.db.collection("fileInfo").find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(200).json({
                success: false,
                files: files,
                message: 'No files available',
            });
        }
        return res.status(200).json({
            success: true,
            message: "herr in list_1...",
            posts: files
        });

    });

})
//list down all available files
app.get("/list", (req, res) => {
    //initialized gridfsbuckets
    var gridfsbucket = new mongoose.mongo.GridFSBucket(conn.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });
    gridfsbucket.find({}, { filename: 1 }).toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No files available',
            });
        }
        res.status(200).json({
            success: true,
            files,
        });

    });


})

app.post('/temp', (req, res) => {

    console.log(req.body.year);
    res.status(200).json({
        success: true,
    });
})
app.post('/upload', (req, res) => {

    let filename = req.files.file.name;

    //initialized gridfsbuckets
    var gridfsbucket = new mongoose.mongo.GridFSBucket(conn.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });
    var obj = streamifier.createReadStream(req.files.file.data).
        pipe(gridfsbucket.openUploadStream(filename)).
        on('error', function (error) {
            assert.ifError(error);
        }).
        on('finish', function () {
            console.log('done!');

            //store the file, subject, year in database
            var fileinfo = { file: obj.filename, year: req.body.year, subject: req.body.subject, description: req.body.description, fileObj: obj.id }
            conn.db.collection("fileInfo").insertOne(fileinfo, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
            res.status(200).json({
                success: true,
                msg: 'File Uploaded successfully..'
            });
        });
    //store the file, subject, year in database
    // var fileinfo = { file:obj.filename, year: req.body.year, subject: req.body.subject, description:req.body.description, fileObj: obj.id}
    // conn.db.collection("fileInfo").insertOne(fileinfo, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //   });
})

app.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log(filename);

    //initialized gridfsbuckets
    var gridfsbucket = new mongoose.mongo.GridFSBucket(conn.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });

    gridfsbucket.find({ filename: req.params.filename }).toArray((err, files) => {
        if (!files[0] || files.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No files available',
            });
        }
        res.status(200).json({
            success: true,
            file: files[0],
        });

    });
})

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log(filename);
    var gridfsbucket = new mongoose.mongo.GridFSBucket(conn.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });


    //const stream =  gridfsbucket.openDownloadStreamByName(filename);
    //stream.pipe(res);

    gridfsbucket.openDownloadStreamByName(filename).
        pipe(res).
        on('error', function (error) {
            console.log("error" + error);
            res.status(404).json({
                msg: error.message
            });
        }).
        on('finish', function () {
            console.log('done!');
            // res.send('Downloaded successfully!')
        });
    /*gridfsbucket.openDownloadStreamByName(filename).
    pipe(fs.createWriteStream('./'+filename)).
        on('error', function (error) {
            console.log("error" + error);
            res.status(404).json({
                msg: error.message
            });
        }).
        on('finish', function () {
            console.log('done!');
            res.send('Downloaded successfully!')
        });*/
    // console.log(typeof(stream));
    //res.send('Downloaded successfully!')
    // res.download(stream);
})


const port = 3001;
app.listen(port, () => console.log(`http://localhost:${port}/`));
