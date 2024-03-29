import { random } from "../../js/util/random.js";
export { clickEventHandler };

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
};

const passwords = () => {

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
};

const clickEventHandler = async (e) => {

	e.preventDefault();

	if (!inputs()) {
		return;
	}

	if (!passwords()) {
		return;
	}

	const firstname = document.getElementById('firstname').value;
	const lastname = document.getElementById('lastname').value;
	const username = document.getElementById('username').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const code = random().toString().padStart(8, '0');
	const credentials = { firstname, lastname, username, email, password, code };
	console.log(credentials);
	const url = "https://localhost:8080/api/usr/signup";
	const opt = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(credentials)
	};
	try {
		const response = await fetch(url, opt);
		const json = await response.json();
		console.log(json);
		window.sessionStorage.setItem("credentials", JSON.stringify(credentials));
		const message = document.getElementById('message');
		const errmsg = document.getElementById('error-message');
		message.innerHTML = `successful email send to ${email}`;
		errmsg.innerHTML = '';
		errmsg.style.opacity = 0;
		setTimeout(() => {
			window.location.replace('confirmation.html');
		}, 2000);
	} catch (err) {
		console.error(`error: ${err}`);
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = `error: ${err}`;
		errmsg.style.opacity = 1;
	}
};

/*

FrontEnd Demo						March 7, 2024

source: js/signup/module.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
