const mysql = require ('mysql');
const inquirer = require ('inquirer');
const express = require ('express');

const app = express();
//set variables for arrays
let roleArr = [];
let managerArr = [];
let departmentArr = [];
let employeeArr = [];


//set the port to a variable
const PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set the connection to mysql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'EarlyC1990',
    database: 'employee_db',
  });
//Open the connection to mysql  
  connection.connect((err) => {
    if (err) {
      console.error(`error connecting: ${err.stack}`);
      return;
    }
    console.log(`connected as id ${connection.threadId}`);
  });

//store the employee database in an array.
function mainMenu() {
    //prompt the user to select a field to start
    inquirer.prompt(
        [
          {
            name:'menu',
            type:'list',
            message:'-----------MAIN MENU OPTIONS--------------',
            choices:[
                'View all employees',
                'View all employess by role',
                'View all employess by department',
                'View all employess by manager',
                'Add employee',
                'Add department',
                'Add role',
                'Delete employee',
                'Delete role',
                'Delete department',
                'Update employee role',
                // 'Update employee manager',
                'Exit'
            ]
        }
      ]
    ).then((answer) => {
        //use a switch case to choose what is displayed

        switch(answer.menu){
            case 'View all employees':
              viewAllEmployees();
            break;
            case 'View all employess by role':
              viewAllEmployeesByRole();
            break;
            case 'View all employess by department':
              viewAllEmployeesByDept();
            break;
            case 'View all employess by manager':
              viewAllEmployeesByManager();
            break;
            case 'Add employee':
              addEmployee();
            break;
            case 'Add department':
              addDept();
            break;
            case 'Add role':
              addRole();
            break;
            case 'Delete employee':
              delEmployee();
            break;
            case 'Delete role':
              delRole();
            break;
            case 'Delete department':
              delDept();
            break;
            case 'Update employee role':
              updEmpRole();
            break;
            // case 'Update employee manager':
            //   updEmpManager();
            // break;
            case 'Exit':
              exitApp();
            break;

        }
    })
}

mainMenu();

function viewAllEmployees(){
    //the query used to return all employee data
    let myQuery = 'SELECT * FROM employee';

    connection.query(myQuery, function(err, res) {
      if (err) throw err;
      console.table(res);

      //return the user back to the main menu
      mainMenu();
    })
}


function viewAllEmployeesByRole(){
  //the query used to return all employee data
  let myQuery = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee INNER JOIN role USING (role_id) ORDER BY title ASC;'

  connection.query(myQuery, function(err, res) {
    if (err) throw err;
    console.table(res);

    //return the user back to the main menu
    mainMenu();
  })
}

function viewAllEmployeesByDept(){
  //the query used to return all employee data
  let myQuery = 'SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee INNER JOIN role USING (role_id) INNER JOIN department USING (department_id) ORDER BY name ASC;'

  connection.query(myQuery, function(err, res) {
    if (err) throw err;
    console.table(res);

    //return the user back to the main menu
    mainMenu();
  })
}

function viewAllEmployeesByManager(){
  //the query used to return all employee data
  let myQuery = 'SELECT * FROM employee;'

  connection.query(myQuery, function(err, res) {
    if (err) throw err;
    console.table(res);

    //return the user back to the main menu
    mainMenu();
  })
}


function addEmployee(){
  //the query used to return all employee data
     inquirer.prompt(
  [
    {
      name:'firstName',
      type:'input',
      message:'Enter the first name.'
    },
    {
      name:'lastName',
      type:'input',
      message:'Enter the last name.'
    },
    {
      name:'roleId',
      type:'list',
      message:"What is their role Id?",
      choices: getRoleArr()
    },
    {
      name:'managerId',
      type:'list',
      message:'What is their manager Id?',
      choices: getManagerArr()
    }
  ]
  ).then((answer) => {
      let roleIndex = getRoleArr().indexOf(answer.roleId) + 1;
      let managerIndex = getManagerArr().indexOf(answer.managerId) + 1;

    let ansInsert = `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${managerIndex}, ${roleIndex});`;
    connection.query(ansInsert, function(err, res) {
      if (err) throw err;
        console.log(`${answer.firstName} ${answer.lastName} was succesfully added to the database.`); 
        mainMenu();
    })
  });
}

//Add new department to database
function addDept() {
  let addNewDept = 
  inquirer.prompt(
    [
      {
        name:'dept',
        type:'input',
        message:'What department would you like to add?'
      }
    ]
  ).then((answer) => {
    connection.query(`INSERT INTO department(name) VALUES('${answer.dept}');`, function(err,res) {
      if(err) throw err;
      console.log(`${answer.dept} was successfully added to the database.`);
      mainMenu();
    })
  })
}

//Add new role to database
function addRole() {
  let addNewRole =  
    inquirer.prompt(
      [
        {
          name:'role',
          type:'input',
          message:'What role would you like to add?'
        },
        {
          name:'salary',
          type:'input',
          message:'What is their salary?'
        },
        {
          name:'deptId',
          type:'list',
          message:'Which department are they associated with?',
          choices: getDeptArr()
        }
      ]
    ).then((answer) => {
      let deptIndex = getDeptArr().indexOf(answer.deptId) + 1;
      connection.query(`INSERT INTO role(title, salary, department_id) VALUES ('${answer.role}', ${answer.salary}, ${deptIndex});`, function(err, res) {
        if(err) throw err;
        console.log(`${answer.role} was successfully added to the database.`);
        mainMenu();
      })
    })
}
  

//Delete the selected employee from the database
function delEmployee() {
    inquirer.prompt(
      [
        {
          name:'yesNo',
          type:'list',
          message:'Are you sure you would like to remove an employee?',
          choices:[
            'Yes',
            'No'
          ]
        },
        {
          name:'deleteEmp',
          type:'list',
          message:'Which employee would you like to remove?',
          choices: getEmpArr()
        }
      ]
      ).then((answer) => {
        if(answer.yesNo === 'Yes') {
        connection.query(`DELETE FROM employee WHERE first_name = '${answer.deleteEmp}';`, function(err, res) {
          if(err) throw err;
          console.log(`${answer.deleteEmp} was successfully removed from the database.`);
        })
        mainMenu();
      }else{
        mainMenu();
      }
      
      })
}

//Delete the selected role from the database
function delRole() {
  inquirer.prompt(
    [
      {
        name:'yesNo',
        type:'list',
        message:'Are you sure you would like to remove a role?',
        choices:[
          'Yes',
          'No'
        ]
      },
      {
        name:'deleteRole',
        type:'list',
        message:'Which role would you like to remove?',
        choices: getRoleArr()
      }
    ]
  ).then((answer) => {
    if(answer.yesNo === 'Yes') {
    connection.query(`DELETE FROM role WHERE title = '${answer.deleteRole}'`, function(err, res) {
      if(err) throw err;
      console.log(`${answer.deleteRole} was successfully removed from the database.`)
      mainMenu()
    })
  }else {
    mainMenu()
  }
  })
}

//Delete the selected department from the database
function delDept() {
  inquirer.prompt(
    [
      {
        name:'yesNo',
        type:'list',
        message:'Are you sure you would like to remove a role?',
        choices:[
          'Yes',
          'No'
        ]
      },
      {
        name:'deleteDept',
        type:'list',
        message:'Which department would you like to remove?',
        choices: getDeptArr()
      }
    ]
  ).then((answer) => {
    if(answer.yesNo === 'Yes') {
    connection.query(`DELETE FROM department WHERE name = '${answer.deleteDept}'`, function(err, res) {
      if(err) throw err;
      console.log(`${answer.deleteDept} was successfully removed from the database.`);
      mainMenu();
    })
  }else {
    mainMenu();
  }
  })

}

//Update the selected employees role
function updEmpRole() {
  inquirer.prompt(
    [
      {
        name:'yesNo',
        type:'list',
        message:"Are you sure you would like to update an employee's role?",
        choices:[
          'Yes',
          'No'
        ]
      },
      {
        name:'updRole',
        type:'list',
        message:'Which employees role would you like to update?',
        choices: getEmpArr()
      },
      {
        name:'newRole',
        type:'list',
        message:'Select a new role.',
        choices: getRoleArr()
      }
    ]
  ).then((answer) => {
    
    if(answer.yesNo === 'Yes') {
      let roleIndex = getRoleArr().indexOf(answer.newRole) + 1;
      console.log(roleIndex)
      connection.query(`UPDATE employee SET role_id = ${roleIndex} WHERE first_name = '${answer.updRole}'`, function(err, res) {
      if(err) throw err;
      console.log(`${answer.updRole}'s role was successfully changed to ${answer.newRole}`)
      mainMenu();
    })
    }else{
      mainMenu();
    }
  })
}

//Update the selected employees department
function updEmpManager() {
  inquirer.prompt(
    [
      {
        name:'updRole',
        type:'list',
        message:'Which employees role would you like to update?',
        choices: getEmpArr()
      },
      {
        name:'newDept',
        type:'list',
        message:'Select a new department.',
        choices: getDeptArr()
      }
    ]
  ).then((answer) => {
    let deptIndex = getDeptArr().indexOf(answer.newDept);
    let empIndex = getEmpArr().indexOf(answer.updRole);
    connection.query(`UPDATE employee SET department_id = ${deptIndex} WHERE id = ${empIndex};`, function(err, res) {
      if(err) throw err;
      console.log(`${answer.updRole} department was successfully changed to ${answer.newDept}`)
      mainMenu();
    })
  })
}


//End the app connection
function exitApp() {
  console.log('Thank you for using Employee Tracker.');
  process.exit(0);
  }

  //Get the role array for the prompts
  function getRoleArr() {
    roleArr = [];
    connection.query('SELECT * FROM role;', function(err, res)  {
      if (err) throw err;
      for(let i = 0; i < res.length; i++) {
        roleArr.push(res[i].title);
      }
    });
    return roleArr;
  }
  
  //Get the manager array for the prompts
  function getManagerArr() {
    managerArr = [];
    connection.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;', function(err,res) {
      if (err) throw err;
      for(let i = 0; i < res.length; i++) {
        managerArr.push(res[i].first_name);
      }
    });
    return managerArr;
  }
  
  //Get the department array for the prompts
  function getDeptArr() {
    departmentArr = [];
    connection.query('SELECT * FROM department;', function(err,res) {
      if (err) throw err;
      for(let i = 0; i < res.length; i++) {
        departmentArr.push(res[i].name);
      }
    });
    return departmentArr;
  }
  
  //Get the employee array for the prompts
  function getEmpArr() {
    employeeArr = [];
    connection.query('SELECT employee.first_name FROM employee;', function(err, res) {
      if (err) throw err;
      for(let i = 0; i < res.length; i++) {
        employeeArr.push(res[i].first_name)
      }
    });
    return employeeArr;
}

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});