"use strict";

function createCardTooltips() {
  cards.forEach(function (category) {
    var cards = category.cards,
        categoryId = category.id;
    cards.forEach(function (card) {
      createCardTooltip(categoryId, card.id);
    });
  });
}

function createCardTooltip(categoryId, cardId) {
  var card,
      text = "",
      textBg = 'neutral',
      extra = "";
  cards.forEach(function (category) {
    if (category.id === categoryId) {
      category.cards.forEach(function (cardCard) {
        if (cardCard.id === cardId) {
          card = cardCard;
        }

        return;
      });
      return;
    }
  });

  if (card.text !== undefined) {
    if (card.textBg !== undefined) {
      textBg = card.textBg;
    }

    if (card.textBack !== undefined) {
      text = "<b>Front:</b> " + card.text + "<br /><b>Back:</b> " + card.textBack;
    } else {
      text = card.text;
    }

    text = replaceWithSymbols(text);
    extra = "<div class='extra " + textBg + "'><p>" + text + "</p></div>";
  }

  $('#card-thumb-' + categoryId + "-" + cardId).tooltip({
    content: '<div class="tooltip"><img src="card-images/' + card.image + '" alt="" />' + extra + '</div>',
    track: true,
    show: false,
    hide: false,
    tooltipClass: 'red-tooltip',
    position: {
      my: "left+50 top-200",
      at: "right center",
      of: "BODY",
      collision: "flipfit"
    }
  });
  $('#card-origin-thumb-' + categoryId + "-" + cardId).tooltip({
    content: '<div class="tooltip"><img src="' + card.originImage + '" alt="" /></div>',
    track: true,
    show: false,
    hide: false,
    tooltipClass: 'red-tooltip',
    position: {
      my: "left+50 top-200",
      at: "right center",
      of: "BODY",
      collision: "flipfit"
    }
  });
}

function replaceWithSymbols(text) {
  var result = text;
  result = text.replace(new RegExp('{exhaust}', 'g'), '<img src="res/exhaust.png" alt="exhaust" />');
  result = result.replace(new RegExp('{arrow}', 'g'), '<img src="res/arrow.png" alt="-->" />');
  result = result.replace(new RegExp('{arrow-white}', 'g'), '<img src="res/arrow-white.png" alt="-->" />');
  result = result.replace(new RegExp('{hp}', 'g'), '<img src="res/hp.png" alt="HP>" class="extra-icon-nudge" />');
  result = result.replace(new RegExp('{atk-melee}', 'g'), '<img src="res/atk-melee.png" alt="ATK>" class="extra-icon-nudge" />');
  result = result.replace(new RegExp('{atk-nature}', 'g'), '<img src="res/atk-nature.png" alt="ATK>" class="extra-icon-nudge" />');
  return result;
}
"use strict";

var connection = "src/php/db.php";

function getOrders() {
  $.post(connection, {
    call: 'getOrders'
  }).done(function (data) {
    updateTableCellsData(data);
  });
}

function saveOrder() {
  var data = getCellValuesForUser(loggedInUserId);
  $.post(connection, {
    call: 'saveOrders',
    data: data
  }).done(function (data) {
    if (debug) console.log(data);
    getOrders();
  });
}

function login(event
/*username, password*/
) {
  var username = document.querySelector('#login-username-input').value,
      password = document.querySelector('#login-password-input').value;
  $.post(connection, {
    call: 'login',
    username: username,
    password: password
  }).done(function (data) {
    console.log(data);

    switch (data) {
      case '200':
        doLogin();
        break;

      case '400':
        createDialog('bad-request');
        break;

      case '401':
        createDialog('auth-failed');
        break;

      default:
        alert("Unknown error");
        break;
    }
  });
}

function doLogin() {
  $.post(connection, {
    call: 'getUserId'
  }).done(function (data) {
    console.log("UserID: " + data);

    if (data !== '401') {
      loggedInUserId = parseInt(data);
      getOrders();
      createMenuLogoutField();
      closeModal();
    } else {
      alert("Cannot get user id; User not logged in");
    }
  });
}

function logout(username, password) {
  $.post(connection, {
    call: 'logout'
  }).done(function (data) {
    console.log("Logged out");
    loggedInUserId = -1;
    getOrders();
    createMenuLoginField();
  });
}
"use strict";

function createFilterSelector() {
  var setList = [{
    name: 'Set 2: Allegiance',
    id: 2
  }, {
    name: 'Set 1: Forgotten Heroes',
    id: 1
  }, {
    name: 'Reborn: Into the Mists',
    id: 99
  }],
      optionsHtml = "<option value='0' class='set-all'>All sets</option>",
      // No filter option
  html = "";
  setList.forEach(function (set) {
    optionsHtml = optionsHtml + "<option value=" + set.id + " class='set-" + set.ud + "' >" + set.name + "</option>";
  });
  html = "\n\t\t<label>\n\t\t\tSet filter\n\t\t\t<select id='set-selector'>".concat(optionsHtml, "</select>\n\t\t</label>");
  $('#filter-selector').html(html);
  $('#set-selector').on('change', function () {
    updateTableFilter();
  });
}

function updateTableFilter() {
  var filter = parseInt($('#set-selector').val());
  tableFilter = filter;
  $('.table-row').trigger('filterChanged');
}
"use strict";

var loggedInUserId = -1,
    tableFilter = 0,
    debug = false; // INIT

$(function () {
  createTable();
  createMenu();
  getOrders();
});
"use strict";

function createMenu() {
  var html = "\n        <div id='menu-content-left'><div id='filter-selector'></div></div>\n        <div id='menu-content-right'></div>\n    ";
  $('#menu').html(html);
  createMenuLoginField(); // TODO: Move?

  createFilterSelector();
}

function createMenuLoginField() {
  var html = "<button onClick=\"createDialog('login')\">Login</button>";
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
  var html = "\n      <img src='res/user-images/".concat(userImg, "' alt='' class='menu-user-image' /> ").concat(greeting, " ").concat(userName, " <button id='logout-btn'>Logout</button>\n   ");
  $('#menu-content-right').html(html);
  $("#logout-btn").on("click", function (event) {
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
"use strict";

function openModal() {
  $('body').addClass('scroll-lock');
  $('#modal').addClass('open');
  $('#page').addClass('modal-open');
  $('#modal').on('click', function (event) {
    if (event.target !== this) {
      return false;
    }

    closeModal();
  });
}

function closeModal() {
  $('#modal').removeClass('open');
  $('#page').removeClass('modal-open');
}

function createDialog(type) {
  var dialog = getDialogSettings(type);
  var html = "\n\t\t<div class='modal-box dialog'>\n\t\t\t<div class='accent ".concat(dialog.accent, "'>\n\t\t\t\t<span>").concat(dialog.title, "</span>\n\t\t\t\t<button id='btn-close-dialog' class='dialog-icon'>X</button>\n\t\t\t</div>\n\t\t\t<div class='dialog-content-container'>\n\t\t\t\t<div class='dialog-content-illustration'><div>\n\t\t\t\t<svg class=\"icon\">\n\t\t\t\t\t<use xlink:href=\"#icon-login\" />\n\t\t\t\t</svg>\n\t\t\t\t</div></div>\n\t\t\t\t<div class='dialog-content'>").concat(dialog.html, "</div>\n\t\t\t</div>\n\t\t\t<div class='dialog-footer'>\n\t\t\t\t").concat(dialog.negativeBtn ? "<button id='btn-negative' data-btn-type='".concat(dialog.negativeBtn.id, "' ").concat(dialog.negativeBtn.form ? "form='".concat(dialog.negativeBtn.form, "'") : '', ">").concat(dialog.negativeBtn.title, "</button>") : '', "\n\t\t\t\t").concat(dialog.positiveBtn ? "<button id='btn-positive' data-btn-type='".concat(dialog.positiveBtn.id, "' ").concat(dialog.positiveBtn.form ? "form='".concat(dialog.positiveBtn.form, "'") : '', ">").concat(dialog.positiveBtn.title, "</button>") : '', "\n\t\t\t</div>\n\t\t</div>");
  $('#modal').html(html);
  $('#btn-close-dialog').on('click', function (event) {
    closeModal();
  });
  $("#btn-positive, #btn-negative").on("click", function (event) {
    var type = event.currentTarget.dataset.btnType;

    if (type) {
      switch (type) {
        case 'cancel':
          closeModal();
          break;

        case 'login':
          login();
          break;

        default:
          closeModal();
          break;
      }
    }
  });
  openModal();
}

function getDialogSettings(type) {
  var settings = null;

  switch (type) {
    case 'login':
      settings = createLoginDialogSettings();
      break;

    case 'auth-failed':
      settings = createAuthFailedDialogSettings();
      break;

    case 'bad-request':
      settings = createBadRequestDialogSettings();
      break;

    case 'test':
      settings = {
        title: 'TEST',
        html: 'EXAMPLE',
        accent: 'accent-normal'
      };
      break;

    default:
      settings = {
        title: 'DEFAULT',
        html: 'NONE',
        accent: 'accent-normal'
      };
      break;
  }

  return settings;
}

function createLoginDialogSettings() {
  var title = 'Login',
      html = "\n\t\t<form id='login-form' action='javascript:void(0);'>\n\t\t\t<label for='login-username-input'>Username</label>\n\t\t\t<input type='text' id='login-username-input' placeholder='Username' autocomplete='username' autofocus /><br />\n\t\t\t<label for='login-password-input'>Password</label>\n\t\t\t<input type='password' id='login-password-input' placeholder='Password' autocomplete='current-password' /><br />\n\t\t</form>";
  return {
    title: title,
    html: html,
    accent: 'accent-normal',
    icon: 'login',
    positiveBtn: {
      title: 'Login',
      id: 'login',
      form: 'login-form'
    },
    negativeBtn: {
      title: 'Cancel',
      id: 'cancel'
    }
  };
}

function createAuthFailedDialogSettings() {
  var title = 'Bad request',
      html = "<p>The username and password you have entered did not match our records.<br>Please try again.</p>";
  return {
    title: title,
    html: html,
    accent: 'accent-error',
    icon: 'login',
    positiveBtn: {
      title: 'Okay',
      id: 'ok'
    }
  };
}

function createBadRequestDialogSettings() {
  var title = 'Bad request',
      html = "<p>The system was unable to perfom the desired action.<br>Please try again.</p>";
  return {
    title: title,
    html: html,
    accent: 'accent-error',
    icon: 'login',
    positiveBtn: {
      title: 'Okay',
      id: 'ok'
    }
  };
}
"use strict";

function createNumberInputField(value, categoryId, cardId, userId) {
  var html = "<div class='number-input'>\n         <div class='number-input-left'>\n            <input type='text' id='input-".concat(categoryId, "-").concat(cardId, "-").concat(userId, "' class='input-number-field' value='").concat(value, "'/>\n         </div>\n\n         <div class='number-input-right'>\n            <input class='input-add-btn' type='button' id='input-").concat(categoryId, "-").concat(cardId, "-").concat(userId, "-add-btn' value='+' /><br />\n            <input class='input-sub-btn' type='button' id='input-").concat(categoryId, "-").concat(cardId, "-").concat(userId, "-sub-btn' value='-' />\n         </div>\n      </div>");
  return html;
}

function getInputId(btn, e) {
  var target = e.target.id;
  target = target.replace("input-", "");
  target = target.replace("-" + btn + "-btn", "");
  return target.split('-');
}

function addInputButtonListeners() {
  $(".input-number-field").on("input", function () {
    saveOrder();
  });
  $(".input-number-field").on("change", function () {
    saveOrder();
  });
  $(".input-number-field").on("blur", function (event) {
    var values = getInputId('add', event),
        value = $('#input-' + values[0] + '-' + values[1] + '-' + values[2]).val();
    value = value.replace(/\s/g, "");

    if (isNaN(value) || value < 0 || value == "") {
      $('#input-' + values[0] + '-' + values[1]).val(0);
    }

    updateCellTotals();
  });
  $(".input-add-btn").on("click", function (event) {
    var values = getInputId('add', event);
    increaseInputValue(values[0], values[1], values[2]);
    updateCellTotals();
    saveOrder();
  });
  $(".input-sub-btn").on("click", function (event) {
    var values = getInputId('sub', event);
    decreaseInputValue(values[0], values[1], values[2]);
    updateCellTotals();
    saveOrder();
  });
}

function increaseInputValue(categoryId, cardId, userId) {
  var currentValue = parseInt($("#input-" + categoryId + "-" + cardId + "-" + userId).val());
  $("#input-" + categoryId + "-" + cardId + "-" + userId).val(currentValue + 1);
}

function decreaseInputValue(categoryId, cardId, userId) {
  var currentValue = parseInt($("#input-" + categoryId + "-" + cardId + "-" + userId).val());
  if (currentValue >= 1) $("#input-" + categoryId + "-" + cardId + "-" + userId).val(currentValue - 1);
}
"use strict";

var users = [{
  id: 2,
  name: 'Duke',
  image: 'duke'
}, {
  id: 6,
  name: 'Hunter',
  image: 'hunter'
}, {
  id: 5,
  name: 'Jolly',
  image: 'jolly'
}, {
  id: 1,
  name: 'Red',
  image: 'red'
}];
var cards = [{
  id: 0,
  type: 'ally',
  name: 'Ringo',
  image: 'ringo.png',
  originImage: 'http://wowcards.info/scans/outland/en/239_Lost.jpg',
  originUrl: 'http://wowcards.info/card/outland/en/239/Lost'
}, {
  id: 1,
  type: 'ally',
  name: 'Tooga',
  image: 'tooga.png',
  originImage: 'http://wowcards.info/scans/azeroth/en/359_Toogas-Quest.jpg',
  originUrl: 'http://wowcards.info/card/azeroth/en/359/Toogas-Quest'
}, {
  id: 2,
  type: 'ally',
  name: 'Wyrmrest Vanquisher',
  image: 'wyrmrest_vanquisher.png',
  originImage: 'http://wowcards.info/scans/wrathgate/en/211_On-Ruby-Wings.jpg',
  originUrl: 'http://wowcards.info/card/wrathgate/en/211/On-Ruby-Wings'
}, {
  id: 3,
  type: 'ally',
  name: 'Test',
  image: 'test.png'
}, {
  id: 4,
  type: 'hero',
  name: 'Jaenx Felgear',
  image: 'jaenx.png'
}, {
  id: 5,
  type: 'hero',
  name: 'Darania',
  image: 'darania.png'
}, {
  id: 6,
  type: 'ally',
  name: 'Demon',
  image: 'demon.png',
  originImage: 'http://wowcards.info/scans/twilight/en/87_Demonic-Corruption.jpg',
  originUrl: 'http://wowcards.info/card/twilight/en/87/Demonic-Corruption'
}];
var orders = [{
  userId: 1,
  cards: [{
    id: 0,
    qty: 2
  }, {
    id: 1,
    qty: 5
  }, {
    id: 2,
    qty: 3
  }]
}, {
  userId: 2,
  cards: [{
    id: 0,
    qty: 5
  }]
}];
"use strict";

var users = [{
  id: 2,
  name: 'Duke',
  image: 'duke'
}, {
  id: 6,
  name: 'Hunter',
  image: 'hunter'
}, {
  id: 5,
  name: 'Jolly',
  image: 'jolly'
}, {
  id: 1,
  name: 'Red',
  image: 'red'
}];
var cards = [{
  id: 12,
  name: 'Abilites',
  cards: [{
    id: 1,
    type: 'hero',
    name: 'Jaenx Felgear',
    image: '1-002.png',
    text: 'Your hero heals target hero or ally 4 damage for each totem you control.',
    textBg: 'spell'
  }, {
    id: 2,
    type: 'hero',
    name: 'Darania',
    image: '1-004.png',
    text: 'Attach to target hero or ally and heal it for 10 damage.<br /><b>Ongoing:</b> At the beginning of your turn, destroy Renewing Life and heal 4 damage from attached character.',
    textBg: 'spell'
  }, {
    id: 3,
    type: 'hero',
    name: 'Darania',
    image: '1-007.png',
    text: '<b>Restoration Hero Required</b><br />Your hero heals 12 damage from each friendly hero and ally.',
    textBg: 'spell'
  }, {
    id: 4,
    type: 'hero',
    name: 'Darania',
    image: '1-010.png',
    text: '<b>Night Elf Hero Required</b><br />You pay 1 less to complete quests.<br />Exhaust this ally: Return target friendly ally to its owners hand.',
    textBg: 'alliance'
  }, {
    id: 5,
    type: 'hero',
    name: 'Darania',
    image: '1-014.png',
    text: 'When an opponent ally is removed from the game, ready target resource.',
    textBg: 'horde'
  }]
}, {
  id: 0,
  name: 'Allies',
  cards: [{
    id: 1,
    type: 'ally',
    name: 'Ringo',
    image: 'ringo.png',
    text: 'At the start of your turn, draw a card.',
    textBg: 'neutral',
    originImage: 'http://wowcards.info/scans/outland/en/239_Lost.jpg',
    originUrl: 'http://wowcards.info/card/outland/en/239/Lost'
  }, {
    id: 2,
    type: 'ally',
    name: 'Tooga',
    image: 'tooga.png',
    originImage: 'http://wowcards.info/scans/azeroth/en/359_Toogas-Quest.jpg',
    originUrl: 'http://wowcards.info/card/azeroth/en/359/Toogas-Quest'
  }, {
    id: 3,
    type: 'ally',
    name: 'Wyrmrest Vanquisher',
    image: 'wyrmrest_vanquisher.png',
    text: 'When you place a resource face up, you may draw a card.',
    originImage: 'http://wowcards.info/scans/wrathgate/en/211_On-Ruby-Wings.jpg',
    originUrl: 'http://wowcards.info/card/wrathgate/en/211/On-Ruby-Wings'
  }, {
    id: 4,
    type: 'ally',
    name: 'Test',
    image: 'test.png',
    text: 'Really nasty.',
    textBg: 'horde'
  }, {
    id: 5,
    type: 'ally',
    name: 'Elemental Mending',
    image: 'ability - shaman - elemental mending.png',
    text: 'Your hero heals 4 damage from target hero or ally for each totem you control.',
    textBg: 'spell'
  }]
}, {
  id: 1,
  name: 'Heroes',
  cards: [{
    id: 1,
    type: 'hero',
    name: 'Jaenx Felgear',
    image: 'jaenx.png',
    text: 'Pay 3 to flip Jaenx.',
    textBack: 'At the start of your turn, put a 1/1 Imp demon ally token into play.',
    textBg: 'alliance'
  }, {
    id: 2,
    type: 'hero',
    name: 'Darania',
    image: 'darania.png',
    text: 'Pay 3 to flip Darania.',
    textBack: 'When an opponent ally is removed from the game, ready target resource.',
    textBg: 'alliance'
  }]
}, {
  id: 2,
  name: 'Tokens',
  cards: [{
    id: 1,
    type: 'ally',
    name: 'Demon',
    image: 'demon.png',
    originImage: 'http://wowcards.info/scans/twilight/en/87_Demonic-Corruption.jpg',
    originUrl: 'http://wowcards.info/card/twilight/en/87/Demonic-Corruption'
  }]
}];
"use strict";

var cards = [{
  id: 1,
  name: 'Abilites',
  cards: [{
    id: 1,
    image: '1-001.png',
    text: 'Play only if you control a Mount.<br />The next time your hero would be dealt fatal damage this turn, it is dealt damage until it has 1 remaining health instead.',
    textBg: 'spell',
    set: 1
  }, {
    id: 2,
    image: '1-002.png',
    text: 'Your hero heals target hero or ally 4 damage for each totem you control.',
    textBg: 'spell',
    set: 2
  }, {
    id: 3,
    image: '1-003.png',
    text: '<b>Ongoing:</b> Your Chain Heal and Greater Chain Heal abilites heal double the amount instead.<br />Pay 2, destroy this ability {arrow}<br />Search your graveyard for an ability named Chain Heal or Greater Chain Heal and put it into your hand.',
    textBg: 'spell',
    originImage: 'card-images/refs/ch_gch.png',
    set: 1
  }, {
    id: 4,
    image: '1-004.png',
    text: 'Attach to target hero or ally and your hero heals it for 10 damage.<br /><b>Ongoing:</b> At the start of your turn, destroy Renewing Life. If you do, your hero heals 4 damage from attached character.',
    textBg: 'spell',
    set: 1
  }, {
    id: 5,
    image: '1-005.png',
    text: 'Your hero heals 8 damage from target hero or ally. If you control a totem, the target is healed for an additional 4 damage.',
    textBg: 'spell',
    set: 1
  }, {
    id: 6,
    image: '1-006.png',
    text: '<b>Restoration Hero Required</b><br />When Totem of the Spirit enters play, your hero heals 10 damage from target hero or ally.<br />Pay 1, destroy Totem of the Spirit {arrow} Prevent the next 5 damage that would be dealt to target hero or ally this turn.',
    textBg: 'spell',
    set: 1
  }, {
    id: 7,
    image: '1-007.png',
    text: '<b>Restoration Hero Required</b><br />Your hero heals 12 damage from each friendly hero or ally.',
    textBg: 'spell',
    set: 1
  }, {
    id: 8,
    image: 'reborn-044.png',
    text: 'Reborn card',
    textBg: 'spell',
    set: 99
  }]
}, {
  id: 2,
  name: 'Allies',
  cards: [{
    id: 1,
    image: '1-008.png',
    text: '<b>Paladin or Priest Hero Required</b><br />You pay 1 less to complete quests.<br />When you place a resource face up, your hero may heal 2 damage from target hero or ally.',
    textBg: 'neutral',
    set: 2
  }, {
    id: 2,
    image: '1-009.png',
    text: 'You pay 1 more to complete quests.<br />Face-up resources you control has: "{exhaust} {arrow} Prevent the next two damage that would be dealt to your hero this turn".',
    textBg: 'neutral'
  }, {
    id: 3,
    image: '1-010.png',
    text: '<b>Night Elf Hero Required</b><br />You pay 1 less to complete quests.<br />{exhaust} {arrow} Return target friendly ally to its owners hand.',
    textBg: 'alliance'
  }, {
    id: 4,
    image: '1-011.png',
    text: 'You may exhaust and destroy target worgen ally you control to play Guntrand the Schnell instead of paying its cost.<br />You pay 1 less to complete quests.<br />When you complete a quest, you may ready target worgen ally you control.',
    textBg: 'alliance'
  }, {
    id: 5,
    image: '1-012.png',
    text: '<b>Goblin Hero Required</b><br />The first quest you complete each turn costs no resources. Instead, put damage on your hero equal to that cost.',
    textBg: 'horde'
  }, {
    id: 6,
    image: '1-013.png',
    text: '<b>Goblin, Orc or Troll Hero Required</b><br />You pay 1 less to complete quests.<br />When you place a resource face up, your hero has <b>Smash</b> this turn.',
    textBg: 'horde'
  }, {
    id: 7,
    image: '1-014.png',
    text: '<b>Blood Elf Hero Required</b><br />You pay 1 less to complete quests.<br />When you place a resource face up, you may put target ability from your graveyard on top of your deck.',
    textBg: 'horde'
  }]
}, {
  id: 3,
  name: 'Equipment',
  cards: [{
    id: 1,
    image: '1-015.png',
    text: '<b>Thrown</b><br />Combat Darts can only be exhausted if your is attacking an ally.',
    textBg: 'equipment'
  }, {
    id: 2,
    image: '1-016.png',
    text: '<b>Thrown</b><br />When your hero deals damage to an ally with Rocket Dart, your hero deals 1 fire damage to another target hero or ally.',
    textBg: 'equipment'
  }, {
    id: 3,
    image: '1-017.png',
    text: '<b>Thrown</b><br />When Bad Voodoo Dart deals damage to a hero or ally, attach a Poison ability token to that character named Bad Voodoo Poison with:<br />"<b>Ongoing:</b> At the start of your turn, your hero deals 1 shadow damage to attached character".',
    textBg: 'equipment',
    originImage: 'card-images/tokens/bad-voodoo-poison.png'
  }, {
    id: 4,
    image: '1-018.png',
    text: '<b>Thrown</b>',
    textBg: 'equipment'
  }, {
    id: 5,
    image: '1-019.png',
    text: 'Totems in your hand cost 1 less to play to a minimum of 1. Friendly totems have +2 Health.',
    textBg: 'equipment'
  }, {
    id: 6,
    image: '1-020.png',
    text: '<b>Thrown</b><br />When your hero deals combat damage with Sentinel Glaive, he may also deal 1 melee damage to up to two other target heroes or allies.',
    textBg: 'alliance'
  }, {
    id: 7,
    image: '1-021.png',
    text: '<b>Goblin Hero Required</b><br />When you play a goblin ally, your hero may deal 2 fire damage to it and a target opposing hero or ally.',
    textBg: 'horde'
  }, {
    id: 8,
    image: '1-022.png',
    text: '<b>Tauren Hero Required</b><br />War Totem costs 2 less to play if you control an Earth Totem<br />War Totem has <b>Assualt 2</b> if you control a Fire Totem.<br />You pay 2 less to strike with War Totem if you control an Air Totem.<br />When you strike with War Totem: If you control a Water Totem, your hero heals 2 damage from target hero or ally.',
    textBg: 'horde'
  }]
}, {
  id: 4,
  name: 'Heroes',
  cards: [{
    id: 1,
    image: '1-023.png',
    text: 'Pay 2 {arrow} Flip Azhera.',
    textBack: 'When you complete a quest, Azhera may heal 3 damage from target hero or ally.',
    textBg: 'alliance'
  }, {
    id: 2,
    image: '1-024.png',
    text: 'Once per turn: Pay 1 {arrow} Flip Czalonar. If Czalonar would deal nature damage this turn, he deals that much +1 instead.',
    textBack: 'Once per turn: Pay 1 {arrow} Flip Czalonar. If Czalonar would deal arcane damage this turn, he deals that much +1 instead.',
    textBg: 'alliance'
  }, {
    id: 3,
    image: '1-025.png',
    text: 'Pay 2 {arrow} Flip Elyria.',
    textBack: 'When you complete a quest, pay 1 less to play your next arcane ability this turn.',
    textBg: 'alliance'
  }, {
    id: 4,
    image: '1-026.png',
    text: 'Pay 3 {arrow} Flip Heiku.',
    textBack: 'When Heiku is dealt combat damage while defending, she deals 1 arcane damage to the source of that damage.',
    textBg: 'alliance'
  }, {
    id: 5,
    image: '1-027.png',
    text: 'Pay 3 {arrow} Flip Erendis.',
    textBack: 'If you control a Pet with <b>Elusive</b>, Erendis is <b>Untargetable</b>.',
    textBg: 'alliance'
  }, {
    id: 6,
    image: '1-028.png',
    text: 'Pay 3 {arrow} Flip Naugrund.',
    textBack: 'If you control a ranged weapon: When an opposing ally enters play, Naugrund may deal 1 ranged damage to it.',
    textBg: 'alliance'
  }, {
    id: 7,
    image: '1-029.png',
    text: 'Pay 3 {arrow} Flip Nenira.',
    textBack: 'You pay 2 less to strike with Bow weapons.',
    textBg: 'alliance'
  }, {
    id: 8,
    image: '1-030.png',
    text: 'Pay 3 {arrow} Flip Arienne.',
    textBack: 'When you play an Arcane ability with a cost 3 or more, Arienne may deal 1 arcane damage to target hero or ally.',
    textBg: 'alliance'
  }, {
    id: 9,
    image: '1-031.png',
    text: 'Pay 3, {exhaust} {arrow} Flip Fiona.',
    textBack: 'Fiona can\'t ready.<br />At the end of your turn, <b>Delve</b>.',
    textBg: 'alliance'
  }, {
    id: 10,
    image: '1-032.png',
    text: 'Pay 4 {arrow} Flip Jelani.<br />Then, search your collection for a card named Fireball, and put it into your hand.',
    textBack: '{exhaust} {arrow} Jelani deals 1 fire damage for each card in your graveyard named Fireball to target ally.',
    textBg: 'alliance',
    originImage: 'card-images/refs/fireball.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=444'
  }, {
    id: 11,
    image: '1-033.png',
    text: 'Pay 2 {arrow} Flip Lyrande.',
    textBack: 'Once per turn: The second time you draw a card, Lyrande deals 1 arcane damage to target hero or ally.',
    textBg: 'alliance'
  }, {
    id: 12,
    image: '1-034.png',
    text: 'Pay 2 {arrow} Flip Hevia.',
    textBack: 'Once on your turn only: Ready target ally you control. That ally can\'t attack this turn.',
    textBg: 'alliance'
  }, {
    id: 13,
    image: '1-035.png',
    text: 'Pay 3 {arrow} Flip Lauri&euml.',
    textBack: 'When Lauri&euml exhausts to protect, prevent the next 1 damage that would be dealt to her and ready Lauri&euml.',
    textBg: 'alliance'
  }, {
    id: 14,
    image: '1-036.png',
    text: 'Pay 2 {arrow} Flip Letaan.',
    textBack: 'You pay 3 less to strike with weapons you control, if you completed a quest this turn.',
    textBg: 'alliance'
  }, {
    id: 15,
    image: '1-037.png',
    text: 'Pay 2 {arrow} Flip Meneldil.',
    textBack: 'When Meneldil heals damage with an ability, put a Holy Power counter, up to three, on Meneldil.<br /><br /><b>Word of Glory:</b> Remove three Holy Power {arrow} Meneldil heals 6 damage from target hero or ally.<br /><br /><b>Templar\'s Verdict:</b> Remove three Holy Power {arrow} Meneldil deals 4 holy damage to target hero or ally.',
    textBg: 'alliance'
  }, {
    id: 16,
    image: '1-038.png',
    text: 'Pay 2 {arrow} Flip Yrel.<br /><b>Deckbuilding:</b> You can only include allies with the race Draenei in your deck.',
    textBack: 'Allies you control have -3 ATK and +2 HEALTH.',
    textBg: 'alliance'
  }, {
    id: 17,
    image: '1-039.png',
    text: 'Pay 1 {arrow} Flip Heriel.',
    textBack: 'If you control an equipment, Heriel has <b>Mend 2</b>.',
    textBg: 'alliance'
  }, {
    id: 18,
    image: '1-040.png',
    text: 'Pay 2 {arrow} Flip Janella.',
    textBack: 'Pay 1, {exhaust} {arrow} Prevent the next 3 damage that would be dealt to target hero or ally this turn. ',
    textBg: 'alliance'
  }, {
    id: 19,
    image: '1-041.png',
    text: 'Pay 3 {arrow} Flip Luthnia.',
    textBack: 'When you play an ongoing ability, Luthnia may heal 1 damage from target hero or ally.<br /><b>Deckbuilding</b>: You can\'t include Shadow and Holy abilities in your deck, but you can include Druid Restoration abilities.',
    textBg: 'alliance'
  }, {
    id: 20,
    image: '1-042.png',
    text: 'Pay 3 {arrow} Flip Neithon.',
    textBack: 'At the end of your turn, you may ready target resource.',
    textBg: 'alliance'
  },
  /*
  {
     id: 21,
     image: '1-043.png',
     text: 'Pay 3 {arrow} Flip the Jolly Pirate. Then, put a 0 {atk-melee} / 1 {hp} Parrot Beast ally token named The Polly Pirate into play.',
     textBack: 'When The Jolly Pirate has Stealth, he also has Assualt 2.',
     textBg: 'alliance',
     originImage: 'card-images/tokens/the-polly-pirate.png',
  },
  */
  {
    id: 22,
    image: '1-044.png',
    text: 'Pay 2 to flip Venacisca',
    textBack: 'Once on your turn: Pay 2, exhaust your weapons {arrow} Ready Venacisca and a target weapon with <b>Thrown</b>.',
    textBg: 'alliance'
  }, {
    id: 23,
    image: '1-045.png',
    text: 'Pay 3 {arrow} Flip Anlenya.',
    textBack: 'When Anlenya heals damage, if you control a Water Totem, she heals that much plus 1 instead.',
    textBg: 'alliance'
  }, {
    id: 24,
    image: '1-046.png',
    text: 'Pay 3 {arrow} Flip Sindarien.',
    textBack: 'Weapons you control has +1 ATK for each totem you control.',
    textBg: 'alliance'
  }, {
    id: 25,
    image: '1-047.png',
    text: 'Pay 3, put 10 damage on Urtham {arrow} Flip Urtham',
    textBack: 'Your Chain heal and Greater Chain heal abilities can target the same hero or ally more than once.',
    textBg: 'alliance',
    originImage: 'card-images/refs/ch_gch.png'
  }, {
    id: 26,
    image: '1-048.png',
    text: 'Pay 2 {arrow} Flip Annlilly.',
    textBack: 'You can control an additional pet.',
    textBg: 'alliance'
  }, {
    id: 27,
    image: '1-049.png',
    text: 'Pay 3 {arrow} Flip Darania.',
    textBack: 'When an opponent ally is removed from game, ready target resource.',
    textBg: 'alliance'
  }, {
    id: 28,
    image: '1-050.png',
    text: 'Pay 3 {arrow} Flip Jaenx.',
    textBack: 'At the start of your turn, put a 1 {atk-melee} / 1 {hp} Imp demon ally token into play.',
    textBg: 'alliance',
    originImage: 'card-images/tokens/imp.png'
  }, {
    id: 29,
    image: '1-051.png',
    text: 'Pay 4 and destroy two allies in your party {arrow} Flip Wilfred Fizzlebang.<br />Then, put a 10 {atk-melee} / 10 {hp} ally demon token named Jaraxxus into play with "Jaraxxus can only be destroyed by fatal damage".',
    textBack: 'At the start of your turn, Jaraxxus will attack Wilfred unless you pay 2 and destroy an ally you control.',
    textBg: 'alliance',
    originImage: 'card-images/tokens/jaraxxus.png'
  }, {
    id: 30,
    image: '1-052.png',
    text: 'Pay 3 {arrow} Flip Drizzti.',
    textBack: 'If Drizzti has <b>Dualwield</b>: When Drizzti deals combat damage to an ally, he may deal that amount of melee damage to another target ally.',
    textBg: 'alliance'
  }, {
    id: 31,
    image: '1-053.png',
    text: 'Pay 3 {arrow} Flip Duhna.',
    textBack: 'When Duhna prevents damage with a shield while protecting, she deals that much damage to the attacker.',
    textBg: 'alliance'
  }, {
    id: 32,
    image: '1-054.png',
    text: 'Pay 3 {arrow} Flip Gandor.',
    textBack: 'Gandor have <b>Assault 1</b> for each armor equipment you control.',
    textBg: 'alliance'
  }, {
    id: 33,
    image: '1-055.png',
    text: ' Pay 2 {arrow} Flip Keigron.',
    textBack: 'When you play an Armor, Keigron may deal 1 frost damage to target ally.',
    textBg: 'horde'
  }, {
    id: 34,
    image: '1-056.png',
    text: 'Pay 3 {arrow} Flip Urrock.',
    textBack: 'Your instant Hunter abilities cost 1 less to play, to a minimum of 1.',
    textBg: 'horde'
  }, {
    id: 35,
    image: '1-057.png',
    text: 'Pay 2 {arrow} Flip Varthin.',
    textBack: 'Pets you control have <b>Assault 2</b>.',
    textBg: 'horde'
  }, {
    id: 36,
    image: '1-058.png',
    text: 'Pay 3 {arrow} Flip Dann\'thas.',
    textBack: '{exhaust} {arrow} You pay 1 less to play your next instant Frost ability this turn.',
    textBg: 'horde'
  }, {
    id: 37,
    image: '1-059.png',
    text: 'Pay 2 {arrow} Flip Agreynell.',
    textBack: 'If you control a Battleground location, you pay 1 less to complete quests.',
    textBg: 'horde'
  }, {
    id: 38,
    image: '1-060.png',
    text: 'Pay 2 {arrow} Flip Henloran.',
    textBack: 'If you control an armor, when Henloran deals holy damage, he deals that much +1 instead.',
    textBg: 'horde'
  }, {
    id: 39,
    image: '1-061.png',
    text: 'Pay 2 {arrow} Flip Vanessa.',
    textBack: 'When an ally you control is destroyed, Vanessa may deal 1 shadow damage to target ally.',
    textBg: 'horde'
  }, {
    id: 40,
    image: '1-062.png',
    text: 'Pay 4 {arrow} Flip Elisa',
    textBack: 'When you pay a cost of X, the resulting value X is +1 instead.',
    textBg: 'horde'
  }, {
    id: 41,
    image: '1-063.png',
    text: 'Pay 3 {arrow} Flip Rockva',
    textBack: 'On your turn, prevent the first 3 damage Rockva would receive from defending allies.',
    textBg: 'horde'
  }, {
    id: 42,
    image: '1-064.png',
    text: 'Pay 3 {arrow} Flip Wraag',
    textBack: 'At the start of your turn, Wraag deal 1 nature damage to every target opposing hero or ally, for each of your abilities you have attach to it.',
    textBg: 'horde'
  }, {
    id: 43,
    image: '1-065.png',
    text: 'Pay 2 {arrow} Flip Brouto',
    textBack: 'Earth Totems you control have +2 HEALTH.',
    textBg: 'horde'
  }, {
    id: 44,
    image: '1-066.png',
    text: 'Pay 3 {arrow} Flip Sixsa',
    textBack: 'When an Air Totem you control is destroyed, you may pay 1. If you do, draw a card.',
    textBg: 'horde'
  }, {
    id: 45,
    image: '1-067.png',
    text: 'Pay 2 {arrow} Flip Tazaargrath',
    textBack: 'At the start of your turn if you control a fire totem, Tazaargrath deals 1 fire damage to target hero or ally.',
    textBg: 'horde'
  },
  /*
  {
     id: 999,
     image: 'delete.png',
     text: '<b>DELETE</B>',
     textBg: 'horde',
     originImage: 'card-images/delete.png'
  },
  */
  {
    id: 46,
    image: '1-068.png',
    text: 'Pay 3 {arrow} Flip Carolina',
    textBack: 'When an opposing ally is put into its owner\'s hand, draw a card.',
    textBg: 'horde'
  }, {
    id: 47,
    image: '1-069.png',
    text: 'Pay 3 {arrow} Flip Brax.',
    textBack: 'When you play an ally, Brax deals 3 damage to it and gives it <b>Ferocity</b> this turn.<br /><br /><b>Deckbuilding:</b> You can only include orc allies in your deck.',
    textBg: 'horde'
  }, {
    id: 48,
    image: '1-070.png',
    text: 'Pay 3 {arrow} Flip Drougor',
    textBack: 'You pay 1 less to play armor equipment.',
    textBg: 'horde'
  }, {
    id: 49,
    image: '1-071.png',
    text: 'Pay 1 {arrow} Flip Ganezh.',
    textBack: 'You pay 1 less to play 2H weapons.',
    textBg: 'horde'
  }, {
    id: 50,
    image: '1-072.png',
    text: 'Pay 3 {arrow} Flip Kristarz.',
    textBack: 'Allies you control have <b>Berserk</b>.<br />At the end of your turn, put 2 damage on each of your allies.<br /><br /><b>Deckbuilding:</b> You can only include troll allies in your deck.',
    textBg: 'horde'
  }, {
    id: 51,
    image: '1-073.png',
    text: 'Pay 3 {arrow} Flip Ragegar.',
    textBack: 'Weapons you control have +1 ATK.',
    textBg: 'horde'
  }]
}, {
  id: 5,
  name: 'Locations',
  cards: [{
    id: 1,
    image: '1-074.png',
    text: 'When you play a card, add an Exploration counter.<br />{exhaust}, remove four Exploration counters {arrow} You pay 3 less to play your next card this turn.',
    textBg: 'neutral'
  }, {
    id: 2,
    image: '1-075.png',
    text: 'You pay 1 more to complete quests.<br />When you complete a quest, add an Exploration counter.<br />{exhaust}, remove five Exploration counters {arrow} You pay 10 less to play your next card this turn. ',
    textBg: 'neutral'
  }, {
    id: 3,
    image: '1-076.png',
    text: 'When you play a Northrend <i>(Scourgewar,Wrathgate, or Icecrown)</i> ally, add an Exploration counter.<br />{exhaust}, remove three Explorations counters {arrow} Draw a card. ',
    textBg: 'neutral'
  }, {
    id: 4,
    image: '1-077.png',
    text: 'When a player discards a card, add an Exploration counter.<br />{exhaust}, remove three Exploration counters {arrow} Your hero deals 4 shadow damage to target hero or ally. ',
    textBg: 'neutral'
  }, {
    id: 5,
    image: '1-078.png',
    text: 'When you play a card, add an Exploration counter.<br />{exhaust}, remove three Exploration counters {arrow} Draw three cards, then discard three cards.',
    textBg: 'neutral'
  }, {
    id: 6,
    image: '1-079.png',
    text: 'When you complete a quest, put a token ability into play named Tuskarr Meal with "<b>Ongoing:</b> Attached ally has +1/+1", and attach it to target friendly ally.',
    textBg: 'neutral',
    originImage: 'card-images/tokens/tuskarr-meal.png' // replace with tuskarr meal token

  }, {
    id: 7,
    image: '1-080.png',
    text: 'When you play a card with cost 2 or less, add an Expedition counter.<br />{exhaust}, remove five Expedition counters {arrow} You pay 4 less to complete your next quest this turn. ',
    textBg: 'neutral'
  }, {
    id: 8,
    image: '1-081.png',
    text: 'When you play a card, add an Expedition counter.<br />If you completed a Northrend (Scourgewar, Wrathgate, or Icecrown) quest this turn: {exhaust}, remove three Expedition counters {arrow} Draw a card.',
    textBg: 'neutral'
  }, {
    id: 9,
    image: '1-082.png',
    text: 'When you play an ally, add an Exploration counter.<br />On your turn: Remove three Exploration counters {arrow} Reveal cards from your deck until you find a monster ally and put it into your hand. Then shuffle your deck.',
    textBg: 'neutral'
  }, {
    id: 10,
    image: '1-083.png',
    text: 'You pay 2 more to complete quests.<br />When you complete a quest, draw a card. ',
    textBg: 'neutral'
  }, {
    id: 11,
    image: '1-084.png',
    //
    text: 'When you complete a quest from Outland <i>(Dark Portal, Outland, Legion, Betrayer, Illidan, Black Temple)</i>, add an Exploration counter.<br />{exhaust}, remove three Exploration counters {arrow} Draw two cards.',
    textBg: 'neutral'
  }, {
    id: 12,
    image: '1-085.png',
    text: 'When you place a resource, add a Portal counter.<br />{exhaust}, remove four portal counters {arrow} Put a 0 {atk-nature} /3 {hp} Portal ally token named Portal to Moonglade into play with "At the start of your turn, destroy this ally and draw two cards."',
    textBg: 'neutral',
    originImage: 'card-images/tokens/portal-to-moonglade.png' // replace with portal to moonglade token

  }, {
    id: 13,
    image: '1-086.png',
    text: 'When you play an ability, add a Tome counter.<br />{exhaust}, remove four Tome counters {arrow} <b>Delve</b>. Draw a card.',
    textBg: 'neutral'
  }, {
    id: 14,
    image: '1-087.png',
    text: 'When you play a totem, add a Spirit counter.<br />{exhaust}, remove three Spirit counters {arrow} Put target totem from your graveyard into play.',
    textBg: 'neutral'
  }, {
    id: 15,
    image: '1-088.png',
    text: 'When you play a card, add a Fel counter.<br />On your turn: Remove five Fel counters from Dreadscar Rift and destroy an ally you control. If you do, put a 5 {atk-melee} / 5 {hp} Infernal demon ally token into play.',
    textBg: 'neutral',
    originImage: 'card-images/tokens/infernal.png'
  }, {
    id: 16,
    image: '1-089.png',
    text: '<b>Human Hero Required.</b><br />When a card enters your graveyard, add a Memorial counter.<br />{exhaust}, remove three Memorial counters {arrow} Put target card with cost 2 or less from your graveyard into your hand.',
    textBg: 'alliance'
  }, {
    id: 17,
    image: '1-090.png',
    text: '<b>Worgen Hero Required</b><br />When you play a card, add an Exploration counter.<br />{exhaust}, remove five Exploration counters {arrow} Put two 1 {atk-melee} / 1 {hp} Silverbrook Worgen token allies into play.',
    textBg: 'alliance',
    originImage: 'card-images/refs/silverbrook-worgens.png'
  }, {
    id: 18,
    image: '1-091.png',
    text: '<b>Human Hero Required</b><br />When you complete a quest, add an Exploration counter.<br />{exhaust}, remove two Exploration counters {arrow} You pay 1 less to play allies this turn, to a minimum of 1',
    textBg: 'alliance'
  }, {
    id: 19,
    image: '1-092.png',
    text: 'When you play a card, add an Exploration counter.<br />{exhaust}, remove 10 Exploration counters {arrow} You pay 2 less to play allies this turn.',
    textBg: 'alliance'
  }, {
    id: 20,
    image: '1-093.png',
    text: '<b>Blood Elf Hero Required</b><br />Blood Elf allies in your party has +2 Health.<br />When you play an ability, add Mana counters equal to the cost of that ability.<br />At the start of your turn, for each Blood Elf ally you control: Remove a Mana counter. If you can\'t, destroy that ally.',
    textBg: 'horde'
  }, {
    id: 21,
    image: '1-094.png',
    text: '<b>Undead Hero Required</b><br />When you put an ally into your graveyard, add a Grave counter.<br />Pay 2, remove two Grave counters {arrow} You may play target Undead ally from your graveyard.',
    textBg: 'horde'
  }, {
    id: 22,
    image: '1-095.png',
    text: '<b>Tauren Hero Required</b><br />If you completed a quest this turn: {exhaust} {arrow} Taurens with an attachment in you party has <b>Assault 1</b> this turn.',
    textBg: 'horde'
  }, {
    id: 23,
    image: '1-096.png',
    text: 'On you turn: {exhaust}, destroy a Goblin ally in you party {arrow} Draw a card.',
    textBg: 'horde'
  }, {
    id: 24,
    image: '1-097.png',
    text: 'When you play a card, add an Exploration counter.<br />{exhaust}, remove ten Exploration counters {arrow} Allies you control have <b>Assault 2</b> this turn.',
    textBg: 'horde'
  }]
}, {
  id: 6,
  name: 'Master Heroes',
  cards: [{
    id: 1,
    image: '1-098.png',
    //
    text: 'Destroy target ready ally in your party. If you do, you may pay X less to play Teron, where X is the cost of that ally, up to 4.<br /><b>Heritage. Hardiness 1.</b><br />Effects from allies in your party, with powers that triggers upon being destroyed, may trigger twice if you choose to.',
    textBg: 'masterhero'
  }, {
    id: 2,
    image: '1-099.png',
    text: '<b>Alliance Hero Required</b><br />You pay 4 less to play Malfurion if you control three or more attachments.<br /><b>Heritage</b> <i>(Copy the replaced hero\'s power)</i><br />Friendly heroes and allies with an attachment you control have <b>Hardiness 1</b>.',
    textBg: 'masterhero'
  }, {
    id: 3,
    image: '1-100.png',
    text: '<b>Horde Hero Required</b><br />You pay 4 less to play Sylvanas if you control 3 or more allies. <br /><b>Heritage. Long-Range.</b>Once per turn: Target ally you control has <b>Long-Range</b> this turn.',
    textBg: 'masterhero'
  }, {
    id: 4,
    image: '1-101.png',
    text: 'You pay 4 less to play Khadgar if you control three or more ongoing abilities.<br /><b>Heritage</b> <i>(Copy the replaced hero\'s power)</i><br />You pay 1 less for each ongoing ability you control up to three, to play abilities to a minimum of 1.',
    textBg: 'masterhero'
  }, {
    id: 5,
    image: '1-102.png',
    text: '<b>Alliance Hero Required</b><br />You pay 4 less to play Bregolas if you completed two quests this turn.<br /><b>Heritage</b> <i>(Copy the replaced hero\'s power)</i><br />You pay 4 less to strike with weapons.<br />Pay 2 {arrow-white} Play target weapon from your graveyard, paying its cost.',
    textBg: 'masterhero'
  }, {
    id: 6,
    image: '1-103.png',
    text: '<b>Alliance Hero Required</b><br />You pay 4 less to play Tyrande if your hero healed 4 or more damage this turn.<br /><b>Heritage. Mend 1</b><br />When you put a resource into play face up, Tyrande deals 1 arcane damage to all opposing allies. ',
    textBg: 'masterhero'
  }, {
    id: 7,
    image: '1-104.png',
    //
    text: '<b>Alliance or Horde Hero Required</b><br />You pay 4 less to play Valeera if your hero dealt fatal combat damage to an ally this turn.<br /><b>Heritage. Stealth. Assault 2</b><br />Your instant abilities cost 1 less to play on opponents\' turns.',
    textBg: 'masterhero'
  }, {
    id: 8,
    image: '1-105.png',
    //
    text: 'You pay 4 less to play Drek\'thar, if you control 3 or more Totems.<br /><b>Heritage</b> <i>(Copy the replaced hero\'s power)</i><br />Once on your turn, you may look at the top card of your deck. You may play that card paying 1 less for each Totem you control.',
    textBg: 'masterhero'
  }, {
    id: 9,
    image: '1-106.png',
    //
    text: 'You pay 4 less to play Gul\'dan if your hero dealt 4 or more damage this turn.<br /><b>Heritage</b> <i>(Copy the replaced hero\'s power)</i><br />{exhaust}, destroy an ally in your party {arrow-white} Gul\'dan deals shadow damage to an opposing hero or ally equal to the cost of the destroyed ally and heals damage from himself for each damage dealt this way.',
    textBg: 'masterhero'
  }, {
    id: 10,
    image: '1-107.png',
    //
    text: '<b/>Horde Hero Required</b><br />You pay 4 less to play Grommash, if you exhausted an axe to strike this turn.<br /><b>Heritage. Assault 1.</b><br /><b>First Strike</b> (If this character would deal fatal combat damage to another character, prevent all damage dealt to this character that combat.)',
    textBg: 'masterhero'
  }]
}, {
  id: 7,
  name: 'Quests',
  cards: [{
    id: 1,
    image: '1-108.png',
    text: 'Pay 3 and put two damage on your hero to complete this quest.<br /><b>Reward:</b> Look at the top four cards in your deck.<br />Put one into your hand, one on top of your deck, one in your graveyard, and remove one from game.',
    textBg: 'neutral'
  }, {
    id: 2,
    image: '1-109.png',
    text: 'Pay 3 to complete this quest. <b>Reward:</b> Draw a card.<br />If there are 6 or more allies in your graveyard, draw a card.<br />If there are 12 or more allies in your graveyard, draw a card.',
    textBg: 'neutral'
  }, {
    id: 3,
    image: '1-110.png',
    text: 'Pay X and exhaust two resources you control to complete this quest.<br /><b>Reward:</b> Search your deck for an equipment with cost X and put it into play exhausted.',
    textBg: 'neutral'
  }, {
    id: 4,
    image: '1-111.png',
    text: 'Pay 3 to complete this quest.<br /><b>Reward:</b> Draw a card.<br />If you completed a quest named The Witch\'s Bane this turn, draw another card.',
    textBg: 'neutral',
    originImage: 'card-images/1-121.png'
  }, {
    id: 5,
    image: '1-112.png',
    text: 'Pay 2 to complete this quest.<br /><b>Reward:</b> Draw a card.<br />If you control a location named Blackrock Mountain, draw another card.',
    textBg: 'horde',
    originImage: 'card-images/1-075.png'
  }, {
    id: 6,
    image: '1-113.png',
    text: 'Pay 2 and discard a card to complete this quest.<br /><b>Reward:</b> At the start of your next turn, draw two cards.',
    textBg: 'neutral'
  }, {
    id: 7,
    image: '1-114.png',
    text: 'Pay 3 to complete this quest.<br />Reward:</b> Put a 0 {atk-melee} / 4 {hp} Beast ally token named Sea Turtle into play with Mount (1) and "{exhaust} {arrow} You pay 3 less to complete your next quest this turn."',
    textBg: 'neutral',
    originImage: 'card-images/tokens/sea-turtle.png'
  }, {
    id: 8,
    image: '1-115.png',
    text: '<b>Daily Quest</b> <i>(When completing this quest, it will not be turned face down)</i><br />Pay 3, {exhaust} {arrow} Complete this quest.<br /><b>Reward:</b> Draw a card.',
    textBg: 'neutral'
  }, {
    id: 9,
    image: '1-116.png',
    text: 'Pay 1 and discard a card to complete this quest.<br /><b>Reward:</b> When an opponent player discard a card this turn, draw a card.',
    textBg: 'neutral'
  }, {
    id: 10,
    image: '1-117.png',
    text: 'If you have two or more allies in your party: Pay 3 to complete this quest.<br /><b>Reward:</b> Put target ability from your graveyard into your hand.',
    textBg: 'neutral'
  }, {
    id: 11,
    image: '1-118.png',
    text: 'Pay 3 to complete this quest.<br /><b>Reward:</b> Draw a card.<br />You pay 2 less next time you complete a quest named Razorfen Downs this turn.',
    textBg: 'neutral',
    originImage: 'card-images/1-117.png'
  }, {
    id: 12,
    image: '1-119.png',
    text: 'Pay 4  to complete this quest.<br /><b>Reward:</b> Each time a hero or ally you control destroys an opposing ally this turn, draw a card to a maximum of three.',
    textBg: 'neutral'
  }, {
    id: 13,
    image: '1-120.png',
    text: 'If there are three or more allies in you party: Pay 3 to complete this quest.<br /><b>Reward:</b> Draw a card. If you control a location named Arathi Highlands, draw another card.',
    textBg: 'neutral',
    originImage: 'card-images/1-074.png'
  }, {
    id: 14,
    image: '1-121.png',
    text: 'Pay 1 and remove target ally in a graveyard from the game to complete this quest.<br /><b>Reward:</b> Put an ally from your graveyard on top of your deck.',
    textBg: 'neutral'
  }, {
    id: 15,
    image: '1-122.png',
    text: 'Pay 1 and discard a card to complete this quest.<br /><b>Reward</b>: Target opponent discard a random card.',
    textBg: 'neutral'
  }, {
    id: 16,
    image: '1-123.png',
    text: 'Pay 3 and put two damage counters on your hero to complete this quest.<br /><b>Reward:</b> Put a 2 {atk-melee} / 2 {hp} Orc Warrior ally token named Blackrock Warrior into play with <b>Ferocity</b> and "This ally can only attack heroes".<br />If you control a location named Blackrock Mountain, draw a card.',
    textBg: 'neutral',
    originImage: 'card-images/refs/black-rock-loc-n-orc.png'
  }, {
    id: 17,
    image: '1-124.png',
    text: 'Exhaust two allies in your party to complete this quest. Allies exhausted this way can\'t ready during your next ready step.<br /><b>Reward:</b> At the end of your turn, if no damage was done this turn, draw two cards.',
    textBg: 'alliance'
  }, {
    id: 18,
    image: '1-125.png',
    text: 'If your hero prevented damage on a friendly hero or ally or exhausted to protect this turn: Pay 1 to complete this quest.<br /><b>Reward:</b> Put the top card from your graveyard into your hand.',
    textBg: 'alliance'
  }, {
    id: 19,
    image: '1-126.png',
    text: 'If you control an Eastern Kingdoms location: Pay 3 to complete this quest.<br /><b>Reward:</b> Return target ally in your party to your hand.<br />Draw a card.',
    textBg: 'alliance'
  }, {
    id: 20,
    image: '1-127.png',
    text: 'Exhaust two allies in your party that share the same race to complete this quest.<br /><b>Reward:</b> You may ready up to two resources.',
    textBg: 'horde'
  }, {
    id: 21,
    image: '1-128.png',
    text: 'Pay 4 to complete this quest. You pay 1 less to complete this quest for each other Quel\'Thalas quest or location you control.<br /><b>Reward:</b> You may add two counters to target card you control.',
    textBg: 'horde'
  }]
}, {
  id: 8,
  name: 'Tokens',
  cards: [{
    id: 1,
    image: 'tokens/bad-voodoo-poison.png',
    textBg: 'spell',
    originImage: 'card-images/1-017.png',
    text: '<b>Ongoing:</b> At the start of your turn, your hero deals 1 shadow damage to attached character.'
  }, {
    id: 2,
    image: 'tokens/tuskarr-meal.png',
    textBg: 'spell',
    originImage: 'card-images/1-079.png',
    text: '<b>Ongoing:</b> Attached ally has +1/+1.'
  }, {
    id: 3,
    image: 'tokens/black-rock-orc.png',
    text: '<b>Ferocity.</b><br />This ally can only attack heroes.',
    textBg: 'neutral',
    originImage: 'card-images/1-123.png'
  }, {
    id: 4,
    image: 'tokens/blue-dragonkin.png',
    textBg: 'neutral',
    originImage: 'card-images/refs/dragonwrath.png'
  }, {
    id: 5,
    image: 'tokens/demon-gnome.png',
    text: '(Is a copy of an ally and is also a Demon)',
    textBg: 'neutral',
    originImage: 'card-images/refs/demonic-corruption.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4033'
  }, {
    id: 6,
    image: 'tokens/falstad.png',
    textBg: 'neutral',
    text: '<b>Ferocity</b>',
    originImage: 'card-images/refs/council-of-three-hammers.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4129'
  }, {
    id: 7,
    image: 'tokens/flame-of-azzinoth-ferocity.png',
    text: '<b>Ferocity</b>',
    textBg: 'neutral',
    originImage: 'card-images/refs/warglaive-of-azzinoth-1.png'
  }, {
    id: 8,
    image: 'tokens/flame-of-azzinoth-protector.png',
    text: '<b>Protector</b>',
    textBg: 'neutral',
    originImage: 'card-images/refs/warglaive-of-azzinoth-2.png'
  }, {
    id: 9,
    image: 'tokens/flame-of-azzinoth-monster.png',
    //text: '<b>Flame of Azzinoth &mdash; Monster',
    textBg: 'monster',
    originImage: 'card-images/refs/warglaive-of-azzinoth.png'
  }, {
    id: 10,
    image: 'tokens/ghoul.png',
    textBg: 'neutral' //originImage: 'card-images/1-050.png',

  }, {
    id: 11,
    image: 'tokens/ghoul-2.png',
    text: '<i>(Alternate art)</i>',
    textBg: 'neutral' //originImage: 'card-images/1-050.png',

  }, {
    id: 12,
    image: 'tokens/imp.png',
    textBg: 'neutral',
    originImage: 'card-images/1-050.png'
  }, {
    id: 13,
    image: 'tokens/infernal.png',
    textBg: 'neutral',
    originImage: 'card-images/1-088.png'
  }, {
    id: 14,
    image: 'tokens/jaraxxus.png',
    text: 'Jaraxxus can only be destroyed by fatal damage.',
    textBg: 'neutral',
    originImage: 'card-images/1-051.png'
  }, {
    id: 15,
    image: 'tokens/mirror.png',
    text: 'If damage would be dealt to your hero, it\'s dealt to a random Mirror or hero you control instead.',
    textBg: 'neutral',
    originImage: 'card-images/refs/mirror-image.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=725'
  }, {
    id: 16,
    image: 'tokens/moira.png',
    textBg: 'neutral',
    text: '<b>Mend 5</b>',
    originImage: 'card-images/refs/council-of-three-hammers.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4129'
  }, {
    id: 17,
    image: 'tokens/muradin.png',
    textBg: 'neutral',
    text: '<b>Protector</b>',
    originImage: 'card-images/refs/council-of-three-hammers.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4129'
  }, {
    id: 18,
    image: 'tokens/murloc.png',
    textBg: 'monster',
    originImage: 'card-images/refs/murloc-king.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=6760'
  }, {
    id: 19,
    image: 'tokens/naga.png',
    textBg: 'neutral',
    originImage: 'card-images/refs/naga-summoners.png'
  }, {
    id: 20,
    image: 'tokens/onyxia.png',
    textBg: 'neutral',
    originImage: 'card-images/refs/nefarian.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4013'
  }, {
    id: 21,
    image: 'tokens/portal-to-moonglade.png',
    text: 'At the start of your turn, destroy this ally and draw two cards.',
    textBg: 'neutral',
    originImage: 'card-images/1-085.png'
  }, {
    id: 22,
    image: 'tokens/red-dragonkin.png',
    textBg: 'neutral',
    originImage: 'card-images/refs/red-dragonkin-summoners.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/search=red+dragonkin+token'
  }, {
    id: 23,
    image: 'tokens/ringo.png',
    text: 'At the start of your turn, draw a card.',
    textBg: 'neutral',
    originImage: 'card-images/refs/lost.png',
    //originUrl: 'http://wowcards.info/card/outland/en/239/Lost'
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=3546'
  }, {
    id: 24,
    image: 'tokens/sea-turtle.png',
    textBg: 'neutral',
    originImage: 'card-images/1-114.png',
    text: '{exhaust} {arrow} You pay 3 less to complete your next quest.'
  }, {
    id: 25,
    image: 'tokens/silverbrook-worgen-1.png',
    textBg: 'neutral',
    originImage: 'card-images/1-090.png'
  }, {
    id: 26,
    image: 'tokens/silverbrook-worgen-2.png',
    textBg: 'neutral',
    originImage: 'card-images/1-090.png'
  },
  /*
  {
     id: 27,
     image: 'tokens/the-polly-pirate.png',
     textBg: 'neutral',
     originImage: 'card-images/1-043.png'
  },
  */
  {
    id: 28,
    image: 'tokens/tiger.png',
    textBg: 'neutral',
    text: '<b>Ferocity</b>',
    originImage: 'card-images/refs/avatar-of-the-wild.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=60'
  }, {
    id: 29,
    image: 'tokens/tooga.png',
    textBg: 'neutral',
    originImage: 'card-images/refs/toogasquest.png',
    //originUrl: 'http://wowcards.info/card/azeroth/en/359/Toogas-Quest'
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=3674'
  }, {
    id: 30,
    image: 'tokens/treant-1.png',
    textBg: 'neutral',
    originImage: 'card-images/refs/treants.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/search=treant+token'
  }, {
    id: 31,
    image: 'tokens/treant-2.png',
    text: '<i>(Alternate art)</i>',
    textBg: 'neutral',
    originImage: 'card-images/refs/treants.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/search=treant+token'
  }, {
    id: 32,
    image: 'tokens/treant-ferocity.png',
    text: '<b>Ferocity</b>',
    textBg: 'neutral',
    originImage: 'card-images/refs/force-of-nature.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=466'
  }, {
    id: 33,
    image: 'tokens/twilight-dragonkin.png',
    text: '<b>Twilight Dragonkin</b>',
    textBg: 'neutral',
    originImage: 'card-images/refs/twilight-citadel.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4207'
  }, {
    id: 34,
    image: 'tokens/wyrmrest-vanquisher.png',
    textBg: 'neutral',
    text: 'When you place a resource face up, you may draw a card.',
    originImage: 'card-images/refs/onrubywings.png',
    //originUrl: 'http://wowcards.info/card/wrathgate/en/211/On-Ruby-Wings'
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=3560'
  }]
}, {
  id: 9,
  name: 'Raid cards',
  cards: [{
    id: 1,
    image: 'tokens/corrupted-blood.png',
    text: '<b>Ferocity</b>',
    textBg: 'neutral' //originImage: 'card-images/refs/brood-of-onyxia.png',
    //originUrl: 'http://wow.tcgbrowser.com/#!/search=whelp&raid=true'

  }, {
    id: 2,
    image: 'tokens/onyxian-whelp.png',
    textBg: 'neutral',
    originImage: 'card-images/refs/brood-of-onyxia.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/search=whelp&raid=true'
  }, {
    id: 3,
    image: 'tokens/scarlet-trainee-1.png',
    text: '<b>Ferocity</b>',
    textBg: 'neutral',
    originImage: 'card-images/refs/reinforcements.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4643'
  }, {
    id: 4,
    image: 'tokens/scarlet-trainee-2.png',
    text: '<b>Ferocity</b>',
    textBg: 'neutral',
    originImage: 'card-images/refs/reinforcements.png',
    originUrl: 'http://wow.tcgbrowser.com/#!/cardid=4643'
  }]
}];
"use strict";

function createTable() {
  $('#order-table').html(createTableHtml());
  createCardTooltips();
  addRowFilterListeners();
}

function createTableHtml() {
  var html = '';
  html = html + '<div id="table">';
  html = html + createTableHeaders();
  html = html + createTableContent();
  html = html + createTableFooter();
  html = html + '</div>';
  return html;
}

function createTableHeaders() {
  var html = '';
  html = html + "\n      <div class=\"table-row\">\n         <div class=\"table-cell\"></div>\n         <div class=\"table-cell\"></div>\n   ";
  users.forEach(function (user) {
    html = html + "\n         <div class=\"table-cell user-cell ".concat(user.image, "\">\n         </div>"); //<img src='user-images/${user.image}' title='${user.name}' class='user-image' />
  });
  html = html + "\n         <div class=\"table-cell\">Total</div>\n      </div>\n   ";
  return html;
}

function createTableContent() {
  var html = '';
  cards.forEach(function (category) {
    var categoryId = category.id,
        cards = category.cards;
    html = html + createCategoryHeadline(category.name);
    ;
    cards.forEach(function (card) {
      html = html + createTableRow(categoryId, card.id);
    });
  });
  return html;
}

function createCategoryHeadline(categoryName) {
  return "<h1>".concat(categoryName, "</h1>");
}

function createTableRow(categoryId, cardId) {
  var html = '',
      cellCategoryId,
      cellCardId,
      cellCardImage,
      cellCardOriginImage,
      cellCardOriginUrl,
      cellCardSet,
      rowId; // Getting values

  cards.forEach(function (category) {
    if (category.id === categoryId) {
      cellCategoryId = category.id;
      category.cards.forEach(function (card) {
        if (card.id === cardId) {
          cellCardId = card.id;
          cellCardImage = card.image;
          cellCardOriginImage = card.originImage;
          cellCardOriginUrl = card.originUrl;
          cellCardSet = card.set ? card.set : 0;
        }

        return;
      });
      return;
    }
  });
  rowId = "row-" + cellCategoryId + "-" + cellCardId;
  html = html + "<div class=\"table-row\" id=\"row-".concat(rowId, "\" data-set=").concat(cellCardSet, ">");
  html = html + "\n      <div class=\"table-cell\">\n         <div class='thumb-container'>\n            <img src='card-images/".concat(cellCardImage, "' alt='Missing image' class='card-thumb' id='card-thumb-").concat(cellCategoryId, "-").concat(cellCardId, "' title='.' />\n         </div>\n      </div>\n   ");

  if (cellCardOriginImage !== undefined) {
    if (false
    /*cellCardOriginUrl !== undefined */
    ) html = html + "\n            <div class=\"table-cell\">\n               <div class='thumb-container'>\n                  <a href='".concat(cellCardOriginUrl, "'>\n                     <img src='").concat(cellCardOriginImage, "' alt='Missing image' class='card-thumb' id='card-origin-thumb-").concat(cellCategoryId, "-").concat(cellCardId, "' title='Nej' />\n                  </a>\n               </div>\n            </div>\n         ");else {
      html = html + "\n            <div class=\"table-cell\">\n               <div class='thumb-container'>\n                  <img src='".concat(cellCardOriginImage, "' alt='Missing image' class='card-thumb' id='card-origin-thumb-").concat(categoryId, "-").concat(cardId, "' title='Maaske' />\n               </div>\n            </div>\n         ");
    }
  } else {
    html = html + "\n         <div class=\"table-cell\"></div>\n      ";
  }

  users.forEach(function (user) {
    html = html + "<div id='".concat(categoryId, "-").concat(cardId, "-").concat(user.id, "' class=\"table-cell\">");
    if (user.id === loggedInUserId) html = html + createNumberInputField(0, categoryId, cardId, user.id);else html = html + "0";
    html = html + "</div>";
  });
  html = html + "<div class=\"table-cell\" id='total-card-".concat(categoryId, "-").concat(cardId, "'>0</div>");
  html = html + "</div>";
  return html;
}

function createTableFooter() {
  var html = "\n      <h1>Total</h1>\n      <div class=\"table-row\">\n         <div class=\"table-cell\"></div>\n         <div class=\"table-cell\"></div>\n   ";
  users.forEach(function (user) {
    html = html + "<div class=\"table-cell\" id=\"total-user-".concat(user.id, "\">0</div>");
  });
  html = html + "\n         <div class=\"table-cell\" id='total-total'>0</div>\n      </div>\n   ";
  return html;
}

function updateTableCellsData(data) {
  var orderList = JSON.parse(data); //orderList = ordersWithCats; // Override

  for (var index in orderList) {
    var userId = index,
        categories = orderList[index].categories;
    categories.forEach(function (category) {
      var categoryId = category.id,
          cards = category.cards;
      cards.forEach(function (card) {
        updateTableCellData(card.id, userId, card.qty, categoryId);
      });
    });
  }

  addInputButtonListeners();
  updateCellTotals();
}

function updateTableCellData(cardId, userId, cardQuantity, categoryId) {
  var html = cardQuantity;

  if (parseInt(userId) === loggedInUserId) {
    html = createNumberInputField(cardQuantity, categoryId, cardId, userId);
  } else {}

  $('#' + categoryId + "-" + cardId + "-" + userId).html(html);
}

function updateCellTotals() {
  var userTotalArray = new Array(),
      cardTotalArray = new Array(),
      total = 0;
  cards.forEach(function (category) {
    var categoryId = category.id;
    category.cards.forEach(function (card) {
      users.forEach(function (user) {
        var cellId = '#' + categoryId + "-" + card.id + "-" + user.id;
        var value = $('#input-' + categoryId + "-" + card.id + "-" + user.id).val();
        if (value === undefined) value = $('#' + categoryId + "-" + card.id + "-" + user.id).html();

        if (value === undefined) {
          value = 0;
          console.error("Value is undefined: " + cellId);
        }

        value = parseInt(value);
        total = total + value;
        if (userTotalArray[user.id] === undefined) userTotalArray[user.id] = value;else userTotalArray[user.id] = userTotalArray[user.id] + value;

        if (cardTotalArray[card.id] === undefined) {
          cardTotalArray[card.id] = [];
        }

        if (cardTotalArray[card.id][categoryId] === undefined) cardTotalArray[card.id][categoryId] = value;else cardTotalArray[card.id][categoryId] = cardTotalArray[card.id][categoryId] + value;
      });
    });
  });
  cards.forEach(function (category) {
    var categoryId = category.id;
    category.cards.forEach(function (card) {
      var cardId = card.id;
      updateCardTotals(cardId, categoryId, cardTotalArray[cardId][categoryId]);
    });
  });
  users.forEach(function (user) {
    var userId = user.id;
    updateUserTotals(userId, userTotalArray[userId]);
  });
  $('#total-total').html(total);
}

function updateCardTotals(cardId, categoryId, cardQty) {
  $('#total-card-' + categoryId + '-' + cardId).html(cardQty);
}

function updateUserTotals(userId, userQty) {
  $('#total-user-' + userId).html(userQty);
}

function getCellValuesForUser(id) {
  var data = new Array(),
      categoryArray = new Array();
  cards.forEach(function (category) {
    var cardsData = new Array();
    category.cards.forEach(function (card) {
      var value = $('#input-' + category.id + "-" + card.id + "-" + id).val();
      if (value === undefined) value = $('#' + card.id + "-" + id).html();
      if (value === undefined) value = 0;
      cardsData.push({
        id: card.id,
        qty: value
      });
    });
    categoryArray.push({
      id: category.id,
      cards: cardsData
    });
  });
  data.push({
    userId: id,
    categories: categoryArray
  });
  return JSON.stringify(data);
}

function addRowFilterListeners() {
  $('.table-row').on('filterChanged', function (event) {
    var rowId = event.target.id,
        row,
        cardSet;

    if (!rowId == "") {
      row = $("#" + rowId);
      cardSet = parseInt(row[0].dataset.set);

      if (cardSet != tableFilter && cardSet != -1 && tableFilter != 0) {
        row.addClass("hidden");
      } else {
        row.removeClass("hidden");
      }
    }
  });
}
"use strict";

var users = [{
  id: 2,
  name: 'Duke',
  image: 'duke'
}, {
  id: 6,
  name: 'Hunter',
  image: 'hunter'
}, {
  id: 5,
  name: 'Jolly',
  image: 'jolly'
}, {
  id: 1,
  name: 'Red',
  image: 'red'
}];