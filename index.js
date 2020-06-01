const express = require('express')
const exphbs  = require('express-handlebars')
const path    = require('path')

const app  = express()
const port = process.env.PORT || 80
const hbs  = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, 'views'))

app.use('/script', express.static(path.resolve(__dirname, 'public', 'script')))
app.use('/style', express.static(path.resolve(__dirname, 'public', 'css')))

app.listen(port, '0.0.0.0', () => {
    console.log(`I'm back! Server is running on port ${port}`)
})

app.get('/', (req, res, next) => {
    res.render('index', {
        message: `I'm back! Server is running on port ${port}`,
        title: 'Главная',
        isMain: true
    })
})

app.get('/news', (req, res, next) => {
    res.render('news', {
        message: `Привет! Это новости!`,
        title: 'Новости',
        isNews: true
    })
})