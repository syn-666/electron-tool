const { exposeMain } = require("./expose")
const { listenClipboardCallback } = require("./utils")

function main() {
  setInterval(listenClipboardCallback, 1000)
  exposeMain()
}

main()