const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'alumno',
  password: 'alumnoipm',
  database: 'form'
});

// Connect to database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to DB:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Serve the form if needed
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html'); // Or your HTML filename
});

// Handle form POST
app.post('/submit', (req, res) => {
  const { rating, megusta, mejoras, errores, recomendaciones } = req.body;

  const sql = `insert into formulario (rating, megusta, mejoras, errores, recomendaciones) VALUES (?, ?, ?, ?, ?)`;
  const values = [rating, megusta, mejoras, errores, recomendaciones];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error saving feedback');
      return;
    }

    app.use(express.static(__dirname));
    res.redirect('/');
    console.log("se inserto bien en la base de datos.");
    
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
