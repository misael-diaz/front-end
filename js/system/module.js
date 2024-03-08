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

export const changeEventHandler = (input) => {
	gcontent = input.value
	console.log(gcontent)
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
		if (response.status >= 400 && response.status < 600) {
			const errmsg = [
				`Server Error:`,
				`${response.status}`,
				`Route`,
				`${response.statusText}`
			].join(' ')
			status.innerHTML = errmsg
			status.style.color = 'red'
			status.style['border-style'] = 'solid'
			status.style['border-width'] = 'thin'
			status.style['border-color'] = 'red'
			status.style['background-color'] = 'lightred'
			return
		}
		const data = await response.json()
		console.log(data)
		const { input } = data
		const head = document.getElementById("head")
		head.innerHTML = '<b>NodeAPI Response</b>'
		const output = document.getElementById("output")
		output.innerHTML = `<pre>${input}</pre>`
		output.style.color = 'lightgreen'
		output.style['font-family'] = 'Monospace'
		output.style['border-style'] = 'solid'
		output.style['border-width'] = 'thin'
		output.style['border-color'] = 'black'
		output.style['background-color'] = 'black'
		status.innerHTML = "successful command execution"
		status.style.color = 'blue'
		status.style['border-style'] = 'solid'
		status.style['border-width'] = 'thin'
		status.style['border-color'] = 'blue'
		status.style['background-color'] = 'lightblue'
		setTimeout(() => {
			status.style.opacity = 0
		}, 1800)
		gcontent = ''
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

source: js/system/module.js
author: @misael-diaz

Copyright (c) 2024 Misael Díaz-Maldonado
This file is released under the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

*/
