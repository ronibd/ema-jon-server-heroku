const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT || 9000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x1c7x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function run() {
  try {
    await client.connect()
    const database = client.db("online_shop")
    const productCollection = database.collection("products")

    //Get Products Api
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({})
      const products = await cursor.limit(10).toArray()
      res.send({
        products,
      })
    })
  } finally {
    // await client.close;
  }
}

run().catch(console.dir)

app.get("/", (req, res) => {
  res.send("ema-john server is running")
})

app.listen(port, () => {
  console.log("server running", port)
})
