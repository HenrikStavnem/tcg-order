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
				${dialog.negativeBtn ? `<button id='btn-negative' data-btn-type='${dialog.negativeBtn.id}' ${dialog.negativeBtn.form ? `form='${dialog.negativeBtn.form}'` : ''}>${dialog.negativeBtn.title}</button>` : ''}
				${dialog.positiveBtn ? `<button id='btn-positive' data-btn-type='${dialog.positiveBtn.id}' ${dialog.positiveBtn.form ? `form='${dialog.positiveBtn.form}'` : ''}>${dialog.positiveBtn.title}</button>` : ''}
			</div>
		</div>`;

	$('#modal').html(html);

	$('#btn-close-dialog').on('click', function(event) {
		closeModal();
	});

	$('#btn-positive, #btn-negative').on( 'click', function(event) {
		const type = event.currentTarget.dataset.btnType;

		if (type) {
			switch(type) {
				case 'cancel': closeModal(); break;
				case 'login': login(); break;
				default: closeModal(); break;
			}
		}
	});

	$('#modal input').on('focus', function(event){
		const target = event.target,
			label = $("label[for='" + $(target).attr('id') + "']");

		$(label).closest('label').addClass('above');
	});

	$('#modal input').on('blur', function(event){
		const target = event.target,
			label = $("label[for='" + $(target).attr('id') + "']");

		if (target.value === '') {
			$(label).closest('label').removeClass('above');
		}
	});
	
	openModal();
}

function getDialogSettings(type) {
	let settings = null;

	switch(type) {
		case 'login':		settings = createLoginDialogSettings(); break;
		case 'auth-failed': settings = createAuthFailedDialogSettings(); break;
		case 'bad-request':	settings = createBadRequestDialogSettings(); break;
		case 'test':		settings = {title: 'TEST', html: 'EXAMPLE', accent: 'accent-normal'}; break;
		default:			settings = {title: 'DEFAULT', html: 'NONE', accent: 'accent-normal'}; break;
	}

	return settings;
}

function createLoginDialogSettings() {
	const title = 'Login',
		html = `
		<form id='login-form' action='javascript:void(0);'>
			<label for='login-username-input'>Username</label>
			<input type='text' id='login-username-input' autocomplete='username' autofocus /><br />
			<label for='login-password-input'>Password</label>
			<input type='password' id='login-password-input' autocomplete='current-password' /><br />
		</form>`;
	
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
	const title = 'Bad request',
		html = `<p>The username and password you have entered did not match our records.<br>Please try again.</p>`;

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
	const title = 'Bad request',
		html = `<p>The system was unable to perfom the desired action.<br>Please try again.</p>`;

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