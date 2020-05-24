const fs = require('fs')
const path = require('path')

class Logger {

    constructor(file) {
        this.file = file
    }

    createFile() {
        fs.access(path.join(__dirname, '..', 'logs'), err => {
            if (err) {
                fs.mkdir(path.join(__dirname, '..', 'logs'), err => {
                    if (err) throw err
                })
            }

            // console.log(`Папка ${err ? 'создана' : 'уже существует'}`)

            fs.writeFile(path.join(__dirname, '..', 'logs', this.file),
                JSON.stringify({date: new Date, logs: []}),
                err => {
                    if (err) throw err
                    // console.log('Файл создан')
                })

        })
    }

    add(log) {
        fs.readFile(
            path.join(__dirname, '..', 'logs', this.file),
            'utf-8',
            (err, data) => {
                if (err) throw err
                const file = JSON.parse(data)
                file.logs.push(log)
                fs.writeFile(path.join(__dirname, '..', 'logs', this.file),
                    JSON.stringify(file),
                    err => {
                        if (err) throw err
                        // console.log('Файл записан')
                    })
            }
        )
    }

    read() {

        fs.readFile(
            path.join(__dirname, '..', 'logs', this.file),
            'utf-8',
            (err, data) => {
                if (err) throw err
                const file = JSON.parse(data)
                const wins = file.logs.filter(r => r.isWin === true)
                console.log(`Всего раундов: ${file.logs.length}. Побед: ${wins.length}. Поражений: ${file.logs.length - wins.length}`)
            }
        )

    }

}

module.exports = Logger
