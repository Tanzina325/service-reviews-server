const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

// Y9FvVOtMTrDMoc79
// serviceDBUser
app.use(cors());
app.use(express.json());
console.log(process.env.DB_USER)



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.awzu7rd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
const serviceCollection = client.db('homeFood').collection('services');
app.get('/threeservices',async(req,res)=>{
  const query = {}
  const cursor =serviceCollection.find(query);
  const services = await cursor.limit(3).toArray();
  res.send(services);
  
})
app.get('/services',async(req,res)=>{
  const query = {}
  const cursor =serviceCollection.find(query);
  const services = await cursor.toArray();
  res.send(services);
  
})
app.get('/services/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)}
  const service = await serviceCollection.findOne(query);
  
  res.send(service);
  
})

}
finally{

}
}
run().catch(err=>console.error(err));


app.get('/',(req,res)=>{
    res.send('Food Servises is here')
})

app.listen(port,()=>{
    console.log(`food service is here on ${port}`)
})