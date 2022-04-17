const express = require('express')
const Resource = require('./../models/resource')
const router = express.Router()

router.get('/collegeApp', (req, res) => {
    const resources = [{
        title: 'ECS 98F',
        createdAt: new Date(),
        description: 'There is a major gap between what is taught in lower-division and upper-division at UC Davis regarding the UNIX/Linux development environment. Enroll in this P/NP course with Prof. Porquet to gain professional development in UNIX/Linux. This is taught at ECS 36A/B/C and 50, and required for upper divisio coursework'
    },
    {
        title: 'ECS 122A',
        createdAt: new Date(),
        description: 'Study Djikstra algorithm, Union, Disjoin Sets, Tries, Topological Sort since its taught in ECS 36C and is a prerequisite for this course.'
    },
    {
        title: 'ECS 154A',
        createdAt: new Date(),
        description: 'Revise C programming mallocs and library files. It is taught in 36A/B and 50 and required for 154A final project'
    },
        ]

    res.render('college/collegeApp', {resources: resources})
})

router.get('/collegeApp/new', (req, res) => {
    res.render('college/new')
})

router.get('/:id', (req, res) =>{

})

router.post('/collegeApp', async(req, res) => {
    console.log("Hello!")
    const resource = new Resource({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })

   try{
    resource = await resource.save()
    res.redirect(`/collegeApp/${resource.id}`)
   } catch (e) {
    res.render('college/new', {resource: resource })
   }
   
})

//integrating the twilio API
router.post('/collegeApp/sendMessage', async(req, res) => {
    console.log("Hello Message!")

    const accountSid = 'AC11ed5d0eea8dedd9d384a38b5dcb26d1';
    const authToken = '228d52cdcebe4ed33b23e802e6654d69';
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: req.body.message,
        from: '+13254221508',
        to: '+16694547811'
    })
    .then(message => console.log(message.sid)); 
    res.send('Message has been sent!') 
})

module.exports = router

