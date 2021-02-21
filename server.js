const mysql = require ('mysql');
const inquirer = require ('inquirer');
const app = require ('express')();

const PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'EarlyC1990',
    database: 'employee_db',
  });
  
  connection.connect((err) => {
    if (err) {
      console.error(`error connecting: ${err.stack}`);
      return;
    }
  
    console.log(`connected as id ${connection.threadId}`);
  });




  app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);