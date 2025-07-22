const express = require('express');
const cors = require('cors');
const app = express();
const todosRoute = require('./route/todos');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Bağlanti Okey');
});

app.use('/todos', todosRoute);

app.listen(3000, () => {
  console.log('port aktif');
});
