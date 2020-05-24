const Logger = require('./module/logger')
const logger = new Logger('logs.json')

const Game = require('./module/game')
const game = new Game()

game.on('start', () => {
    logger.createFile()
})

game.on('round', (log) => {
    logger.add(log)
})

game.on('end', () => {
    logger.read()
})

if (process.argv[2] === 'logs') {
    logger.read()
} else {
    game.startGame()
}
