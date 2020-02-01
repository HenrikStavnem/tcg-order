var	loggedInUserId = -1,
	tableFilter = 0,
	debug = false;

// INIT
$(function() {
	createTable();

	createMenu();

	getOrders();
});
