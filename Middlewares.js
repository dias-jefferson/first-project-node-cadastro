const express = require('express')
const uuid = require('uuid')

const app = express()
const port = 3000

app.use(express.json())

const users = []


/* Middlewares sã interceptadores que realizam verificação e alteração de dadoso
    Podem ser utilizados para economizar código
    As rotas também são middlewares
    São executados antes das requisições das rotas serem chamadas
    next() --> Para o middleware após sua execução.
*/
const checkUserId = (request, response, next) => { // Realiza a checagem de IDs
    
    const { id } = request.params
   
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found"})
    }
    
    request.useId = id
    request.useIndex = index

    next()

}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id:uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const { id } = request.useId

    const index = request.useIndex

    const updatedUser = { id, name, age }
    

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.useIndex

    users.splice(index,1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🚥 Server started on port ${port}`)
})