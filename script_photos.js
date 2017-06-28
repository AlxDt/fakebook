// Ensure synchronization
$.ajaxSetup({async:false});

// Script proper
$(document).ready(function() {
	// Content
	var posts = [];
	var comments = [];
	var albums = [];
	var photos = [];
	var todos = [];
	var users = [];
	
	// Photos displayed
	var numPhotos = 14;
	
	// Last photos displayed
	var lastPhotos = 0;
	
	// Photos per grid
	var rowNum = 7;
	
	// Load all content
	$.get("https://jsonplaceholder.typicode.com/posts", function(response) {	
		posts = response;
	});
	
	$.get("https://jsonplaceholder.typicode.com/comments", function(response) {
		comments = response;
	});
	
	$.get("https://jsonplaceholder.typicode.com/albums", function(response) {
		albums = response;
	});
	
	$.get("https://jsonplaceholder.typicode.com/photos", function(response) {
		photos = response;
	});
	
	$.get("https://jsonplaceholder.typicode.com/todos", function(response) {
		todos = response;
	});
	
	$.get("https://jsonplaceholder.typicode.com/users", function(response) {
		users = response;
	});
	
	// Generate photos
	lastPhotos = generatePhotos(numPhotos, lastPhotos, rowNum, photos);
	
	// Handler for see more button
	$("#see-more").click(function () {
		lastPhotos = generatePhotos(numPhotos, lastPhotos, rowNum, photos);
	});
	
	// Handler for search link
	$("#go").click(function (e) {
		e.preventDefault();
		
		var val = $("#search").val();
		
		if (val != "") {
			var ip = $("#go").attr("href") + "?q=" + val;
			
			location.href = ip;
		}
	});
});

function generatePhotos(numPhotos, lastPhotos, rowNum, photos) {
	var i = lastPhotos;
	var j = 0;
	
	if (i >= photos.length) {
		alert("No more photos!");
	}
	
	for (; j < numPhotos && i < photos.length; i++) {
		item = photos[i];

		if (i % rowNum == 0) {
			$("#grid").append("<tr id = \"row-" + Math.floor(i / rowNum) + "\"></tr>\n");
		}
		
		$("#row-" + Math.floor(i / rowNum)).append("<td><a href = \"img.html?img=" + item["id"] + "\"><img src = \"" + item["thumbnailUrl"] + "\ alt = \"o\" /></a></td>\n");
		
		j++;
	}
	
	return i;
}
