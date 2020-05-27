// const http = require('http');
//
// http.createServer((request, response) => {
//     console.log('123');
//     response.setHeader("Content-Type", "text/html; charset=utf-8;");
//     response.write('Привет, милая :3');
//     response.end();
// }).listen(80, '0.0.0.0');

const http    = require('http')
const url     = require('url')
const path    = require('path')
const fs      = require('fs')
const request = require('request')

const port = 80
const host = '0.0.0.0'

const getContent = (name, res) => {
    fs.readFile(
        path.join(__dirname, 'views', `${name}.html`),
        'utf-8',
        (err, content) => {
            if (err) throw err
            res.end(content)
        }
    )
}

const requestHandler = (req, res) => {

    res.setHeader("Content-Type", "text/html; charset=utf-8;")

    const pathname = url.parse(req.url, true).pathname

    if (req.method === 'GET') {
        if (pathname === '/') {
            getContent('index', res)
        } else if (pathname === '/translate') {
            getContent('translate', res)
        } else if (pathname === '/news') {
            getContent('news', res)
        } else {
            getContent('index', res)
        }
    }

    if (req.method === 'POST') {
        const body = [];

        req.on('data', data => {
            body.push(Buffer.from(data))
        })

        req.on('end', () => {
            const message = body.toString()

            request.get(
                `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200526T175332Z.60246197a1c49b55.7ca17cb0f5cb3c8fc24748158b632f70eb6e9a0a&lang=en-ru&text=${message}`,
                (err, response, body) => {
                if (err) throw err
                console.log('statusCode:', response && response.statusCode)
                res.end(body)
            })
        })
    }

}

http.createServer(requestHandler).listen(port, host, (err) => {
    if (err) throw err
    console.log(`server is listening on ${host}:${port}`)
})