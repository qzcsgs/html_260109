const express = require("express")
const path = require("path")

function startServer() {
  const app = express()

  const webPath = path.join(__dirname, "web")
  app.use(express.static(webPath))

  return new Promise(resolve => {
    const server = app.listen(3000, () => {
      console.log("Local server running: http://localhost:3000")
      resolve(server)
    })
  })
}

module.exports = startServer
