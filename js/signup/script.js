import { clickEventHandler } from "./module.js";

const signup = document.querySelector('button');
signup.addEventListener(
	"click",
	(e) => {
		clickEventHandler(e);
	},
	false
);

/*

FrontEnd Demo						March 7, 2024

source: js/main/script.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
