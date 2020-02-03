function createModal() {
	console.log("createModal");
	let html = `<div class='modal-box'>CONTENT</div>`;

	$('#modal').html(html);
	$('#modal').addClass('open');
	$('#page').addClass('modal-open');

	$('#modal').on('click', function(event) {
		if (event.target !== this) {
			return false;
		}
		$('#modal').removeClass('open');
		$('#page').removeClass('modal-open');
	});
}