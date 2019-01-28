<?php
    date_default_timezone_set('Europe/Copenhagen');

    function encrypt($input, $input2, $input3) {
        $inputPassword = $input;

        $salt = sha1($input2);
        $pepper = md5($input3);

        $encrypted = sha1(md5($inputPassword.$salt) . "nevermore" . $pepper);

        return $encrypted;
    }

    function login($mysqli) {
      $name = $_POST["username"];
      $password = $_POST["password"];

      if ($name !== "" && $password !== "") {
         $stmtUser = $mysqli->prepare("
      	    SELECT user_id, user_firstname, user_lastname, user_password, user_avatar
      	    FROM users
      	    WHERE user_name = ?
      	    LIMIT 1
      	");

      	$stmtUser->bind_param('s', $name);
      	$stmtUser->execute();
          $stmtUser->store_result();
          $stmtUser->bind_result($userId,$firstName, $lastName, $userPassword, $userAvatar);

          while($row = $stmtUser->fetch()) {
              $id = $userId;
              $avatar = $userAvatar;
              $encryptedPassword = encrypt($password, $firstName, $lastName);
          }

          if ($userPassword == $encryptedPassword && $encryptedPassword != "") {
              $_SESSION['user_firstname'] = "$firstName";
              $_SESSION['user_id'] = $id;
              $_SESSION['user_avatar'] = "$avatar";
              $_SESSION['logged_in'] = true;

              echo "200";
          }
          else {
              $_SESSION['user_firstname'] = "";
              $_SESSION['user_id'] = null;
              $_SESSION['user_avatar'] = "visitor.png";
              $_SESSION['logged_in'] = false;

              echo "401";
          }
      }
      else {
         echo "400";
      }
   }
?>
