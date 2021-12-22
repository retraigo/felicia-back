const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(`${__dirname}/db/data.felicia`)

// db.run('CREATE TABLE responses (firstname TEXT, lastname TEXT, email TEXT, honorific TEXT, phone TEXT, country TEXT, organization TEXT, file TEXT)')
  
let insertStatement = db.prepare('INSERT INTO responses (firstname, lastname, email, honorific, phone, country, organization, file) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    

const express = require('express')
const app = express()
const port = 1920
const multer = require('multer');
const upload = multer({dest:'./uploads/'})
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.send('Nothing here')
})

app.post('/join', upload.single('fileData'), async (req, res) => {
    const body = req.body
    console.log(req.body)
    console.log(req.file)
    insertStatement.run(body.firstname, body.lastname, body.email, body.honorific, body.phone, body.country, body.organization, req.file.filename)
    res.json({status: 200, message: "success"})
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
