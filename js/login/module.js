export { clickEventHandler };

let locked = false;

const map = (prop) => {

	const map = {
		"firstname": "First Name",
		"lastname": "Last Name",
		"username": "Username",
		"email": "Email",
		"password": "Password",
		"password-confirmation": "Password Confirmation"
	};

	return map[prop];
};

const check = (fieldname) => {

	const value = document.getElementById(fieldname).value;
	if (value.length === 0) {
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = `requires ${map(fieldname)}`;
		errmsg.style.opacity = 1;
		return false;
	}

	console.log(`${fieldname}: ${value}`);
	return true;
};

const inputs = () => {

	const fields = [
		'email',
		'password'
	];

	for (const field of fields) {
		if (!check(field)) {
			return false;
		}
	}

	return true;
};

const clickEventHandler = async (e) => {

	e.preventDefault();

	if (locked) {
		console.log('locked');
		return;
	}

	if (!inputs()) {
		locked = false;
		return;
	}

	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const credentials = { email, password };
	console.log(credentials);
	const url = "http://localhost:8080/api/usr/login";
	const opt = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(credentials)
	};
	try {
		locked = true;
		const response = await fetch(url, opt);
		const json = await response.json();
		console.log(json);
		const message = document.getElementById('message');
		const errmsg = document.getElementById('error-message');
		message.innerHTML = `successful login with email ${email}`;
		errmsg.innerHTML = '';
		errmsg.style.opacity = 0;
		setTimeout(() => {
			window.location.replace('index.html');
		}, 2000);
	} catch (err) {
		console.error(`error: ${err}`);
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = `error: ${err}`;
		errmsg.style.opacity = 1;
		locked = false;
	}
};

/*

FrontEnd Demo						March 7, 2024

source: js/login/module.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
