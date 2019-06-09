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
    //<div id='filter-selector'></div>
    var html = `
        <form action="javascript:void(0);">
            <input type='text'      id='login-username-input' placeholder='Username' autocomplete='username' autofocus />
            <input type='password'  id='login-password-input' placeholder='Password' autocomplete='current-password' />
            <button id='login-btn'>Login</button>
        </form>
    `;

    $('#menu-content-right').html(html);

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

   $('#menu-content-right').html(html);

   $( "#logout-btn" ).on( "click", function(event) {
      logout();
   });

   /*
   <div>
       <div id='filter-selector'></div>
   </div>
   */
}

function createGreeting() {
   return "Greetings,";
}
