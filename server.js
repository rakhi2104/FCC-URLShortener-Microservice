'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var renderUrls = require('./controllers/render_url.js');
// var url_models = require('./models/URL_.js');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post('/api/shorturl/new', renderUrls.genURL)

app.get('/api/shorturl/:qu', renderUrls.getURL)


app.listen(port, function () {
  console.log('Node.js listening on port '+ port);
});