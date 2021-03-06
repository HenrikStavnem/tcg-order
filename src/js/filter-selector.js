function createFilterSelector() {
    var setList = [
        {name: 'Set 2: Allegiance', id: 2},
        {name: 'Set 1: Forgotten Heroes', id: 1},
        {name: 'Reborn: Into the Mists', id: 99}
    ],
    optionsHtml = "<option value='0' class='set-all'>All sets</option>", // No filter option
    html = "";

    setList.forEach( function(set) {
        optionsHtml = optionsHtml + "<option value=" + set.id + " class='set-" + set.ud + "' >" + set.name + "</option>";
    });

	html = `
		<label>
			Set filter
			<select id='set-selector'>${optionsHtml}</select>
		</label>`;

    $('#filter-selector').html(html);

    $('#set-selector').on('change', function() {
        updateTableFilter();
    });

}

function updateTableFilter() {
    var filter = parseInt($('#set-selector').val());

    tableFilter = filter;

    $('.table-row').trigger('filterChanged');
}
