export { onLoad, inputEventHandler, cancelEventHandler, clickEventHandler };

let gcontent = '';

const onLoad = async () => {
	const message = document.getElementById("message");
	try {
		console.log("checking NodeAPI availability ...");
		const response = await fetch("http://localhost:8080/");
		const data = await response.json();
		message.innerHTML = "NodeAPI: <strong style='color:blue'>online</strong>";
		message.style.opacity = 1;
		setTimeout(() => {
			message.style.opacity = 0;
		}, 4000);
		console.log("done");
		console.log(data);
	} catch (err) {
		message.innerHTML = "NodeAPI: <strong style='color:red'>offline</strong>";
		console.log(`caught error: ${err.message}`);
	}
};

const inputEventHandler = (input) => {
	const file = input.files[0];
	const reader = new FileReader();

	const loadEventHandler = () => {
		gcontent = '';
		gcontent += reader.result;
	};

	reader.addEventListener(
		"load",
		() => loadEventHandler(),
		false
	);

	if (file) {
		reader.readAsText(file);
	}
};

const cancelEventHandler = () => {
	return;
};

const clickEventHandler = async (e) => {
	e.preventDefault();
	if (gcontent.length === 0) {
		console.log(`clickEventHandler: empty string`);
		return;
	}
	const status = document.getElementById("status");
	const url = "http://localhost:8080/api/lmp/run";
	const opt = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "text/plain"
		},
		body: gcontent
	}
	try {
		const response = await fetch(url, opt);
		const json = await response.json();
		console.log(json);
		const input = document.querySelector('input');
		const head = document.getElementById("head");
		head.innerHTML = '<b>NodeAPI Response</b>';
		const output = document.getElementById("output");
		output.innerHTML = `<pre>${json.input}</pre>`;
		output.style.color = 'lightgreen';
		output.style['font-family'] = 'Monospace';
		output.style['border-style'] = 'solid';
		output.style['border-width'] = 'thin';
		output.style['border-color'] = 'black';
		output.style['background-color'] = 'black';
		status.innerHTML = "successful file upload";
		status.style.color = 'blue';
		status.style['border-style'] = 'solid';
		status.style['border-width'] = 'thin';
		status.style['border-color'] = 'blue';
		status.style['background-color'] = 'lightblue';
		status.style.opacity = 1;
		setTimeout(() => {
			status.style.opacity = 0;
		}, 1800);
		gcontent = '';
		input.value = '';
	} catch (err) {
		console.log(`${err}`);
		status.innerHTML = `error: ${err.message}`;
		status.style.color = 'red';
		status.style['border-style'] = 'solid';
		status.style['border-width'] = 'thin';
		status.style['border-color'] = 'red';
		status.style['background-color'] = 'lightpink';
		status.style.opacity = 1;
	}
};

/*

FrontEnd Demo						March 7, 2024

source: js/main/module.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
