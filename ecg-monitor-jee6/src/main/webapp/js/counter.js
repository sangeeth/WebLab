var count = 0;
var app = {
   url: '/jayweb/counter',
   initialize: function() {
       app.listen();
   },
   listen: function() {
	  $('body').append('<iframe style=\"display: none\" src=\"' + app.url + '\"></iframe>'); 
      //$('#comet-frame').attr('src',  app.url);
      count ++;
      console.log("Listening now at ", app.url);
   },
   start: function() {

	   $.ajax({
		   type: "POST",
		   url: "counter",
		   data: "action=start"
		 }).done(function( msg ) {
		   alert( "Response: " + msg );
		 });
   },
   stop: function() {
	   $.ajax({
		   type: "POST",
		   url: "counter",
		   data: "action=stop"
		 }).done(function( msg ) {
		   alert( "Response: " + msg );
		 });
   },
   update: function(data) {    
       $('#count').text(data.message);
   }
};

$(window).load(function () {
	app.initialize();
	
	$("#start-button").click(function(){
		app.start();
	});
	
	$("#stop-button").click(function(){
		app.stop();
	});	
});
