require("dotenv").config()
const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const routes = require("./routes")
const port = 3000

app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use("/", routes)
app.use(errorHandler)

app.listen(port, () =>
    console.log(`app listening at http://localhost:${port}`)
);