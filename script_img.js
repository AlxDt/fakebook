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
	
	// Scan URL for image
	var query = location.search;
	var img = decode(query, photos);
	
	// Fill in info details
	$("#uploader").html("Uploaded by <a href = \"profile.html?user=" + selectItemWithProperty(albums, selectItemWithProperty(photos, img["id"], "albumId"), "userId") + "\">"
					+ selectItemWithProperty(users, selectItemWithProperty(albums, selectItemWithProperty(photos, img["id"], "albumId"), "userId"), "name") + "</a>");
	$("#album").html("in album <a href = \"album.html?album=" + img["albumId"] + "\">"
					+ selectItemWithProperty(albums, selectItemWithProperty(photos, img["id"], "albumId"), "title") + "</a>");
	$("#title").html(img["title"]);
	$("#img").append("<img src = \"" + img["url"] + "\" />");
	
	// Handler for go back button
	$("#go-back").click(function () {
		history.go(-1);
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

// Utility functions
function selectItemWithProperty(content, id, requested) {	
	for (var i = 0; i <= content.length; i++) {
		var item = content[i];
		
		if (item["id"] == id) {
			return item[requested]
		};
	}
	
	return null;
}

function decode(query, photos) {
	var id = query.split("=")[1];
	
	return find(id, photos);
}

function find(id, photos) {
	for (var i = 0; i < photos.length; i++) {
		var item = photos[i];
		
		if (item["id"] == id) {
			return item;
		}
	}
	
	return null;
}
