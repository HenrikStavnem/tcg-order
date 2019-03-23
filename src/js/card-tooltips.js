function createCardTooltips() {

   cards.forEach( function(category) {
      var cards = category.cards,
          categoryId = category.id;

      cards.forEach( function(card) {
         createCardTooltip(categoryId, card.id);
      });
   });
}

function createCardTooltip(categoryId, cardId) {
   var card,
       text = "",
       textBg = 'neutral',
       extra = "";

   cards.forEach( function(category) {
    if (category.id === categoryId) {

       category.cards.forEach( function(cardCard) {
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
         text = "<b>Front:</b> " + card.text + "<br /><b>Back:</b> "+ card.textBack;
      } else {
         text = card.text;
      }

      text = replaceWithSymbols(text);

      extra = "<div class='extra " + textBg + "'><p>" + text + "</p></div>";
   }

   $( '#card-thumb-' + categoryId + "-" + cardId ).tooltip( {
      content: '<div class="tooltip"><img src="card-images/' + card.image + '" alt="" />' + extra + '</div>',
      track: true,
      show: false,
      hide: false,
      tooltipClass: 'red-tooltip',
      position: { my: "left+50 top-200", at: "right center", of: "BODY", collision: "flipfit" }
   });

   $( '#card-origin-thumb-' + categoryId + "-" + cardId ).tooltip( {
      content: '<div class="tooltip"><img src="' + card.originImage + '" alt="" /></div>',
      track: true,
      show: false,
      hide: false,
      tooltipClass: 'red-tooltip',
      position: { my: "left+50 top-200", at: "right center", of: "BODY", collision: "flipfit" }
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
