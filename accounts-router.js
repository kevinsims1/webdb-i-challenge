const express = require('express')
const knex = require('knex')

const db = require('./data/dbConfig.js')

// const dbConnection = knex({
//     client: 'sqlite3',
//     connection: {
//         filename: './data/budget.db3'
//     },
//     useNullAsDefault: true,
// })

const router = express.Router()

router.get('/', (req,res) => {
    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(() => {
        res.status(500).json({error: "Error"})
    })
})

router.post('/', (req,res) => {
    const account = req.body
    db('accounts')
    .insert(account, "id")
    .then(arrayOfIDs => {
        const idOfAccount = arrayOfIDs[0]
        res.status(200).json(idOfAccount)
    })
    .catch(() => {
        res.status(500).json({error: "Error"})
    })
})

router.delete('/:id', (req,res) => {
    db('accounts')
    .where({ id: req.params.id})
    .del()
    .then(count => {
        res.status(200).json({message: `${count} record(s) deleted`})
    })
    .catch(err => res.status(500).json({err: "ERROR"}))
})

module.exports = router;