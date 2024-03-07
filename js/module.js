let gcontent = ''

export const onLoad = async () => {
	const message = document.getElementById("message")
	try {
		console.log("checking NodeAPI availability ...")
		const response = await fetch("http://localhost:8080/")
		const data = await response.json()
		message.innerHTML = "NodeAPI: <strong style='color:blue'>online</strong>"
		console.log("done")
		console.log(data)
	} catch (err) {
		message.innerHTML = "NodeAPI: <strong style='color:red'>offline</strong>"
		console.log(`caught error: ${err.message}`)
	}
}

export const changeEventHandler = (input) => {
	const file = input.files[0]
	const reader = new FileReader()

	const loadEventHandler = () => {
		gcontent = ''
		gcontent += reader.result
	}

	reader.addEventListener(
		"load",
		() => loadEventHandler(),
		false
	)

	if (file) {
		reader.readAsText(file)
	}
}

export const cancelEventHandler = () => {
	return
}

export const clickEventHandler = async (e) => {
	e.preventDefault()
	if (gcontent.length === 0) {
		return
	}
	const status = document.getElementById("status")
	const url = "http://localhost:8080/api/lmp/run"
	const opt = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "text/plain"
		},
		body: gcontent
	}
	try {
		const response = await fetch(url, opt)
		const data = await response.json()
		console.log(data)
		gcontent = ''
		status.innerHTML = "successful file upload"
		status.style.color = 'blue'
		status.style['border-style'] = 'solid'
		status.style['border-width'] = 'thin'
		status.style['border-color'] = 'blue'
		status.style['background-color'] = 'lightblue'
	} catch (err) {
		console.log(`${err}`)
		status.innerHTML = `error: ${err.message}`
		status.style.color = 'red'
		status.style['border-style'] = 'solid'
		status.style['border-width'] = 'thin'
		status.style['border-color'] = 'red'
		status.style['background-color'] = 'lightred'
	}
}

/*

FrontEnd Demo						March 7, 2024

source: module.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
