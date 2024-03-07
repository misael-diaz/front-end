let gcontent = ''

const onLoad = async () => {
	const message = document.getElementById("message")
	try {
		console.log("checking NodeAPI availability ...")
		const response = await fetch("http://localhost:8080/")
		const data = await response.json()
		message.innerHTML = "NodeAPI is online"
		console.log("done")
		console.log(data)
	} catch (err) {
		message.innerHTML = "NodeAPI is offline"
		console.log(`caught error: ${err.message}`)
	}
}

const changeEventHandler = () => {
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

const cancelEventHandler = () => {
	return
}

const clickEventHandler = async (e) => {
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
		status.innerHTML = `error: ${err}`
		status.style.color = 'red'
		status.style['border-style'] = 'solid'
		status.style['border-width'] = 'thin'
		status.style['border-color'] = 'red'
		status.style['background-color'] = 'lightred'
	}
}

const input = document.querySelector("input")
input.addEventListener(
	"change",
	() => {
		changeEventHandler()
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
