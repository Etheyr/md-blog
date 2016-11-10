var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var slug = require('slug');
var jsesc = require('jsesc');


app.use(bodyParser());

app.post('/create', function(req,res){
	var post = req.body;
	var escapedPath = jsesc(slug(post.title))+ '.md';
	var path =__dirname + '/public/create/' + escapedPath;
	var menuPath =__dirname +'/public/menu.json';

	fs.writeFile(path, post.content,function(err){
		if(err){
			console.log(err)
		}
	});

	fs.readFile(menuPath, 'utf8',function(err, data){
		console.log(data);
		var content = JSON.parse(data);
		content.menu.push({path:escapedPath ,title: post.title});
		console.log(content);
		var jsonn = JSON.stringify(content);

		fs.writeFile(menuPath, jsonn,function(err){
			if(err){
				console.log(err);
			}
		});
	});


	res.json({ message:'save',status:'ok'});
	res.send('send');
});
app.use(express.static(__dirname +'/public'));
app.listen(2305, function () {
	console.log('Done ! server started');
});
