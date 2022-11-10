const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

// dbUser2
// Y9FvVOtMTrDMoc79
// OBLwn48toBy9wPYp
// serviceDBUser
app.use(cors());
app.use(express.json());
console.log(process.env.DB_USER)



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.awzu7rd.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
const serviceCollection = client.db('homeFood').collection('services');
const reviewCollection = client.db('homeFood').collection('reviews');
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
  console.log(services)
  
})
app.get('/services/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)}
  const service = await serviceCollection.findOne(query);
  
  res.send(service);
  
})


app.post('/services', async(req,res)=>{
  const addService = req.body;
  console.log(req.body)
  const result = await serviceCollection.insertOne(addService);
  res.send(result);
  
  
  
})
app.post('/reviews', async(req,res)=>{
  const addReview = req.body;
  console.log(req.body)
  const result = await reviewCollection.insertOne(addReview);
  res.send(result);
  
  
})
app.get('/reviews',async(req,res)=>{
  let query = {};
  if(req.query.reviewId){
    query={
      reviewId:req.query.reviewId
    }
  }
  const cursor =reviewCollection.find(query);
  const reviews = await cursor.toArray();
  res.send(reviews);
  
})
app.get('/reviews',async(req,res)=>{
  let query = {};
  if(req.query.email){
    query={
      email:req.query.email
    }
  }
  const cursor =reviewCollection.find(query);
  const myReviews = await cursor.toArray();
  res.send(myReviews);
  
})
app.delete('/reviews/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)}
  const review = await reviewCollection.deleteOne(query);
  
  res.send(review);})


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