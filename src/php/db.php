<?php
	session_start();
	date_default_timezone_set('Europe/Copenhagen');

	$call 	= $_POST['call'];

	include("db-config.php");
	include("login.php");

   $mysqli = new mysqli($GLOBALS["db_server"], $GLOBALS["db_user"], $GLOBALS["db_password"], $GLOBALS["db_name"]);
	$mysqli->set_charset("utf8");

   if (mysqli_connect_errno()) {
       echo "<br />";
       printf("Connect failed: %s\n", mysqli_connect_error());
       exit();
   }

   $mysqli->set_charset("utf8");

   switch($call) {
		case "login"								:	login($mysqli);								break;
		case "logout"								:	logout();										break;

		case "getUserId"							:	getUserId();                    			break;

		case "getOrders"							:	getOrders($mysqli);                    break;
		case "saveOrders"							:	saveOrders($mysqli);                   break;
   }

	function logout() {
		$_SESSION['user_firstname'] = "";
		$_SESSION['user_id'] = null;
		$_SESSION['user_avatar'] = "visitor.png";
		$_SESSION['logged_in'] = false;
	}

	function getUserId() {
		if ($_SESSION['logged_in']) {
			echo $_SESSION['user_id'];
		}
		else {
			echo "401";
		}
	}

	function saveOrders($mysqli) {
		$data = $_POST['data'];

		$errorMessage = "";

		$data = json_decode($data, true);

		if ($data == null) {
			$errorMessage = "Invalid JSON";
		}

		$orderString = "{\"categories\":[{";

		foreach($data as $order) {
			$userId = $order['userId'];
			$categories = $order['categories'];

			foreach($categories as $category) {

				$orderString = $orderString . '\"id\":'.$category['id'].',\"cards\":[';

				$cards = $category['cards'];
				foreach($cards as $card) {
					$orderString = $orderString . '{\"id\":'.$card['id'].',\"qty\":'.$card['qty'].'},';
				}
				$orderString = substr($orderString, 0, -1);
				$orderString = $orderString . "]},{";
			}
		}

		$orderString = substr($orderString, 0, -3);
		$orderString = $orderString . "}]}";

		echo $orderString;

		$stmt = $mysqli->prepare("
			UPDATE
				tcg_orders
			SET
				order_order = '$orderString'
			WHERE
				order_user = $userId
		");

		$stmt->execute();

		if ($errorMessage !== "") {
			echo $errorMessage;
		}
	}

	function getOrders($mysqli) {
		$stmt = $mysqli->prepare("
			SELECT
				order_id, order_user, order_order
			FROM
				tcg_orders
		");

		$stmt->execute();
		$stmt->store_result();
		$stmt->bind_result($id, $user, $order);

		while($row = $stmt->fetch()) {

			$order = str_replace("\\","",$order);
			$orderStr = json_decode($order);

			$orders[$id] = $orderStr;
		}
		echo json_encode($orders);
   }

?>
