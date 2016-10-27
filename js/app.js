$(document).ready(function(){

	"use strict";

	var app = {

		converter : new showdown.Converter(),
		html : null,
		url1 :'http://localhost:2305/example.md',
		url2 : 'http://localhost:2305/alice.md',
		url3 : 'http://localhost:2305/menu.json',

		init:function(){

			this.listeners();
		},
		recupJson: function(){

			$.get('http://localhost:2305/menu.json',function(data3){
				var menus = data3.menu;
				for(var i = 0; i < menus.length; i++){
					$('#json').append('<li><a href ="http://localhost:2305'+menus[i].path+'">'+menus[i].title+'</li>');
				}

			});
		},
		listeners: function(){

			$('#recup1').on('click',this.recupMarkdown(this));
			$('#recup2').on('click',this.recupAlice(this));
			$('#recup3').on('click',this.recupJson(this));

		},
		recupMarkdown: function(){

			$.get('http://localhost:2305/example.md',function(data1){
				app.html = app.converter.makeHtml(data1);
				$('#markdown').html(app.html);
			});
		},	
		recupAlice: function(){

			$.get('http://localhost:2305/alice.md',function(data2){
				app.html = app.converter.makeHtml(data2);
				$('#alice').html(app.html);
			});
		},
	};
	app.init();
});