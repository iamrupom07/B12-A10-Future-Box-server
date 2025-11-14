// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Read from env
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error(
    "❌ ERROR: MONGO_URI not found. Create a .env file or set MONGO_URI in environment."
  );
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let habitsCollection;
let usersCollection;

async function connectDB() {
  if (!habitsCollection || !usersCollection) {
    await client.connect();
    const db = client.db("habit_db");
    habitsCollection = db.collection("habits");
    usersCollection = db.collection("users");
    console.log("Connected to MongoDB");
  }
}

app.get("/", (req, res) => {
  res.send("Habit Tracker Server is running");
});

// Create user
app.post("/users", async (req, res) => {
  try {
    await connectDB();
    const newUser = req.body;
    const email = newUser.email;
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) return res.send({ message: "Already User Exist" });
    const result = await usersCollection.insertOne(newUser);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

// Add habit
app.post("/allhabits", async (req, res) => {
  try {
    await connectDB();
    const newHabit = req.body;
    const result = await habitsCollection.insertOne(newHabit);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

// Update habit (PATCH)
app.patch("/allhabits/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const updateHabit = req.body;
    const result = await habitsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateHabit }
    );
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

// Get habits
app.get("/allhabits", async (req, res) => {
  try {
    await connectDB();
    const email = req.query.email;
    const query = email ? { creatorEmail: email } : {};
    const result = await habitsCollection.find(query).toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

// Featured habits
app.get("/featuredHabits", async (req, res) => {
  try {
    await connectDB();
    const result = await habitsCollection
      .find()
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

// Get single habit
app.get("/allhabits/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const result = await habitsCollection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

// Delete habit
app.delete("/allhabits/:id", async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const result = await habitsCollection.deleteOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

export default app;

if (process.env.VERCEL !== "1") {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  );
}
