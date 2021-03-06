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
        "Update Employee Manager",
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
        case "Remove Employee":
          removeEmployee();
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

//Add Department-----------------------------------------------------------
function addDepartment() {
  
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department's name?"
      }
    ])
    .then(function (answer) {
      
      var query = `INSERT INTO department SET ?`

      connection.query(query,
        {
          name: answer.name
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + " record inserted successfully!\n");

          firstPrompt();
        });
    });
}


//Add Role---------------------------------------------------------------------------------
function addRole() {
  
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
      
      var query = `INSERT INTO role SET ?`

      connection.query(query,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + " record inserted successfully!\n");

          firstPrompt();
        });
    });
}

//Add Employee----------------------------------------------------------------------
function addEmployee() {
  managers();
}

function managers() {

  var query =
    `SELECT DISTINCT manager_id 
    FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    let managersChoices = res.map(({ manager_id }) => ({
      value: manager_id
    }));

    availableRoles(managersChoices);
  });
}

function availableRoles(managersChoices) {

  var query =
    `SELECT r.id, r.title, r.salary 
    FROM role r`
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));

    insertEmployee(managersChoices, roleChoices)
  });
}

function insertEmployee(managersChoices, roleChoices) {

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
      {
        name: "manager_id",
        type: "list",
        message: "What is the employee's manager_id?",
        choices: managersChoices
      }
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`

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
          console.log(res.affectedRows + " record inserted successfully!\n");

          firstPrompt();
        });
    });
}

//View Departments------------------------------------------------------------------------------
function viewDepartments() {
  console.log("Viewing departments!")

  var query = "Select * from department"

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

  connection.query(query,

    function (err, res) {
      if (err) throw err;

      console.table(res);

      firstPrompt();
    }
  )
};

//View Employees----------------------------------------------------------------------------------
function viewEmployees() {
  console.log("Viewing employees!")

  var query = "Select * from employee"

  connection.query(query,

    function (err, res) {
      if (err) throw err;

      console.table(res);

      firstPrompt();
    }
  )
};


//Update employee role------------------------------------------------------------------------------------
function updateEmployeeRole() {
  employeeArr();

}

function employeeArr() {

  var query =
    `SELECT e.id, e.first_name, e.last_name
  FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    let employeeList = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`
    }));

    roleArr(employeeList);
  });
}

function roleArr(employeeList) {

  var query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
  let roleList;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleList = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));

    console.table(res);

    promptEmployeeRole(employeeList, roleList);
  });
}

function promptEmployeeRole(employeeList, roleList) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeList
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to set for the selected employee?",
        choices: roleList
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employee SET role_id = ? WHERE id = ?`

      connection.query(query,
        [answer.roleId,
        answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + " record updated successfully!");

          firstPrompt();
        });
    });
};

//Update employee manager--------------------------------------------------------------------------
function updateEmployeeManager() {
  employeeArray()

}

function employeeArray() {

  var query =
    `SELECT e.id, e.first_name, e.last_name
  FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    let employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`
    }));

    managerArray(employeeChoices);
  });
}

function managerArray(employeeChoices) {
  console.log("Updating a manager");

  var query =
    `SELECT DISTINCT e.manager_id 
  FROM employee e`

  let managerChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    managerChoices = res.map(({ manager_id }) => ({
      value: manager_id
    }));

    updateEmployeeBoss(employeeChoices, managerChoices);
  });
}

function updateEmployeeBoss(employeeChoices, managerChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "managerId",
        message: "Which manager ID do you want to set for the selected employee?",
        choices: managerChoices
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employee SET manager_id = ? WHERE id = ?`

      connection.query(query,
        [answer.managerId,
        answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + " record updated successfully!");

          firstPrompt();
        });
    });
};

//View Employee by Manager
function viewEmployeeByManager() {

  var query =
    `SELECT DISTINCT e.manager_id 
FROM employee e
WHERE e.manager_id IS NOT NULL`
  let managerChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    managerChoices = res.map(({ manager_id }) => ({
      value: manager_id
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "managerId",
          message: "Which manager ID do you want to see employees for?",
          choices: managerChoices
        },
      ])
      .then(function (answer) {

        var query = `Select * from employee WHERE manager_id = ?`

        connection.query(query,
          [answer.managerId
          ],
          function (err, res) {
            if (err) throw err;

            console.table(res);
            console.log(res);

            firstPrompt();
          });
      });
  })
}


//Remove Department--------------------------------------------------------------------------------
function removeDepartment() {

  var query =
    `SELECT d.id, d.name 
      FROM department d`

  connection.query(query, function (err, res) {
    if (err) throw err;

    let deptChoices = res.map(({ id, name }) => ({
      value: id, name
    }));

    console.table(res);

    promptDeleteDept(deptChoices);
  });
}

function promptDeleteDept(deptChoices) {

  inquirer
    .prompt([

      {
        type: "list",
        name: "deptID",
        message: "Which department would you like to delete?",
        choices: deptChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE from department WHERE ?`

      connection.query(query,
        {
          id: answer.deptID,
        },
        function (err, res) {
          if (err) throw err;

          console.log(res.affectedRows + " record deleted successfully!\n");

          firstPrompt();
        });

    });
}
//Remove Role--------------------------------------------------------------------------------
function removeRole() {

  var query =
    `SELECT r.id, r.title, r.salary, r.department_id 
      FROM role r`

  connection.query(query, function (err, res) {
    if (err) throw err;

    let roleChoices = res.map(({ id, title, salary, department_id }) => ({
      value: id, title, salary, department_id
    }));

    console.table(res);

    promptRemoveRole(roleChoices);
  });
}

function promptRemoveRole(roleChoices) {

  inquirer
    .prompt([

      {
        type: "list",
        name: "roleNum",
        message: "Which role would you like to delete?",
        choices: roleChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE from role WHERE ?`

      connection.query(query,
        {
          id: answer.roleNum,
        },
        function (err, res) {
          if (err) throw err;

          console.log(res.affectedRows + " record deleted successfully!\n");

          firstPrompt();
        });

    });
}


// //Remove Employee--------------------------------------------------------------------------------
function removeEmployee() {
  console.log("Remove employee!")

  var query =
    `SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id 
      FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    let employees = res.map(({ id, first_name, last_name, role_id, manager_id }) => ({
      value: id, first_name, last_name, role_id, manager_id
    }));

    console.table(res);

    promptDeleteEmployee(employees);
  });
}

function promptDeleteEmployee(employees) {

  inquirer
    .prompt([

      {
        type: "list",
        name: "empID",
        message: "Which employee would you like to delete?",
        choices: employees
      }
    ])
    .then(function (answer) {

      var query = `DELETE from employee WHERE ?`

      connection.query(query,
        {
          id: answer.empID,
        },
        function (err, res) {
          if (err) throw err;

          console.log(res.affectedRows + " record deleted successfully!\n");

          firstPrompt();
        });

    });
}


//View Combined Salary of Department-------------------------------------------------------------------------------
function viewCombinedSalary() {

  var query =
    `SELECT d.id, d.name 
      FROM department d`

  connection.query(query, function (err, res) {
    if (err) throw err;

    let deptChoices = res.map(({ id, name }) => ({
      value: id, name
    }));

    console.table(res);

    promptSelectSalary(deptChoices);
  });
}

function promptSelectSalary(deptChoices) {

  inquirer
    .prompt([

      {
        type: "list",
        name: "deptID",
        message: "Which department would you like to see the total salary for?",
        choices: deptChoices
      }
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `Select SUM(salary) from role WHERE ?`

      connection.query(query,
        {
          id: answer.deptID,
        },
        function (err, res) {
          if (err) throw err;

          console.log(res);

          firstPrompt();
        });

    });
}