$(document).ready(() => {
	const socket = io.connect();

	let currentUser;

	$("#create-user-btn").click((e) => {
		e.preventDefault();

		let username = $("#username-input").val();
		if (username.length > 0) {
			socket.emit("new user", username);

			currentUser = $("#username-input").val();
			$(".username-form").remove();
			$(".main-container").css("display", "flex");
		}
	});

	$("#send-chat-btn").click((e) => {
		e.preventDefault();
		// Get the message text value
		let message = $("#chat-input").val();
		// Make sure it's not empty
		if (message.length > 0) {
			// Emit the message with the current user to the server
			socket.emit("new message", {
				sender: currentUser,
				message: message,
			});
			$("#chat-input").val("");
		}
	});

	socket.on("new user", (username) => {
		console.log(`${username} joined the chat.`);
		$(".users-online").append(`<div class="user-online">${username}</div>`);
	});

	socket.on("new message", (data) => {
		$(".message-container").append(`
        <div class="message">
          <p class="message-user">${data.sender}: ${data.message}</p>
        </div>
      `);
	});
});
