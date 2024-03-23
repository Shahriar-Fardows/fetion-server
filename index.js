const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






const uri = "mongodb+srv://shahriarfardows:1OSN1fPk1VyEHUFN@elegent.xwme4hs.mongodb.net/?retryWrites=true&w=majority&appName=elegent";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
     client.connect();
    // Send a ping to confirm a successful connection

    const dataServer = client.db('elegentfations').collection('productsinfos');
    const orderData = client.db('elegentfations').collection('order');

    // database api 

    app.get('/cardInfo', async(req , res)=>{
        const allProduct = dataServer.find();
        const productsInfo = await allProduct.toArray();
        res.send(productsInfo) 
    });
    app.get('/orders', async(req , res)=>{
        const allProduct = orderData.find();
        const productsInfo = await allProduct.toArray();
        res.send(productsInfo) 
    });
    app.get('/orders/:id', async(req , res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await orderData.findOne(query);
      res.send(result)
    });
    app.delete('/orders/:id', async(req , res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await orderData.deleteOne(query);
      res.send(result)
    });

    app.get('/cardInfo/:id' , async (req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await dataServer.findOne(query);
        res.send(result)
    })
    
    // order data api

    app.post('/orders' , async (req , res)=>{
        const order = req.body;
        const result = await orderData.insertOne(order);
        res.send(result)
    })

    app.post('/cardInfo' , async (req , res)=>{
        const order = req.body;
        const result = await dataServer.insertOne(order);
        res.send(result)
    })



    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get("/", (req, res) => {
    res.send("server is okkkkk!!!!!!!!!!!!!!!!!");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  