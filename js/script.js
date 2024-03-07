import { changeEventHandler, cancelEventHandler, clickEventHandler } from "./module.js"
import { onLoad } from "./module.js"

window.addEventListener(
	"load",
	() => {
		onLoad()
	},
	false
)

const input = document.querySelector("input")
input.addEventListener(
	"change",
	() => {
		changeEventHandler(input)
	},
	false
)

input.addEventListener(
	"cancel",
	() => {
		cancelEventHandler()
	},
	false
)

const send = document.querySelector("#send")
send.addEventListener(
	"click",
	async (e) => {
		await clickEventHandler(e)
	},
	false
)
