function createMenu() {
   var html = `
      <div id='menu-content'></div>
   `;

   $('#menu').html(html);

   createMenuLoginField(); // TODO: Move?
}

function createMenuLoginField() {
   var html = `
      <form action="javascript:void(0);">
         <input type='text'      id='login-username-input' placeholder='Username' autofocus />
         <input type='password'  id='login-password-input' placeholder='Password' />
         <button id='login-btn'>Login</button>
      </form>
   `;

   $('#menu-content').html(html);

   $( "#login-btn" ).on( "click", function(event) {
      var username = $( "#login-username-input" ).val(),
          password = $( "#login-password-input" ).val();

      login(username, password);
   });
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
      <img src='res/user-images/${userImg}' alt='' class='menu-user-image' /> ${greeting} ${userName} <button id='logout-btn'>Logout</button>
   `;

   $('#menu-content').html(html);

   $( "#logout-btn" ).on( "click", function(event) {
      logout();
   });
}

function createGreeting() {
   return "Greetings,";
}
