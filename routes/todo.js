const {Router} = require('express')
const todoModel = require('../models/todo')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const todos = await todoModel.findAll()
        res.status(200).json(todos)
    } catch (e) {
        console.error(e)
        res.status(500).json({
            status: 'error',
            message: 'server error'
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const todo = await todoModel.create({
            title: req.body.title,
            done: false
        })
        res.status(201).json({todo})
    } catch (e) {
        console.error(e)
        res.status(500).json({
            status: 'error',
            message: 'server error'
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const todo = await todoModel.findByPk(+req.params.id)
        todo.done = req.body.done
        await todo.save()
        res.status(200).json({todo})
    } catch (e) {
        console.error(e)
        res.status(500).json({
            status: 'error',
            message: 'server error'
        })
    }
})

router.delete('/:id', (req, res) => {
    try {

    } catch (e) {
        console.error(e)
        res.status(500).json({
            status: 'error',
            message: 'server error'
        })
    }
})

module.exports = router