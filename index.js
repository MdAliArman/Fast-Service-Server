const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

// midleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.a7wwdwb.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection =client.db('fastService').collection('allServices');

        app.get('/allservice', async (req, res)=>{
            const query={}
            const services= await serviceCollection.find(query).toArray();
            res.send(services)
        })
        app.get('/service', async (req, res)=>{
            const query={}
            const services= await serviceCollection.find(query).limit(3).toArray();
            res.send(services)
        })

    } finally {

    }
}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Fast service Server is Running')
})

app.listen(port, () => {
    console.log(`server is running ${port}`)
})