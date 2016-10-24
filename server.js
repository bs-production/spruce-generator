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


//Items Checked For Services Row
var servicesList = req.body.services;

// // all of our services data
var list = [{
    sName:"Basement Finishing",
    sFile: '<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/basement-finishing.html" title="Basement Finishing in [territory], [major cities 3]" alt="Basement Finishing in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Basement Finishing</p></a><p>Gain extra living space in your home with a custom-designed finished basement.</p></div> </div>'
},
{
    sName:'Basement Waterproofing',
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/basement-waterproofing.html" title="Basement Waterproofing in [territory], [major cities 3]" alt="Basement Waterproofing in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Basement Waterproofing</p></a><p>If your basement is wet, cracked, or smells musty – we can help.</p></div> </div>'
},
{
    sName:"Crawl Space Repair",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/crawl-space-repair.html" title="Crawl Space Repair in [territory], [major cities 3]" alt="Crawl Space Repair in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Crawl Space</p></a><p>Learn why more homeowners choose our patented CleanSpace system.</p></div> </div>'
},
{
    sName:"Decks",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/decks-patios.html" title="Decks in [territory], [major cities 3]" alt="Decks in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Decks</p></a><p>We can restore your old wood deck or build a brand new one with quality materials.</p></div> </div>'
},
{
    sName:"Fire Damage Restoration",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/disaster-restoration/fire-damage.html" title="Fire Damage Restoration in [territory], [major cities 3]" alt="Fire Damage Restoration in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Fire Damage Restoration</p></a><p>After a fire, we can repair water, smoke and soot damage and restore your property.</p></div> </div>'
},
{
    sName:"Flood Damage",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/disaster-restoration/water-damage/flooded-basement.html" title="Flood Damage in [territory], [major cities 3]" alt="Flood Damage in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Flood Damage</p></a><p>We have the expertise and equipment to handle any storm and flood damage job.</p></div> </div>'
},
{
    sName:"Gutters",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/gutters.html" title="Gutters in [territory], [major cities 3]" alt="Gutters in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Gutters</p></a><p>If you need new gutters or leaf protection, we offer custom solutions and installation.</p></div> </div>'
},
{
    sName:"Insulation",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/insulation.html" title="Insulation in [territory], [major cities 3]" alt="Insulation in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Insulation</p></a><p>We offer a variety of insulation options that can make a difference in your home\'s comfort.</p></div> </div>'
},
{
    sName:"Mold Removal",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/mold-removal.html" title="Mold Removal in [territory], [major cities 3]" alt="Mold Removal in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Mold Removal</p></a><p>We use advanced mold removal products and techniques to protect your family and home.</p></div> </div>'
},
{
    sName:"Pest Control",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/pest-control.html" title="Pest Control in [territory], [major cities 3]" alt="Pest Control in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Pest Control</p></a><p>We have the products and expertise to rid your home of unwanted pests and insects.</p></div> </div>'
},
{
    sName:"Roofing",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/roof-repair.html" title="Roofing in [territory], [major cities 3]" alt="Roofing in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Roofing</p></a><p>Keep your home protected year round with our quality roofing systems and services.</p></div> </div>'
},
{
    sName:"Roof Repair",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/roof-repair.html" title="Roof Repair in [territory], [major cities 3]" alt="Roof Repair in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Roof Repair</p></a><p>We fix roof leaks and roofing problems with prompt, expert service and quality products.</p></div> </div>'
},
{
    sName:"Roof Replacement",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/roof-replacement.html" title="Roof Replacement in [territory], [major cities 3]" alt="Roof Replacement in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Roof Replacement</p></a><p>When it\'s time for a new roof, we provide quality products and worry-free installation.</p></div> </div>'
},
{
    sName:"Remodeling",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/remodeling.html" title="Remodeling in [territory], [major cities 3]" alt="Remodeling in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Remodeling</p></a><p>Turn your home remodeling ideas into a reality with our expert design-build services.</p></div> </div>'
},
{
    sName:"Replacement Windows",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/windows-doors/replacement-windows.html" title="Replacement Windows in [territory], [major cities 3]" alt="Replacement Windows in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Replacement Windows</p></a><p>Improve your home\'s comfort and curb appeal with beautiful, energy-efficient windows.</p></div> </div>'
},
{
    sName:"Siding",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/siding.html" title="Siding in [territory], [major cities 3]" alt="Siding in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Siding</p></a><p>Upgrade your home\'s exterior with our durable siding products and professional installation.</p></div> </div>'
},
{
    sName:"Sinkhole Repair",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/sinkhole-repair.html" title="Sinkhole Repair in [territory], [major cities 3]" alt="Sinkhole Repair in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Sinkhole Repair</p></a><p>We can stabilize your foundation or slab to help prevent sinkhole damage.</p></div> </div>'
},
{
    sName:"Sunrooms",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/sunrooms.html" title="Sunrooms in [territory], [major cities 3]" alt="Sunrooms in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Sunrooms</p></a><p>Enjoy your outdoor living space in any weather with a custom sunroom addition.</p></div> </div>'
},
{
    sName:"Wind Damage Restoration",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/disaster-restoration/water-damage.html" title="Wind Damage Restoration in [territory], [major cities 3]" alt="Wind Damage Restoration in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Wind Damage Restoration</p></a><p>When strong winds cause damage to your home or property, trust our experts for fast response.</p></div> </div>'
},
{
    sName:"Windows & Doors",
    sFile:'<div class="small-6 medium-3 columns"> <div class="service-item"><a href="/windows-doors.html" title="Windows &amp; Doors in [territory], [major cities 3]" alt="Windows &amp; Doors in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><p class="service-title">Windows &amp; Doors</p></a><p>We install energy-efficient replacement windows and doors for every budget.</p></div> </div>'
}
];

// store HTML of Matches
 var serviceMark = [];
// //Loop through services to see if we have a match with what the user checked.
for(var i = 0; i < list.length; i++) {
	 	for (var j = 0; j < servicesList.length; j++) {
	        if (list[i].sName == servicesList[j]) {
				serviceMark.push(list[i].sFile);
	        }
	    }
}

//Make Sure Service Data Is Correct
var servicesforReal = serviceMark.join("");
	
	
 // Check to see if user has inputed a city to hardcode if not set the token
 if (req.body.city1 == '')
 {
    var cityBlock = '[[city_scroll:100]]';
    //Lets get a file and store it in variable
    var cityList = fs.readFileSync('./template/partials/full-city-block.css', 'utf8');
 }
    else
{
// lets make some list items from inputed cities
var cityBlock = '<div class="city_scroll_list_content"><ul class="city_scroll_list"><li>' + req.body.city1 + '</li><li>' + req.body.city2 + '</li>  <li>' + req.body.city3 + '</li><li>' + req.body.city4 + '</li><li>' + req.body.city5 + '</li><li>'+ req.body.city6 + '</li></ul><span class="city_scroll_list_local_phone">Our Locations:<br>[[display_addresses_phone]]</span></div><div class="city_scroll_list_footer"><p class="more-assets"><a href="/service-area.html">More Cities</a></p></div>';

//Lets get a file and store it in variable
var cityList = fs.readFileSync('./template/partials/6-city-block.css', 'utf8');
	
	
}	
	


//store our template file
var compiled = ejs.compile(fs.readFileSync('./template/index.ejs', 'utf8'));

//Fill out our templates
var html = compiled({
	 	   favicon: req.body.favicon,
	     logo: req.body.logo,

	     credImg1: req.body.firstcred,
	     credImg2: req.body.secondcred,
	     credImg3: req.body.thirdcred,
	     credImg4: req.body.fourthcred,

	     mainMessageImage: req.body.mmImage,
	     mainMessageText: req.body.mmText,
	     mainMessageSubtext: req.body.mmSubText,

	     whyChooseOne: req.body.why1,
	     whyChooseTwo: req.body.why2,
	     whyChooseThree: req.body.why3,
	     whyChooseFour: req.body.why4,
	
	     cityBlock: cityBlock,
	     fCity: cityList,

	     calloutImgOne: req.body.call1,
	     calloutLinkOne: req.body.call1link,
	     calloutImgTwo: req.body.call2,
	     calloutLinkTwo: req.body.call2link,
	     calloutImgThree: req.body.call3,
	     calloutLinkThree: req.body.call3link,

	     services:  servicesforReal


});

// Compile our EJS into a HTML file
fs.writeFileSync("borders.html", html);


//Lets play with our CSS File

var compiledCSS = ejs.compile(fs.readFileSync('./template/template.css', 'utf8'));
var css = compiledCSS({
	logo: req.body.logo,
	mainMessageImage: req.body.mainMessageImage,
	whyChooseImage: req.body.whyChooseImage,
	primaryDarkColor: req.body.primaryDarkColor,
	primaryBrightColor: req.body.primaryBrightColor
});

fs.writeFileSync("template.css", css);

// Send user to a new file where they can grab there goodies
res.sendFile(__dirname + '/done.html');


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
