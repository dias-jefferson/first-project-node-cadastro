const express = require('express')

const app = express()

const port = 3000

app.get('/people/:id', (request, response) => { // envia a requisição dos dados a serem encontrados do id específico

    const { id } = request.params
    
    console.log(id)

    return response.json({id})

})

app.listen(port, () => {
    console.log(`😁 Server started at port ${port}`)
})