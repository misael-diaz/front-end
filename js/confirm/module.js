export { clickEventHandler };

const clickEventHandler = async (e) => {
	e.preventDefault();
	const code = document.getElementById('code').value;
	const credentials = JSON.parse(window.sessionStorage.getItem("credentials"));
	if (code.length === 0) {
		const err = 'expects code input';
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = `error: ${err}`;
		errmsg.style.opacity = 1;
		console.error(`error: ${err}`);
		return;
	}

	if (code !== credentials.code) {
		const err = `wrong code`;
		const errmsg = document.getElementById('error-message');
		errmsg.innerHTML = `error: ${err}`;
		errmsg.style.opacity = 1;
		console.error(`error: ${err}`);
		return;
	}

	const url = "http://localhost:8080/api/usr/confirm";
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
		const msg = `successful account confirmation`;
		const message = document.getElementById('message');
		const errmsg = document.getElementById('error-message');
		message.innerHTML = msg;
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
