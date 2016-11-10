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
			$('form').on('submit',this)
		},
		listeners: function(){

			$('#recup1').on('click',this.recupMarkdown.bind(this));
			$('#recup2').on('click',this.recupAlice.bind(this));
			$('#recup3').on('click',this.recupJson.bind(this));
			$('#recup4').on('click',this.recupMenu.bind(this));
			$('#buttonSave').on('click',this.recupInput.bind(this));

		},
		recupJson: function(){

			$.get('http://localhost:2305/menu.json',function(data3){
				var menus = data3.menu;
				for(var i = 0; i < menus.length; i++){
					$('#json').append('<li><a href ="http://localhost:2305/create/'+menus[i].path+'">'+menus[i].title+'</li>');
				}
				$('#markdown').hide();
				$('#alice').hide();
				$('#menu').hide();
				$('#json').show();
			});
		},
		recupMarkdown: function(){

			$.get('http://localhost:2305/example.md',function(data1){
				app.html = app.converter.makeHtml(data1);
				$('#markdown').html(app.html);
				$('#alice').hide();
				$('#json').hide();
				$('#menu').hide();
				$('#markdown').show();
			});
		},	
		recupAlice: function(){

			$.get('http://localhost:2305/alice.md',function(data2){
				app.html = app.converter.makeHtml(data2);
				$('#alice').html(app.html);
				$('#markdown').hide();
				$('#json').hide();
				$('#menu').hide();
				$('#alice').show();
			});
		},
		recupMenu: function(){
			
			$('#markdown').hide();
			$('#json').hide();
			$('#alice').hide();
			$('#menu').show();
		},
		recupInput: function(event){

			event.preventDefault();

			var inputT = $('#inputTitle').val();

			var inputA = $('#inputTextarea').val();

			this.submitForm({title:inputT, content:inputA});

		},

		submitForm : function(data){

			$.ajax({

				type :'POST',
				url : $("form").attr("action"),
				data : data,
				success : this.success
			});
		},
		success: function() {
			alert('Gg rumble'); 
		}


	}
	app.init();
});