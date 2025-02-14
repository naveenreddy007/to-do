import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ObjectId } from 'mongodb'
import connectDB from './db.js'

const app = express()
app.use(bodyParser.json())
app.use(cors())

// Database connection
const db = await connectDB()
const todos = db.collection('todos')

// GET all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await todos.find().toArray()
    res.json(allTodos)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})

// CREATE new todo
app.post('/todos', async (req, res) => {
  try {
    const result = await todos.insertOne(req.body)
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create todo' })
  }
})

// UPDATE todo
app.put('/todos/:id', async (req, res) => {
  try {
    const result = await todos.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    )
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update todo' })
  }
})

// DELETE todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const result = await todos.deleteOne({
      _id: new ObjectId(req.params.id)
    })
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete todo' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`\n\t Server running on port ${PORT}`)
})