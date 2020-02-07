function openModal() {
	$('body').addClass('scroll-lock');
	$('#modal').addClass('open');
	$('#page').addClass('modal-open');

	$('#modal').on('click', function(event) {
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
	const dialog = getDialogSettings(type);

	let html = `
		<div class='modal-box dialog'>
			<div class='accent ${dialog.accent}'>
				<span>${dialog.title}</span>
				<button id='btn-close-dialog' class='dialog-icon'>X</button>
			</div>
			<div class='dialog-content-container'>
				<div class='dialog-content-illustration'><div>
				<svg class="icon">
					<use xlink:href="#icon-login" />
				</svg>
				</div></div>
				<div class='dialog-content'>${dialog.html}</div>
			</div>
			<div class='dialog-footer'>
				${dialog.negativeBtn ? `<button>${dialog.negativeBtn.title}</button>` : ''}
				${dialog.positiveBtn ? `<button>${dialog.positiveBtn.title}</button>` : ''}
			</div>
		</div>`;

	$('#modal').html(html);

	$('#btn-close-dialog').on('click', function(event) {
		closeModal();
	});

	$( "#login-btn" ).on( "click", function(event) {
		var username = $( "#login-username-input" ).val(),
			password = $( "#login-password-input" ).val();

		login(username, password);
	});
	
	openModal();
}

function getDialogSettings(type) {
	let settings = null;

	switch(type) {
		case 'login':	settings = createLoginDialogSettings(); break;
		case 'bad-request': settings = {title: '400 Error', html: 'Bad request', accent: 'accent-error'}; break;
		case 'test':	settings = {title: 'TEST', html: 'EXAMPLE', accent: 'accent-normal'}; break;
		default:		settings = {title: 'DEFAULT', html: 'NONE', accent: 'accent-normal'}; break;
	}

	return settings;
}

function createLoginDialogSettings() {
	const title = 'Login',
		html = `
		<form action='javascript:void(0);'>
			<label for='login-username-input'>Username</label>
			<input type='text' id='login-username-input' placeholder='Username' autocomplete='username' autofocus /><br />
			<label for='login-password-input'>Password</label>
			<input type='password' id='login-password-input' placeholder='Password' autocomplete='current-password' /><br />
			<button id='login-btn'>Login</button>
		</form>`;

		//<button id='login-btn'>Login</button>
	
		return {
			title: title,
			html: html,
			accent: 'accent-normal',
			icon: 'login',
			positiveBtn: {
				title: 'Login'
			},
			negativeBtn: {
				title: 'Cancel'
			}
		};
}