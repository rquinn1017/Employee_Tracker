const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Braydan$42",
  database: "employeesDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log("connected as id " + connection.threadId);
  firstPrompt();
});

// function which prompts the user for what action they should take
function firstPrompt() {

  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Role",
        "Update Employee Mangager",
        "View Employees by Manager",
        "Remove Department",
        "Remove Role",
        "Remove Employee",
        "View Combined Salary of Department",
        "End"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          updateEmployeeManager();
          break;
        case "View Employees by Manager":
          viewEmployeeByManager();
          break;
        case "Remove Department":
          removeDepartment();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "Remove Employees":
          removeEmployees();
          break;
        case "View Combined Salary of Department":
          viewCombinedSalary();
          break;
        case "End":
          connection.end();
          break;
      }
    });
}

//Add Department
function addDepartment() {
  console.log("Inserting an department!")

  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department's name?"
      }
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO department SET ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        {
          name: answer.name
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.insertedRows + "Inserted successfully!\n");

          firstPrompt();
        });
      // console.log(query.sql);
    });
}


//Add Role
function addRole() {
  console.log("Inserting an department!")

  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's title?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the role's salary?"
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the role's department ID?"
      }
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO role SET ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.insertedRows + "Inserted successfully!\n");

          firstPrompt();
        });
      // console.log(query.sql);
    });
}

//Add Employee
function addEmployee() {
  console.log("Inserting an employee!")

  var query =
    `SELECT r.id, r.title, r.salary 
      FROM role r`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));

    console.table(res);
    console.log("RoleToInsert!");

    promptInsert(roleChoices);
  });
}

function promptInsert(roleChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
      },
      // {
      //   name: "manager_id",
      //   type: "list",
      //   message: "What is the employee's manager_id?",
      //   choices: manager
      // }
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.insertedRows + "Inserted successfully!\n");

          firstPrompt();
        });
      // console.log(query.sql);
    });
}

//View Departments
function viewDepartments() {
  console.log("Viewing departments!")

      var query = "Select * from department"
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        
        function (err, res) {
          if (err) throw err;

          console.table(res);
          
          firstPrompt();
        }
      )
};

//View Roles
function viewRoles() {
  console.log("Viewing roles!")

      var query = "Select * from role"
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        
        function (err, res) {
          if (err) throw err;

          console.table(res);
          
          firstPrompt();
        }
      )
};

//View Employees
function viewEmployees() {
  console.log("Viewing employees!")

      var query = "Select * from employee"
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        
        function (err, res) {
          if (err) throw err;

          console.table(res);
          
          firstPrompt();
        }
      )
};




//View Employees
// function viewEmployeeByRole() {
//   console.log("Viewing employees!")

//       var query = "Select  from employee"
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(query,
        
//         function (err, res) {
//           if (err) throw err;

//           console.table(res);
          
//           firstPrompt();
//         }
//       )
// };