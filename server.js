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


//Items Checked 
var servicesList = req.body.services;

// // all of our services data 
// var list = [{
//     sName:"Basement Finishing",
//     sFile: "<div class=\"small-12 medium-3 columns\"> <div class=\"service-item\"><a href=\"/basement-finishing.html\" title=\"Basement Finishing in [territory], [major cities 3]\" alt=\"Basement Finishing in [territory], [major cities 3]\"><img src=\"http://placehold.it/150x150\"><h2>Basement Finishing</h2></a><p>Gain extra living space in your home with a custom-designed finished basement.</p></div> </div>"
// },
// {
//     sName:"Roofing",
//     sFile:"Thomas"
// },
// {
//     sName:"B",
//     sFile:"James"
// }];




// //Loop through services to see if we have a match
// for(var i = 0; i < list.length; i++) { 

// 	console.log(list[i]);

//  for (var j = 0; j < servicesList.length; j++) {
//         if (list[i] == servicesList[j]) {
          
//         }
//     }


// }

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
	     
	     services: servicesList,

	     facebook: req.body.facebook,
	     twitter: req.body.twitter,
	     google: req.body.google,
	     linkedin: req.body.linkedin,
	     youtube: req.body.youtube


});
 
// Compile our EJS into a HTML file
fs.writeFileSync("borders.html", html);

	// Send user to a new file where they can grab there goodies 
	res.sendFile(__dirname + '/done.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});