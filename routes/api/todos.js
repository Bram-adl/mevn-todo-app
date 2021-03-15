const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// MongoDB Connection

const url = 'mongodb://localhost:27017/mevn_todo_app';
async function todosCollection() {
    try {
        const client = await mongodb.MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        return client.db('mevn_todo_app').collection('todos');
    }
    catch (error) {
        console.log(error);
    }
};

// REST API Resource

router.get('/', async (req, res) => {
    const collection = await todosCollection();
    const todos = await collection.find().toArray();
    res.send(todos);
});

router.post('/', async (req, res) => {
    const collection = await todosCollection();
    const todo = await collection.insertOne({
        title: req.body.title,
        completed: req.body.completed,
        editing: req.body.editing,
        created_at: new Date(),
        updated_at: new Date(),
    });
    res.status(201).send(todo);
});

router.put('/:id', async (req, res) => {
    const collection = await todosCollection();
    const todo = await collection.updateOne({ _id: new mongodb.ObjectID(req.params.id) }, {
        $set: {
            title: req.body.title,
            completed: req.body.completed,
            editing: req.body.editing,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
        }
    });
    res.status(201).send(todo);
});

router.delete('/:id', async (req, res) => {
    const collection = await todosCollection();
    const todo = await collection.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send(todo)
})

module.exports = router;