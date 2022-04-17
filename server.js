const express =  require('express') //calling the express module
const resourceRouter = require('./routes/resources') //to connect to the resources page
const mongoose = require('mongoose')
const app = express()

/*mongoose.connect('mongodb://localhost/transferResource', { 
    useNewUrlParser: true, useUnifiedTopology: true
})*/

app.set('view engine', 'ejs')

app.use(express.static("public")); //connecting public to access the CSS file

app.use(express.urlencoded({ extended: false }))

app.use('/college', resourceRouter) 


app.get('/', (req, res) => {
    const help = [{
        cake: 'cake'
    }]
    res.render('index', {help: help})
}) 


app.listen(5000) //to work the webapp on port
