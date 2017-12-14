var express = require('express');
var app = express();
var fs = require('fs-extra')
var path = require('path');
var bodyParser = require('body-parser');

//Set EJS up to process
var ejs = require('ejs');
app.set('view engine', 'ejs')

app.set('port', (process.env.PORT || 5000));

//allow downloads in the root
app.use(express.static(__dirname));

//Something so we can post data
app.use(bodyParser.urlencoded({
    extended: true
}));


//empty our folder
fs.emptyDirSync('./template', function (err) {
  if (!err) console.log('success!')
})

//Clone Our Template Files For processing
  require('simple-git')()
    .clone("https://github.com/bs-production/spruce-template", "./template");


//Send traffic to the form
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

//Once you fill out the form start processing our data and making our files
app.post('/', function(req, res){

	
//BBB Code 
var bbbIn = req.body.BBB;
var BBBcode = '<!-- Add this if BBB --><div class="columns widget-item"><div class="widget-affil-img">' + bbbIn + '</div></div><!-- end BBB -->';

if(bbbIn == 0) {
  var BBBcode = "";
}

//store our template file
var compiled = ejs.compile(fs.readFileSync('./template/index.ejs', 'utf8'));

//Fill out our templates
var html = compiled({
       favicon: req.body.favicon,
       logo: req.body.logo,

       mainMessageImage: req.body.mmImage,
       mainMessageText: req.body.mmText,
       mainMessageSubtext: req.body.mmSubText,

       BBBcode: BBBcode,
});

// Compile our EJS into a HTML file
fs.writeFileSync("borders.html", html);


//Lets play with our CSS File

var compiledCSS = ejs.compile(fs.readFileSync('./template/template.css', 'utf8'));
var css = compiledCSS({
	logo: req.body.logo,
	mainMessageImage: req.body.mainMessageImage,
	primaryDarkColor: req.body.primaryDarkColor,
	primaryBrightColor: req.body.primaryBrightColor,
});

fs.writeFileSync("template.css", css);

// Send user to a new file where they can grab there goodies
res.sendFile(__dirname + '/done.html');


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
