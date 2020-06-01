const express = require('express')
const exphbs  = require('express-handlebars')
const path    = require('path')
const cheerio = require('cheerio')
const request = require('request')
const cookieParser  = require('cookie-parser')
const cookieSession = require('cookie-session')

const app  = express()
const port = process.env.PORT || 80
const hbs  = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/script', express.static(path.resolve(__dirname, 'public', 'script')))
app.use('/style', express.static(path.resolve(__dirname, 'public', 'css')))
app.use(cookieSession({name: 'session', keys: ['key1', 'key2']}))

app.listen(port, '0.0.0.0', () => {
    console.log(`I'm back! Server is running on port ${port}`)
})

app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isMain: true
    })
})

app.get('/news/', (req, res, next) => {
    request.get(
        `https://yandex.ru`,
        (err, response, body) => {
            if (err) throw err
            const $ = cheerio.load(body)
            let news = $('.list__item-content').map((i, el) => {
                return $(el).text()
            }).get()
            if (req.query.limit) {
                news = news.slice(0, req.query.limit)
                req.session.limit = req.query.limit
            } else {
                news = news.slice(0, req.session.limit)
            }

            res.render('news', {
                news: news,
                title: 'Новости',
                isNews: true
            })
        })

})

app.post('/api/news', (req, res) => {
    request.get(
        `https://yandex.ru`,
        (err, response, body) => {
            if (err) throw err
            const $ = cheerio.load(body)
            let news = $('.list__item-content').map((i, el) => {
                return $(el).text()
            }).get()
            req.session.limit = req.body.data

            res.end(JSON.stringify(news.slice(0, req.body.data)))
        })
})