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
          viewEmployee();
          break;
        case "Add Role":
          viewEmployee();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Departments":
          viewEmployee();
          break;
        case "View Roles":
          viewEmployee();
          break;
        case "View Employees":
          viewEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          updateEmployeeRole();
          break;
        case "View Employees by Manager":
          viewEmployeeByDepartment();
          break;
        case "Remove Department":
          removeEmployees();
          break;
        case "Remove Role":
          removeEmployees();
          break;
        case "Remove Employees":
          removeEmployees();
          break;
        case "View Combined Salary of Department":
          addRole();
          break;
        case "End":
          connection.end();
          break;
      }
    });
}