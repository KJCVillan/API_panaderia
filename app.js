const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Settings
const PORT = process.env.PORT ||3080;

const app = express();
app.use(bodyParser.json());

//MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'apiResDevelop',
  database: 'node_mysql'
})

// Route
app.get('/',(req, res)=>{
  res.send('Bienvenido a mi api de prueba');
})

// All customers
app.get('/customers',(req, res)=>{
  const sql = 'select * from user'
  connection.query(sql, (err, results)=> {
    if (err) throw err;
    if (results.length>0) {
      res.json(results)      
    }else{
      res.send('Not result')
    }
  });
})

// customers by id
app.get('/customers/:id',(req, res)=>{
  const { id } = req.params;
  const sql = `select * from user where idUser = ${id}`
  connection.query(sql, (err, result)=> {
    if (err) throw err;
    if (result.length>0) {
      res.json(result)      
    }else{
      res.send('Not result')
    }
  });
})

// customers by name and pass
app.post('/customer',(req, res)=>{
  const { Name, Password } = req.body;
  const sql = `select * from user where Name = '${Name}' and Password = '${Password}'`
  console.log(Name + " " + Password);
  connection.query(sql, (err, result)=> {
    if (err) throw err;
    if (result.length>0) {
      res.json(result)      
    }else{
      res.send('Not result')
    }
  });
})

// inserta un registro nuevo
app.post('/add', (req,res)=>{
  const sql = `INSERT INTO user SET?`
  const userObj ={
    Name: req.body.Name, 
    LastName: req.body.LastName, 
    Age: req.body.Age, 
    City: req.body.City, 
    Occupation: req.body.Occupation, 
    Password : req.body.Password, 
    Est: req.body.Est
  }

  connection.query(sql, userObj, err => {
    if (err) throw err;
    res.send('User created')
  });
})

// Update user whit id select
app.put('/update/:id', (req,res)=>{
  const { id } = req.params;
  const { Occupation, Est } = req.body;
  const sql = `UPDATE user SET Occupation = '${Occupation}', Est = '${Est}' WHERE idUser = ${ id }`

  connection.query(sql, err => {
    if (err) throw err;
    res.send('User update')
  });
})


// delete user by id
app.delete('/delete/:id', (req,res)=>{
  const { id } = req.params;
  const sql = `DELETE FROM user WHERE idUser = ${id}`;

  connection.query(sql, err => {
    if (err) throw err;
    res.send('User delete')
  });
})



// Chack connect
connection.connect(error=>{
  if (error) throw error;
    console.log('Database On');
})

app.listen( PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})