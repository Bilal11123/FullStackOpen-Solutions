require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (req, res) => {
    const date = new Date()
    Person.find({}).then(persons => {
        res.send(`Phonebook has info for ${persons.length} people (${date})`)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(() => {
        response.status(204).end()
    })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

// const generateId = () => {
//     const Id = Math.floor(Math.random() * 9999999)
//     return String(Id)
// }

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body || !body.name || !body.number) {
        return response.status(400).json({ error: 'Content is missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => {
        // console.log(error)
        next(error)
        // response.json({ error: error.message })
    })
    //
    // persons = persons.concat(person)
    // response.status(201).json(person)

})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body

    Person.findById(id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }
            person.name = body.name
            person.number = body.number
            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
