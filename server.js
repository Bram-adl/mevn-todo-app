const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares

app.use(bodyParser.json());
app.use(cors());

const todos = require('./routes/api/todos');
app.use('/api/todos', todos);

// Start Server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));