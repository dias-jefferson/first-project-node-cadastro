const express = require('express')

const port = 3000
const app = express()
app.use(express.json()) // diz ao node que será recebido dados em formato JSON



app.get('/people', (request, response) => { 

    const {name, age} = request.body // os dados são enviados através do corpo da requisição de forma oculta
    
    console.log(request.body)

    return response.json({name, age, message: "ok"})

})

app.listen(port, () => {
    console.log(`😍 Server started at port ${port}`)
})