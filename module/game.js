const { EventEmitter } = require('events')
const readline = require('readline')

class Game extends EventEmitter {
    constructor() {
        super()
        this.game = false
        this.round = 0
    }

    throwCoin() {
        return Math.floor(Math.random() * 2)
    }

    saveStats(coin, answer, isWin) {
        this.emit('round', {
            round: this.round,
            coin: coin === 0 ? 'Орел' : 'Решка',
            answer: answer === 0 ? 'Орел' : 'Решка',
            isWin: isWin
        })
    }

    gameTurn() {

        if (!this.game) return

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        this.round++

        rl.question(
            'Орел или решка? (Орел - О, Решка - Р, любая иная клавиша - выход) ',
            (answer) => {
                rl.close()
            const coin = this.throwCoin()

            switch (answer.toLowerCase()) {
                case 'o' || 'о':
                    answer = 0
                    break
                case 'p' || 'р':
                    answer = 1
                    break
                default:
                    answer = -1
                    break
            }

            if (answer === -1) {
                console.log('Игра закончена')
                this.game = false
                this.emit('end')
            } else if (answer === coin) {
                console.log('Угадал')
                this.saveStats(coin, answer, true)
            } else {
                console.log('Мимо')
                this.saveStats(coin, answer, false)
            }
            this.gameTurn()
        })
    }

    startGame() {
        this.emit('start')
        this.game = true
        this.gameTurn()
    }

}

module.exports = Game
