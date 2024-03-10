let gcontent = ''

export const onLoad = async () => {
	const message = document.getElementById("message")
	try {
		console.log("checking NodeAPI availability ...")
		const response = await fetch("http://localhost:8080/")
		const data = await response.json()
		message.innerHTML = "NodeAPI: <strong style='color:blue'>online</strong>"
		setTimeout(() => {
			message.style.opacity = 0
		}, 4000)
		console.log("done")
		console.log(data)
	} catch (err) {
		message.innerHTML = "NodeAPI: <strong style='color:red'>offline</strong>"
		console.log(`caught error: ${err.message}`)
	}
}

export const inputEventHandler = (input) => {
	gcontent = input.value
	console.log(gcontent)
}

const invalidCMD = (responseJSON) => {
	const json = responseJSON
	const input = document.querySelector('input')
	const status = document.getElementById('status')
	status.innerHTML = `Invalid or Unsupported System Command`
	status.style.color = 'red'
	status.style['border-style'] = 'solid'
	status.style['border-width'] = 'thin'
	status.style['border-color'] = 'red'
	status.style['background-color'] = 'lightpink'
	status.style.opacity = 1
	input.value = ''
}

const validCMD = (responseJSON) => {
	const json = responseJSON
	const { message, data } = json
	const input = document.querySelector('input')
	const status = document.getElementById('status')
	const head = document.getElementById('head')
	const output = document.getElementById('output')
	head.innerHTML = '<b>System Command</b>'
	output.innerHTML = `<pre>${data}</pre>`
	output.style.color = 'lightgreen'
	output.style['font-family'] = 'Monospace'
	output.style['border-style'] = 'solid'
	output.style['border-width'] = 'thin'
	output.style['border-color'] = 'black'
	output.style['background-color'] = 'black'
	status.innerHTML = "Successful Command Execution"
	status.style.color = 'blue'
	status.style['border-style'] = 'solid'
	status.style['border-width'] = 'thin'
	status.style['border-color'] = 'blue'
	status.style['background-color'] = 'lightblue'
	status.style.opacity = 1
	setTimeout(() => {
		status.style.opacity = 0
	}, 1800)
	gcontent = ''
	input.value = ''
}

export const clickEventHandler = async (e) => {
	e.preventDefault()
	if (gcontent.length === 0) {
		return
	}
	const status = document.getElementById("status")
	const url = "http://localhost:8080/api/sys/run"
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
		// route does not yet exist so we handle the *expected* error
		const json = await response.json()
		console.log(json)
		const { message, data } = json
		if (data.length === 0) {
			invalidCMD(json)
			return
		}
		validCMD(json)
	} catch (err) {
		console.log(`${err}`)
		status.innerHTML = `error: ${err.message}`
		status.style.color = 'red'
		status.style['border-style'] = 'solid'
		status.style['border-width'] = 'thin'
		status.style['border-color'] = 'red'
		status.style['background-color'] = 'lightpink'
	}
}

/*

FrontEnd Demo						March 7, 2024

source: js/system/module.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
