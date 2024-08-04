const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors')

// Create an Express application
const app = express();
const port = 3000;
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
});

// Connect to the MySQL database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.get('/', (req, res) => {
  res.send('welcome to database')
})

//get data
app.get('/users',(req, res) => {
  const sql = 'SELECT * FROM mytable'
  connection.query(sql,(err, result) => {
    if(err){
      res.status(400).send('server error')
    }else{
      res.send(result)
    }
  })
})

// Define a route to handle data from the frontend
app.post('/data', (req, res) => {
  const name = req.body.name
  const age  = req.body.age
  const sql = "INSERT INTO mytable (name, age) VALUES (?, ?)";
  connection.query(sql, [name, age], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      console.log({ static: false, message: err });
    } else {
      console.log('Insert result:', result);
    }
  })
})

// Define the API endpoint to get the count
app.post('/total-registers', (req, res) => {
  const sql = 'SELECT COUNT(id) AS total_ids_count FROM mytable';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json({ count: result[0].total_ids_count });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
