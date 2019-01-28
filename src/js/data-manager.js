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
			console.log(data);

         getOrders();
		}
	);
}

function login(username, password) {
   $.post( connection, {
		call: 'login',
      username: username,
      password: password
	} )
    .done(
		function( data ) {
         console.log(data);
			switch (data) {
            case '200': doLogin();                 break;
            case '400': alert("Bad request");      break;
            case '401': alert("Wrong password");   break;
            default: alert("Unknown error");       break;
         }
		}
	);
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
