var 	connection = "src/php/db.php";

function getOrders() {
   $.post( connection, {
		call: 'getOrders'
	} )
    .done(
		function( data ) {
         updateTableCellsData(data);
		}
	);
}

function saveOrder() {
   var data = getCellValuesForUser(loggedInUserId);

   $.post( connection, {
		call: 'saveOrders',
      data: data
	} )
    .done(
		function( data ) {
            if (debug)
                console.log(data);

         getOrders();
		}
	);
}

function login(event /*username, password*/) {
	const username = document.querySelector('#login-username-input').value,
		password = document.querySelector('#login-password-input').value;

	if (!username || !password) {
		fireMissingCredentialsFieldsEvent();
		return;
	}

	$.post( connection, {
		call: 'login',
		username: username,
		password: password
	} )
	.done(
		function( data ) {
			console.log(data);
			switch (data) {
				case '200': doLogin();								break;
				case '400': createDialog('bad-request');			break;
				//case '401': createDialog('auth-failed');			break;
				case '401': fireAuthFailedEvent();					break;
				default: alert("Unknown error");					break;
			}
		}
	);
}

function fireAuthFailedEvent() {
	$('.dialog').trigger('authFailed');
}

function fireMissingCredentialsFieldsEvent() {
	$('.dialog').trigger('missingCredentialFields');
}

function doLogin() {
	$.post( connection, {
		call: 'getUserId'
	} )
	.done(
		function( data ) {
			console.log("UserID: " + data);
			if (data !== '401') {
			loggedInUserId = parseInt(data);
			getOrders();
			createMenuLogoutField();
			closeModal();
		}
		else {
			alert("Cannot get user id; User not logged in");
			}
		}
	);
}

function logout(username, password) {
   $.post( connection, {
		call: 'logout'
	} )
    .done(
		function( data ) {
         console.log("Logged out");
         loggedInUserId = -1;
         getOrders();
         createMenuLoginField();
		}
	);
}
