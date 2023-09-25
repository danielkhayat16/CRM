const express = require('express');
const cors = require ('cors');
const connexion = require ('./utils')

const app = express();
app.use(cors());
app.use(express.json());

app.get('/events', async (req, res) => {

    res.json({events: await connexion.googleAuth()})
})
//Hello

app.get('/api', (req, res) => {
    res.json ({message:"HelloWorld"})
})

app.listen(4000, () => {
    console.log("Sever is running on port 4000");
})