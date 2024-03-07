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

const input = document.querySelector("input")
input.addEventListener(
	"change",
	async () => {

		const file = input.files[0]
		const reader = new FileReader()
		reader.addEventListener(
			"load",
			() => {
				gcontent = ''
				gcontent += reader.result
			},
			false
		)

		if (file) {
			reader.readAsText(file)
		}
	},
	false
)

const send = document.querySelector("#send")
send.addEventListener(
	"click",
	async (e) => {
		e.preventDefault()
		if (gcontent.length === 0) {
			return
		}
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
		} catch (err) {
			console.log(`${err}`)
		}
	},
	false
)
