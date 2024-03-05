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
