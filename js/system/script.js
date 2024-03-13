import { inputEventHandler, clickEventHandler } from "./module.js";
import { onLoad } from "./module.js";

window.addEventListener(
	"load",
	() => {
		onLoad();
	},
	false
);

const input = document.querySelector("input");
input.addEventListener(
	"input",
	() => {
		inputEventHandler(input);
	},
	false
);

const exec = document.querySelector("#execute");
exec.addEventListener(
	"click",
	async (e) => {
		await clickEventHandler(e);
	},
	false
);

/*

FrontEnd Demo						March 7, 2024

source: js/system/script.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
