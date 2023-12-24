import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid';

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found"})
    }

    request.userId = id
    request.userIndex = index

    next()
}

app.get('/users', (request, response) => {
    
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id:uuidv4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId,(request, response) => {
    const  id  = request.userId
    const { name, age } = request.body
    
    
    const index = request.userIndex
    const updatedUser = {id, name, age}
    

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    

    const index = request.userIndex


    users.splice(index,1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`✈ Server started on port ${port}`)
})