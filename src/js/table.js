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

	html = html + `
		<div class="table-row user-row">
			<div class="table-cell short"></div>
			<div class="table-cell short"></div>
	`;

   users.forEach(function(user) {
      html = html + `
         <div class="table-cell short user-cell ${user.image}">
         </div>`;

         //<img src='user-images/${user.image}' title='${user.name}' class='user-image' />
   });

   html = html + `
         <div class="table-cell short">Total</div>
      </div>
   `;

   return html;
}

function createTableContent() {
    var html = '';

    cards.forEach(function(category) {
        var categoryId = category.id,
            cards = category.cards;

        html = html + createCategoryHeadline(category.name);;

        cards.forEach(function(card) {
            html = html + createTableRow(categoryId, card.id);
        });
    });

    return html;
}

function createCategoryHeadline(categoryName) {
   return `<h1>${categoryName}</h1>`;
}

function createTableRow(categoryId, cardId) {
	var html = '',
		cellCategoryId,
		cellCardId,
		cellCardImage,
		cellCardOriginImage,
		cellCardOriginUrl,
		cellCardSet,
		rowId,
		isWide = false,
		isOriginWide = false;

	// Getting values
	cards.forEach( function(category) {
		if (category.id === categoryId) {
			cellCategoryId = category.id;

			category.cards.forEach( function(card) {
				if (card.id === cardId) {
					cellCardId = card.id;
					cellCardImage = card.image;
					cellCardOriginImage = card.originImage;
					cellCardOriginUrl = card.originUrl;
					cellCardSet = card.set ? card.set : 0;
					isWide = (card.isWide);
					isOriginWide = (card.originIsWide);
				}
				return;
			});
		return;
		}
	});

	rowId = "row-" + cellCategoryId + "-" + cellCardId;
	let wideCls = isWide ? "wide" : "",
		originWideCls = isOriginWide ? "wide" : "nope";

	html = html + `<div class="table-row" id="row-${rowId}" data-set=${cellCardSet}>`;

	html = html + `
		<div class="table-cell thumb-container">
			<img src='card-images/${cellCardImage}' alt='Missing image' class='card-thumb ${wideCls}' id='card-thumb-${cellCategoryId}-${cellCardId}' title='.' />
		</div>
	`;

   if (cellCardOriginImage !== undefined) {
      if (false /*cellCardOriginUrl !== undefined */)
         html = html + `
            <div class="table-cell">
               <div class='thumb-container'>
                  <a href='${cellCardOriginUrl}'>
                     <img src='${cellCardOriginImage}' alt='Missing image' class='card-thumb' id='card-origin-thumb-${cellCategoryId}-${cellCardId}' title='Card' />
                  </a>
               </div>
            </div>
         `;
      else {
		html = html + `
			<div class="table-cell thumb-container">
				<img src='${cellCardOriginImage}' alt='Missing image' class='card-thumb ${originWideCls}' id='card-origin-thumb-${categoryId}-${cardId}' title='Relative card' />
			</div>
			`;
		}
	}
	else {
		html = html + `
			<div class="table-cell"></div>
		`;
	}

   users.forEach(function(user) {
      html = html + `<div id='${categoryId}-${cardId}-${user.id}' class="table-cell">`;

      if (user.id === loggedInUserId)
         html = html + createNumberInputField(0, categoryId, cardId, user.id);
      else
         html = html + "0";

      html = html + `</div>`;
   });

   html = html + `<div class="table-cell" id='total-card-${categoryId}-${cardId}'>0</div>`;

   html = html + `</div>`;

   return html;
}

function createTableFooter() {
   var html = `
		<h1>Total</h1>
		<div class="table-row total-row">
			<div class="table-cell short"></div>
			<div class="table-cell short"></div>
	`;

   users.forEach(function(user) {
		html = html + `<div class="table-cell short" id="total-user-${user.id}">0</div>`;
   });

   html = html + `
         <div class="table-cell short" id='total-total'>0</div>
      </div>
   `;

   return html;
}

function updateTableCellsData(data) {
   var orderList = JSON.parse(data);
      //orderList = ordersWithCats; // Override

   for (var index in orderList) {

      var userId = index,
          categories = orderList[index].categories;

      categories.forEach(function(category) {
         var categoryId = category.id,
             cards = category.cards;

         cards.forEach(function(card) {
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
   } else {
   }

   $('#' + categoryId + "-" + cardId + "-" + userId).html(html);
}

function updateCellTotals() {
   var userTotalArray = new Array(),
       cardTotalArray = new Array(),
       total = 0;

   cards.forEach(function(category) {
      var categoryId = category.id;

      category.cards.forEach(function (card) {
         users.forEach(function(user) {
            var cellId = '#' + categoryId + "-" + card.id + "-" + user.id;

            var value = $('#input-' + categoryId + "-" + card.id + "-" + user.id).val();

            if (value === undefined)
               value = $('#' + categoryId + "-" + card.id + "-" + user.id).html();
            if (value === undefined) {
               value = 0;
               console.error("Value is undefined: " + cellId);
            }

            value = parseInt(value);

            total = total + value;

            if (userTotalArray[user.id] === undefined)
               userTotalArray[user.id] = value;
            else
               userTotalArray[user.id] = userTotalArray[user.id] + value;

            if (cardTotalArray[card.id] === undefined) {
               cardTotalArray[card.id] = [];
            }

            if (cardTotalArray[card.id][categoryId] === undefined)
               cardTotalArray[card.id][categoryId] = value;
            else
               cardTotalArray[card.id][categoryId] = cardTotalArray[card.id][categoryId] + value;
         });
      });
   });

   cards.forEach(function(category) {
      var categoryId = category.id;
      category.cards.forEach(function(card) {
         var cardId = card.id;
         updateCardTotals(cardId, categoryId, cardTotalArray[cardId][categoryId]);
      });
   });

   users.forEach(function(user) {
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

   cards.forEach(function(category) {
      var cardsData = new Array();

      category.cards.forEach(function (card) {
         var value = $('#input-' + category.id + "-" + card.id + "-" + id).val();
         if (value === undefined)
            value = $('#' + card.id + "-" + id).html();
         if (value === undefined)
            value = 0;

         cardsData.push({id: card.id, qty: value});
      });

      categoryArray.push({id: category.id, cards: cardsData});
   });

   data.push({userId: id, categories: categoryArray});

   return JSON.stringify(data);
}

function addRowFilterListeners() {
    $('.table-row').on('filterChanged', function(event) {
        var rowId = event.target.id,
            row,
            cardSet;

        if (!rowId == "") {
            row = $("#" + rowId);
            cardSet = parseInt(row[0].dataset.set);

            if (cardSet != tableFilter && cardSet != -1 && tableFilter != 0) {
                row.addClass("hidden");
            }
            else {
                row.removeClass("hidden");
            }
        }
    });
}
