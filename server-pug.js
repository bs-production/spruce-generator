var express = require('express');  
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');



//Set PUG up to process
var pug = require('pug');
app.set('view engine', 'pug')


//allow downloads in the root
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
    extended: true
}));


//Send traffic to the form 
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});


//Once you fill out the form start processing our data and making our files
app.post('/', function(req, res){




    var html = pug.renderFile('./views/index.pug', {
		 title: 'Hey Hey Hey!', 
	     h1t: req.body.h1,
	     h2t: req.body.h2,
	     p1t: req.body.firstp
	});

	// Compile our PUG into a HTML file
	fs.writeFileSync("borders.html", html);

	// Send user to a new file where they can grab there goodies 
	res.sendFile(__dirname + '/done.html');
});

app.listen(3000, function () {  
    console.log('Example app listening on port 3000!')
})