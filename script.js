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
	var numPosts = 10;
	
	// Last posts displayed
	var lastPosts = 0;
	
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
	
	// Generate posts
	// Recent first!
	posts.reverse();
	lastPosts = generatePosts(numPosts, lastPosts, users, posts, comments);
	
	// Handler for see more button
	$("#see-more").click(function () {
		lastPosts = generatePosts(numPosts, lastPosts, users, posts, comments);
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

function generatePosts(numPosts, lastPosts, users, posts, comments) {
	var i = lastPosts;
	var j = 0;
	
	if (i >= posts.length) {
		alert("No more posts!");
	}
	
	for (; j < numPosts && i < posts.length; i++) {
		item = posts[i];
		
		$(".posts").append("<div id = \"post-" + item["id"] + "\"></div>\n");

		var userHeading = "<span><a id = \"" + item["userId"] + "\" href = profile.html?user=" + item["userId"] + "><u>#" + item["id"] + " <b>" + selectItemWithProperty(users, item["userId"], "username") + "</b> [" + item["userId"] + "]" + "</u></a></span>\n";
		var titleHeading = "<h1>" + item["title"] + "</h1>\n";
		var bodyHeading = "<p> " + item["body"] + "</p>\n";

		$("#post-" + item["id"]).html(userHeading + titleHeading + bodyHeading);
		$("#post-" + item["id"]).append("<div class = \"comments-" + item["id"] + "\"></div>\n");
		
		generateComments(item, comments);
		
		$("#post-" + item["id"]).append("<hr />\n");
		
		j++;
	}
	
	return i;
}

function generateComments(post, comments) {
	for (var i = 0; i < comments.length; i++) {
		var item = comments[i];

		if (item["postId"] == post["id"]) {
			$(".comments-" + item["postId"]).append("<div id = \"comment-" + item["id"] + "\"></div>\n");

			var nameHeading = "<span>#" + item["id"] + " <b>" + item["name"] + "</b> [" + item["email"] + "]" + "</span>\n";
			var bodyHeading = "<p> " + item["body"] + "</p>\n";
	
			$(".comments-" + item["postId"] + "> #comment-" + item["id"]).append(nameHeading);
			$(".comments-" + item["postId"] + "> #comment-" + item["id"]).append(bodyHeading);
		}
	}
	
	return i;
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
