const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

//middleware

//habitDBuser

//YkHymVu0ufpJKsJ8

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://habitDBuser:YkHymVu0ufpJKsJ8@cluster0.bwqjvbl.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Habit Tracker Server is running");
});

async function run() {
  try {
    await client.connect();

    const db = client.db("habit_db");
    const habitsCollection = db.collection("habits");

    app.post("/allhabits", async (req, res) => {
      const newHabit = req.body;
      const result = await habitsCollection.insertOne(newHabit);
      res.send(result);
    });

    app.patch("/allhabits/:id", async (req, res) => {
      const id = req.params.id;
      const updateHabit = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: updateHabit,
      };
      const result = await habitsCollection.updateOne(query, update);
      res.send(result);
    });

    app.get("/allhabits", async (req, res) => {
      const cursor = habitsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.delete("/allhabits/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await habitsCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("Habit Tracker server is running on ", port);
});
