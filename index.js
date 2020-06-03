const express = require('express')
const path = require('path')
const todoRoutes = require('./routes/todo')
const database = require('./utils/database')

const app = express()
const PORT = process.env.PORT || 80

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/api/todo', todoRoutes)

app.use((req, res, next) => {
    res.sendFile('/index.html')
})

const start = async () => {
    try {
        await database.sync()
        app.listen(PORT, () => {
            console.log('Батут сработал!')
        })
    } catch (e) {
        console.error(e)
    }
}

start()
