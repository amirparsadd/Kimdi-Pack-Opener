const express = require('express')
const app = express()
const port = 80

app.use("/assets", express.static("assets"))
app.use("/web-data", express.static("web-data"))

app.get('/', (req, res) => {
  res.redirect("/web-data/index.html")
})

app.listen(port, () => {
  console.log(`Running!`)
})