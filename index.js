const readline = require('readline')
const weather = require('weather-js')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Погоду н-н-н-надо? Введи город: ', answer => {
    weather.find({search: answer, degreeType: 'C'}, (err, result) => {
        if (err) console.log(err)
        console.log(`В ${result[0].location.name} погода ${result[0].current.skytext}, температура ${result[0].current.temperature} градусов, ветер дует ${result[0].current.winddisplay}`)
        rl.close()
    })
})

