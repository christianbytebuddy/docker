const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017';
const dbName = 'demo';

app.get('/', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const coll = db.collection('visitas');
    await coll.insertOne({ fecha: new Date() });
    const count = await coll.countDocuments();
    await client.close();
    res.send(`Hola desde Docker. Visitas en DB: ${count}`);
  } catch (e) {
    res.status(500).send('Error: ' + e.message);
  }
});

app.listen(port, () => console.log(`App escuchando en http://localhost:${port}`));
