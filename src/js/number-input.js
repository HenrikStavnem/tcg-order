function createNumberInputField(value, categoryId, cardId, userId) {
   var html =
      `<div class='number-input'>
         <div class='number-input-left'>
            <input type='text' id='input-${categoryId}-${cardId}-${userId}' class='input-number-field' value='${value}'/>
         </div>

         <div class='number-input-right'>
            <input class='input-add-btn' type='button' id='input-${categoryId}-${cardId}-${userId}-add-btn' value='+' /><br />
            <input class='input-sub-btn' type='button' id='input-${categoryId}-${cardId}-${userId}-sub-btn' value='-' />
         </div>
      </div>`;

   return html;
}

function getInputId(btn, e) {
   var target = e.target.id;
   target = target.replace("input-","");
   target = target.replace("-" + btn + "-btn","");

   return target.split('-');
}

function addInputButtonListeners() {
   $( ".input-number-field" ).on( "input", function() {
      saveOrder();
   });

   $( ".input-number-field" ).on( "change", function() {
      saveOrder();
   });

   $( ".input-number-field" ).on( "blur", function(event) {
      var values = getInputId('add', event),
          value = $('#input-' + values[0] + '-' + values[1] + '-' + values[2]).val();

      value = value.replace(/\s/g, "");

      if (isNaN(value) || value < 0 || value == "") {
         $('#input-' + values[0] + '-' + values[1]).val(0);
      }

      updateCellTotals();
   });

   $( ".input-add-btn" ).on( "click", function(event) {
      var values = getInputId('add', event);

      increaseInputValue(values[0], values[1], values[2]);
      updateCellTotals();
      saveOrder();
   });

   $( ".input-sub-btn" ).on( "click", function(event) {
      var values = getInputId('sub', event);

      decreaseInputValue(values[0], values[1], values[2]);
      updateCellTotals();
      saveOrder();
   });
}

function increaseInputValue(categoryId, cardId, userId) {
   var currentValue = parseInt($( "#input-" + categoryId + "-" + cardId + "-" + userId).val());
   $( "#input-" + categoryId + "-" + cardId + "-" + userId).val( currentValue + 1);
}

function decreaseInputValue(categoryId, cardId, userId) {
   var currentValue = parseInt($( "#input-" + categoryId + "-" + cardId + "-" + userId).val());
   if (currentValue >= 1)
      $( "#input-" + categoryId + "-" + cardId + "-" + userId).val( currentValue - 1);
}
