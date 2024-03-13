export { clickEventHandler };

const check = (fieldname) => {

	const value = document.getElementById(fieldname).value;
	if (value.length === 0) {
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = `requires ${fieldname}`;
		errmsg.style.opacity = 1;
		return false;
	}

	console.log(`${fieldname}: ${value}`);
	return true
}

const inputs = () => {

	const fields = [
		'firstname',
		'lastname',
		'username',
		'email',
		'password',
		'password-confirmation'
	];

	for (const field of fields) {
		if (!check(field)) {
			return false;
		}
	}

	return true;
}

const password = () => {

	const p = document.getElementById('password').value;
	const pc = document.getElementById('password-confirmation').value;
	if (pc !== p) {
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = 'passwords do not match';
		errmsg.style.opacity = 1;
		return false;
	}

	console.log(`passwords ${p} and ${pc} match`);
	return true;
}

const clickEventHandler = (e) => {

	e.preventDefault();

	if (!inputs()) {
		return;
	}

	if (!password()) {
		return;
	}

	const errmsg = document.getElementById('error-message');
	errmsg.innerHTML = '';
	errmsg.style.opacity = 0;
}

/*

FrontEnd Demo						March 7, 2024

source: js/signup/module.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
