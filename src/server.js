"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const nodeauth = require("nodeauth");

const Bib = require("./bib.js")
const BibError = require("./BibError.js")

const options = {
		    services: ["WorldCatMetadataAPI"]
		};

const user = new nodeauth.User(config['institution'], config['principalID'], config['principalIDNS']);
const wskey = new nodeauth.Wskey(config['wskey'], config['secret'], options);

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', 'views'); 
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let autheMiddleware = express.Router()

const context = this;

function getAccessToken (req, res, next){
	if (app.get('accessToken') && app.get('accessToken').getAccessTokenString() && !app.get('accessToken').isExpired()){
		next()
	}else {
		// request an Access Token
		wskey.getAccessTokenWithClientCredentials(config['institution'], config['institution'], user)
	        .then(function (accessToken) {
	        	app.set('accessToken', accessToken);
	            next();
	        })
	        .catch(function (err) {
	            //catch the error
	        	let error = new BibError(err);
	        	res.render('display-error', {error: error.getCode(), error_message: error.getMessage(), error_detail: error.getDetail(), oclcnumber: null});
	        })
	}
}

autheMiddleware.post('/bib', function (req, res, next) {
	getAccessToken(req, res, next);
});

autheMiddleware.get('/bib/:id', function (req, res, next) {
	getAccessToken(req, res, next);
});

app.use('/', autheMiddleware);
 
app.get('/', (req, res) => {   
   var action = "bib";
   
   res.render('index', {action: action});

   
});

app.post('/bib', (req, res, next) => {
	var id = req.body.oclcnumber;
	Bib.find(id, app.get('accessToken').getAccessTokenString())
	.then(bib => {
		bib.getRecordAsString()
		.then(function (output){
			res.render('display-bib', {bib: bib, recordAsString: output});
		})
		.catch(function (err){
			res.render('display-error', {error: err});
		})
		
	})
	.catch (error => {
		res.render('display-error', {error: error.getCode(), error_message: error.getMessage(), error_detail: error.getDetail(), oclcnumber: id});
	})		
});

app.get('/bib/:id', (req, res, next) => {
	var id = req.params['id'];
	
	Bib.find(id, app.get('accessToken').getAccessTokenString())
		.then(bib => {
			bib.getRecordAsString()
			.then(function (output){
				res.render('display-bib', {bib: bib, recordAsString: output});
			})
			.catch(function (err){
				res.render('display-error', {error: err, error_message: "something happened with the transform", error_detail: "", oclcnumber: id});
			})
		})
		.catch (error => {
			res.render('display-error', {error: error.getCode(), error_message: error.getMessage(), error_detail: error.getDetail(), oclcnumber: id});
		})
});

//Server
module.exports = app;