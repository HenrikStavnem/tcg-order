function createMenu() {
	var html = `
		<div id='menu-content-left'><div id='filter-selector'></div></div>
		<div id='menu-content-right'></div>
	`;

	$('#menu').html(html);

	createMenuLoginField(); // TODO: Move?

	createFilterSelector();
}

function createMenuLoginField() {	
	const html = `<button onClick="createDialog('login')">Login</button>`;
	$('#menu-content-right').html(html);
}

function createMenuLogoutField() {
	var userName,
		userImg,
		greeting = createGreeting();

	users.forEach(function (user) {
	if (user.id === loggedInUserId) {
		userName = user.name;
		userImg = user.image;
	}
});

var html = `
	<img src='res/user-images/${userImg}' alt='' class='menu-user-image' /> <span class='menu-greeting'>${greeting} ${userName}</span> <button id='logout-btn'>Logout</button>
`;

$('#menu-content-right').html(html);

$("#logout-btn" ).on("click", function() {
	logout();
});
}

function createGreeting() {
return "Greetings,";
}
