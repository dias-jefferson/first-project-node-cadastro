const express = require('express')

const app = express()

const port = 3000

app.get('/user', (request, response) => {
    // const name = request.query.name
    // const age = request.query.age
    const {name, age} = request.query // destructuring assignment
    console.log(name, age)

    /* return response.json({name: name, age: age})*/
    return response.json({name, age}) // --> forma reduzida do código
})

app.listen(port, () => {
    console.log(`🤩 Server started at port ${port}`)
})