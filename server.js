var express = require('express');  
var app = express();
var fs = require('fs');
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
    sFile: "<div class=\"small-12 medium-3 columns\"> <div class=\"service-item\"><a href=\"/basement-finishing.html\" title=\"Basement Finishing in [territory], [major cities 3]\" alt=\"Basement Finishing in [territory], [major cities 3]\"><img src=\"http://placehold.it/150x150\"><h2>Basement Finishing</h2></a><p>Gain extra living space in your home with a custom-designed finished basement.</p></div> </div>"
},
{
    sName:'Basement Waterproofing',
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/basement-waterproofing.html" title="Basement Waterproofing in [territory], [major cities 3]" alt="Basement Waterproofing in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Basement Waterproofing</h2></a><p>If your basement is wet, cracked, or smells musty – we can help.</p></div> </div>'
},
{
    sName:"Crawl Space Repair",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/crawl-space-repair.html" title="Crawl Space Repair in [territory], [major cities 3]" alt="Crawl Space Repair in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Crawl Space</h2></a><p>Learn why more homeowners choose our patented CleanSpace system.</p></div> </div>'
},
{
    sName:"Decks",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/decks-patios.html" title="Decks in [territory], [major cities 3]" alt="Decks in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Decks</h2></a><p>We can restore your old wood deck or build a brand new one with quality materials.</p></div> </div>'
},
{
    sName:"Fire Damage Restoration",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/disaster-restoration/fire-damage.html" title="Fire Damage Restoration in [territory], [major cities 3]" alt="Fire Damage Restoration in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Fire Damage Restoration</h2></a><p>After a fire, we can repair water, smoke and soot damage and restore your property.</p></div> </div>'
},
{
    sName:"Flood Damage",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/disaster-restoration/water-damage/flooded-basement.html" title="Flood Damage in [territory], [major cities 3]" alt="Flood Damage in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Flood Damage</h2></a><p>We have the expertise and equipment to handle any storm and flood damage job.</p></div> </div>'
},
{
    sName:"Gutters",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/gutters.html" title="Gutters in [territory], [major cities 3]" alt="Gutters in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Gutters</h2></a><p>If you need new gutters or leaf protection, we offer custom solutions and installation.</p></div> </div>'
},
{
    sName:"Insulation",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/insulation.html" title="Insulation in [territory], [major cities 3]" alt="Insulation in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Insulation</h2></a><p>We offer a variety of insulation options that can make a difference in your home\'s comfort.</p></div> </div>'
},
{
    sName:"Mold Removal",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/mold-removal.html" title="Mold Removal in [territory], [major cities 3]" alt="Mold Removal in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Mold Removal</h2></a><p>We use advanced mold removal products and techniques to protect your family and home.</p></div> </div>'
},
{
    sName:"Pest Control",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/pest-control.html" title="Pest Control in [territory], [major cities 3]" alt="Pest Control in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Pest Control</h2></a><p>We have the products and expertise to rid your home of unwanted pests and insects.</p></div> </div>'
},
{
    sName:"Roofing",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/roof-repair.html" title="Roofing in [territory], [major cities 3]" alt="Roofing in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Roofing</h2></a><p>Keep your home protected year round with our quality roofing systems and services.</p></div> </div>'
},
{
    sName:"Roof Repair",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/roof-repair.html" title="Roof Repair in [territory], [major cities 3]" alt="Roof Repair in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Roof Repair</h2></a><p>We fix roof leaks and roofing problems with prompt, expert service and quality products.</p></div> </div>'
},
{
    sName:"Roof Replacement",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/roof-replacement.html" title="Roof Replacement in [territory], [major cities 3]" alt="Roof Replacement in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Roof Replacement</h2></a><p>We fix roof leaks and roofing problems with prompt, expert service and quality products.</p></div> </div>'
},
{
    sName:"Remodeling",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/remodeling.html" title="Remodeling in [territory], [major cities 3]" alt="Remodeling in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Remodeling</h2></a><p>Turn your home remodeling ideas into a reality with our expert design-build services.</p></div> </div>'
},
{
    sName:"Replacement Windows",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/windows-doors/replacement-windows.html" title="Replacement Windows in [territory], [major cities 3]" alt="Replacement Windows in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Replacement Windows</h2></a><p>Improve your home\'s comfort and curb appeal with beautiful, energy-efficient windows.</p></div> </div>'
},
{
    sName:"Siding",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/siding.html" title="Siding in [territory], [major cities 3]" alt="Siding in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Siding</h2></a><p>Upgrade your home\'s exterior with our durable siding products and professional installation.</p></div> </div>'
},
{
    sName:"Sinkhole Repair",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/sinkhole-repair.html" title="Sinkhole Repair in [territory], [major cities 3]" alt="Sinkhole Repair in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Sinkhole Repair</h2></a><p>We can stabilize your foundation or slab to help prevent sinkhole damage.</p></div> </div>'
},
{
    sName:"Sunrooms",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/sunrooms.html" title="Sunrooms in [territory], [major cities 3]" alt="Sunrooms in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Sunrooms</h2></a><p>Enjoy your outdoor living space in any weather with a custom sunroom addition.</p></div> </div>'
},
{
    sName:"Wind Damage Restoration",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/disaster-restoration/water-damage.html" title="Wind Damage Restoration in [territory], [major cities 3]" alt="Wind Damage Restoration in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Wind Damage Restoration</h2></a><p>When strong winds cause damage to your home or property, trust our experts for fast response.</p></div> </div>'
},
{
    sName:"Windows & Doors",
    sFile:'<div class="small-12 medium-3 columns"> <div class="service-item"><a href="/windows-doors.html" title="Windows &amp; Doors in [territory], [major cities 3]" alt="Windows &amp; Doors in [territory], [major cities 3]"><img src="http://placehold.it/150x150"><h2>Windows &amp; Doors</h2></a><p>We install energy-efficient replacement windows and doors for every budget.</p></div> </div>'
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

//Make Sure Data Is Correct 
var servicesforReal = serviceMark.join("");

//store our template file
var compiled = ejs.compile(fs.readFileSync('./views/demo.ejs', 'utf8'));
 
//Fill out our templates
var html = compiled({ 
	 	 favicon: req.body.favicon,
	     logo: req.body.logo,
	     serviceArea: req.body.servicearea,

	     credImg1: req.body.firstcred,
	     credImg2: req.body.secondcred,
	     credImg3: req.body.thirdcred,
	     credImg4: req.body.fourthcred,

	     mainMessageImage: req.body.mmImage,
	     mainMessageText: req.body.mmText,
	     mainMessageSubtext: req.body.mmSubText,

	     whyChooseTitle: req.body.whytile,
	     whyChooseOne: req.body.why1,
	     whyChooseTwo: req.body.why2,
	     whyChooseThree: req.body.why3,
	     whyChooseFour: req.body.why4,


	     calloutImgOne: req.body.call1,
	     calloutLinkOne: req.body.call1link,

	     calloutImgTwo: req.body.call2,
	     calloutLinkTwo: req.body.call2link,

	     calloutImgThree: req.body.call3,
	     calloutLinkThree: req.body.call3link,
	     
	     services:  servicesforReal,

	     facebook: req.body.facebook,
	     twitter: req.body.twitter,
	     google: req.body.google,
	     linkedin: req.body.linkedin,
	     youtube: req.body.youtube


});
 
// Compile our EJS into a HTML file
fs.writeFileSync("borders.html", html);


//Lets play with our CSS File 

var compiledCSS = ejs.compile(fs.readFileSync('./views/template.css', 'utf8'));
var css = compiledCSS({ 
	logo: req.body.stickylogo,
	mainMessageImage: req.body.mmimage,
	whyChooseImage: req.body.whyimage,
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
