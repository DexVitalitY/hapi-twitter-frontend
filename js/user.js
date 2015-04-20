$(document).ready(function() {

	function getAll() {
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3000/tweets',
			dataType: 'json',
			success: function(response){
				for (var i = 0; i < response.length; i++) {
					$('#stream-container').append('<div class="stream-item"><div class="message">' + response[i].message + '</div><div class ="id">' + response[i]._id + '</div></div>')
				}
				console.log(response);
			}
		})
	}

getAll();

	$('#postTweet').click(function(event){
		event.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/tweets',
			data: { 
				tweet: {
					message:  $('#tweet-content-input').val()			
				}
			},
			dataType: 'json',
			xhrFields: {
    	withCredentials: true
  		},
			success: function(response){
				console.log("POSTED!");
			location.reload();
			}
		});
	})

	$('#deleteTweet').click(function(event) {
		event.preventDefault();
		$.ajax({ 
			type: 'DELETE',
			url: 'http://localhost:3000/tweets/' + $('#tweet-delete').val(),
			dataType: 'json',
			xhrFields: {
    	withCredentials: true
  		},
				success: function(response) {
					console.log('DELETED!');
					location.reload();
				}
		})
	})

	$('#searchUser').click(function(event){
		event.preventDefault();
		$('#stream-container').text('');
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3000/user/' + $('#search-user').val() + '/tweets',
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
				success: function(response) {
					for (var i = 0; i < response.length; i++) {
						$('#stream-container').append('<div class="stream-item"><div class="message">' + response[i].message + '</div><div class ="id">' + response[i]._id + '</div></div>')
					}
					console.log(response);
					// location.reload();
				}
		})
	})

	$('#searchID').click(function(event) {
		event.preventDefault();
		$('#stream-container').text('');
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3000/tweets/' + $('#search-tweet').val(),
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
				success: function(response) {
						$('#stream-container').append('<div class="stream-item"><div class="message">' + response.message + '</div><div class ="id">' + response._id + '</div></div>')
					console.log(response);
					// location.reload();
				}
		})
	})

});