const fs = require('fs')
const path = require('path')

class Log {

    createFile() {

        fs.access(path.join(__dirname, '../logs'), err => {

            if (err) {
                fs.mkdir(path.join(__dirname, '../logs'), err => {
                    if (err) throw err
                })
            }

            console.log(`Папка ${err ? 'создана' : 'уже существует'}`)

            fs.writeFile(path.join(__dirname, '../logs', 'log.txt'),
                `Файл создан в: ${new Date}`,
                err => {
                    if (err) throw err
                    console.log('Файл создан')
                })

        })

    }

}

module.exports = new Log()
