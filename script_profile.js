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
	
	// Posts displayed
	var numPosts = 3;
	
	// Last posts displayed
	var lastPosts = 0;
	
	// Todos displayed
	var numTodos = 3;
	
	// Last todos displayed
	var lastTodos = 0;
	
	// Albums displayed
	var numAlbums = 3;
	
	// Last albums displayed
	var lastAlbums = 0;
	
	// Photos displayed
	var numPhotos = 7;
	
	// Last photos displayed
	var lastPhotos = [0, 0];
	
	// Photos per row
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
	
	// Scan URL for user
	var query = location.search;
	var user = decode(query, users);
	
	// Fill in info details
	$("#id").html("<b>User ID:</b> " + user["id"]);
	$("#name").html("<b>Name:</b> " + user["name"]);
	$("#username").html("<b>Username:</b> " + user["username"]);
	$("#email").html("<b>Email:</b> " + user["email"]);
	
	$("#address").html("<b>Street:</b> " + user["address"]["street"] + "<br />"
						+ "<b>Suite:</b> " + user["address"]["suite"] + "<br />"
						+ "<b>City:</b> " + user["address"]["city"] + "<br />"
						+ "<b>Zipcode:</b> " + user["address"]["zipcode"] + "<br />");
						
	$("#phone").html("<b>Phone:</b> " + user["phone"]);
	$("#website").html("<b>Website:</b> " + user["website"]);
	
	$("#company").html("<b>Name:</b> " + user["company"]["name"] + "<br />"
						+ "<b>Catch phrase:</b> " + user["company"]["catchPhrase"] + "<br />"
						+ "<b>BS:</b> " + user["company"]["bs"] + "<br />");
	
	// Generate posts
	// Recent first!
	posts.reverse();
	lastPosts = generatePosts(numPosts, lastPosts, user["id"], users, posts, comments);
	
	// Generate todos
	lastTodos = generateTodos(numTodos, lastTodos, user["id"], todos);
	
	// Generate albums
	lastAlbums = generateAlbums(numAlbums, lastAlbums, numPhotos, lastPhotos, rowNum, user["id"], albums, photos);
	
	// Handler for view location button
	$("#location").click(function () {
		window.open("https://maps.google.com/?q=" + user["address"]["geo"]["lat"] + "," + user["address"]["geo"]["lng"]);
	});
	
	// Handler for see more todos button
	$("#see-more-todos").click(function () {
		lastTodos = generateTodos(numTodos, lastTodos, user["id"], todos);
	});
	
	// Handler for see more albums button
	$("#see-more-albums").click(function () {
		lastAlbums = generateAlbums(numAlbums, lastAlbums, numPhotos, lastPhotos, rowNum, user["id"], albums, photos);
	});
	
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

function generatePosts(numPosts, lastPosts, userId, users, posts, comments) {
	var i = lastPosts;
	var j = 0;
	
	if (i >= posts.length) {
		alert("No more posts!");
	}
	
	for (; j < numPosts && i < posts.length; i++) {
		item = posts[i];

		if (item["userId"] == userId) {
			$(".posts").append("<div id = \"post-" + item["id"] + "\"></div>\n");
	
			var userHeading = "<span><u>#" + item["id"] + " <b>" + selectItemWithProperty(users, item["userId"], "username") + "</b> [" + item["userId"] + "]" + "</u></span>\n";
			var titleHeading = "<h1>" + item["title"] + "</h1>\n";
			var bodyHeading = "<p> " + item["body"].substring(0, 30) + "..." + "</p>\n";
	
			$("#post-" + item["id"]).html(userHeading + titleHeading + bodyHeading);
			$("#post-" + item["id"]).append("<div class = \"comments-" + item["id"] + "\"></div>\n");
			
			generateComments(item, comments);
			
			$("#post-" + item["id"]).append("<hr />\n");
			
			j++;
		}
	}
	
	return i;
}

function generateComments(post, comments) {
	for (var i = 0; i < comments.length; i++) {
		item = comments[i];

		if (item["postId"] == post["id"]) {
			$(".comments-" + item["postId"]).append("<div id = \"comment-" + item["id"] + "\"></div>\n");
	
			// TODO: change to <a> with href
			var nameHeading = "<span>#" + item["id"] + " <b>" + item["name"] + "</b> [" + item["email"] + "]" + "</span>\n";
			var bodyHeading = "<p> " + item["body"] + "</p>\n";
	
			$(".comments-" + item["postId"] + "> #comment-" + item["id"]).append(nameHeading);
			$(".comments-" + item["postId"] + "> #comment-" + item["id"]).append(bodyHeading);
		}
	}
	
	return i;
}

function generateTodos(numTodos, lastTodos, userId, todos) {
	var i = lastTodos;
	var j = 0;
	
	if (i >= todos.length) {
		alert("No more todos!");
	}
	
	for (; j < numTodos && i < todos.length; i++) {
		item = todos[i];

		if (item["userId"] == userId) {
			$(".todos").append("<div id = \"todo-" + item["id"] + "\"></div>\n");
	
			var titleHeading = "<span><u>#" + item["id"] + " <b>" + item["title"] + "</b> [" + item["userId"] + "]" + "</u></span>\n";
			var bodyHeading = "<p>Done? <b id =  \"" + item["completed"] + "\">" + item["completed"] + "</b></p>\n";

			$("#todo-" + item["id"]).html(titleHeading + bodyHeading);
			
			j++;
		}
	}
	
	return i;
}

function generateAlbums(numAlbums, lastAlbums, numPhotos, lastPhotos, rowNum, userId, albums, photos) {
	var i = lastAlbums;
	var j = 0;
	
	if (i >= albums.length) {
		alert("No more albums!");
	}
	
	for (; j < numAlbums && i < albums.length; i++) {
		item = albums[i];

		if (item["userId"] == userId) {
			$(".albums").append("<div id = \"album-" + item["id"] + "\"><h1 id = \"title\">" + item["title"] + "</h1><table id = \"grid-" + item["id"] + "\"></table></div>\n");
			
			generatePhotos(numPhotos, lastPhotos, rowNum, photos, item["id"]);
			
			j++;
		}
	}
	
	return i;
}

function generatePhotos(numPhotos, lastPhotos, rowNum, photos, id) {
	var i = lastPhotos[0];
	var j = lastPhotos[1];
	var k = 0;
	
	if (i >= photos.length) {
		alert("No more photos in this album!");
	}
	
	for (; k < numPhotos && i < photos.length; i++) {
		item = photos[i];

		if (item["albumId"] == id) {
			if (j % rowNum == 0) {
				$("#grid-" + id).append("<tr id = \"row-" + Math.floor(j / rowNum) + "\"></tr>\n");
			}
			
			$("#grid-" + id + " #row-" + Math.floor(j / rowNum)).append("<td><a href = \"img.html?img=" + item["id"] + "\"><img src = \"" + item["thumbnailUrl"] + "\ alt = \"o\" /></a></td>\n");
			
			j++;
			k++;
		}
	}
	
	return [i, j];
}

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

function decode(query, users) {
	var id = query.split("=")[1];
	
	return find(id, users);
}

function find(id, users) {
	for (var i = 0; i < users.length; i++) {
		var item = users[i];
		
		if (item["id"] == id) {
			return item;
		}
	}
	
	return null;
}
