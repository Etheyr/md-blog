$(document).ready(function(){

	"use strict";

	var app = {
		converter :new showdown.Converter(),
		html :null,
		url1 :'http://192 168 1.40:1337/example.md',
		url2 : 'http://192.168.1.40:1337/alice.md',
		url3 : 'http://192.168.1.40:1337/menu.json',

		init:function(){

			this.listeners();
		},
		recupJson: function(){

			$.get('http://192.168.1.40:1337/menu.json',function(data3){
				var menus = data3.menu;
				for(var i = 0; i < menus.length; i++){
					$('#json').append('<li><a href ="http://192.168.1.40:1337'+menus[i].path+'">'+menus[i].title+'</li>');
				}
			
			});
		},
		listeners: function(){

			$('#recup1').on('click',this.recupMarkdown(this));
			$('#recup2').on('click',this.recupAlice(this));
			$('#recup3').on('click',this.recupJson(this));

		},
		recupMarkdown: function(){

			$.get('http://192.168.1.40:1337/example.md',function(data1){
				app.html = app.converter.makeHtml(data1);
				$('#markdown').html(app.html);
			});
		},	
		recupAlice: function(){

			$.get('http://192.168.1.40:1337/alice.md',function(data2){
				app.html = app.converter.makeHtml(data2);
				$('#alice').html(app.html);
			});
		},


	};
	app.init();
});