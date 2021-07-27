const express = require('express')
const path = require('path')
const api = require('./backend/build')
const app = express()

const port = process.env.PORT || 80

app.use(api)

app.use(express.static(path.join(__dirname, 'frontend', 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.listen(port, () => console.log('Site running on port ' + port))
