export { clickEventHandler };

let locked = false;
let confirmed = false;

const clickEventHandler = async (e) => {
	e.preventDefault();

	if (locked || confirmed) {
		console.log('locked');
		return;
	}

	const code = document.getElementById('code').value;
	const credentials = JSON.parse(window.sessionStorage.getItem("credentials"));
	if (code.length === 0) {
		const err = 'expects code input';
		const message = document.getElementById('message');
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = `error: ${err}`;
		errmsg.style.opacity = 1;
		message.style.opacity = 0;
		console.error(`error: ${err}`);
		locked = false;
		return;
	}

	if (code !== credentials.code) {
		const err = `wrong code`;
		const message = document.getElementById('message');
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = `error: ${err}`;
		errmsg.style.opacity = 1;
		message.style.opacity = 0;
		console.error(`error: ${err}`);
		locked = false;
		return;
	}

	const url = "https://localhost:8080/api/usr/confirm";
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
		confirmed = (response.ok)? true : false;
		if (!response.ok) {
			const msg = `account confirmation failed`;
			const message = document.getElementById('message');
			const errmsg = document.getElementById('error-message');
			errmsg.innerHTML = msg;
			errmsg.style.opacity = 1;
			message.style.opacity = 0;
			console.error(`err: ${msg}`);
			locked = false;
			return;
		}
		const msg = `successful account confirmation`;
		const message = document.getElementById('message');
		const errmsg = document.getElementById('error-message');
		message.innerHTML = msg;
		message.style.opacity = 1;
		errmsg.style.opacity = 0;
		console.log(msg);
		setTimeout(() => {
			window.location.replace('index.html');
		}, 2000);
		window.sessionStorage.removeItem("credentials");
	} catch (err) {
		console.error(`error: ${err}`);
		const message = document.getElementById('message');
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = `error: ${err}`;
		errmsg.style.opacity = 1;
		message.style.opacity = 0;
		locked = false;
	}
};

/*

FrontEnd Demo						March 20, 2024

source: js/confirm/module.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
