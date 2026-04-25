const express = require('express')
const mysql = require('mysql2')
const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: '66.198.240.46',
    user: 'bfzhiwes_node-intro-user',
    password: 'node-intro-user-password',
    database: 'bfzhiwes_node-intro'
})

app.get('/students', (req, res) => {
    let bettersql = 'INSERT INTO students (name, grade) VALUES ("shrek", 103)'
    let sql = 'SELECT * FROM students'
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err)
        res.json(results)
    })
})

app.get('/', (req, res) => {
    res.send('<h1>Hello James</h1>')
}) 

app.post('/add-student', (req, res) => {
    let {name, grade} = req.body
    db.query(`INSERT INTO students (name, grade) VALUES ("${name}", "${grade}")`, (err, results) => {
        if (err) return res.status(500).send(err)
            res.redirect('/students')
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})