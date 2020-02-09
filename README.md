# Employee_Tracker

This is an Express command line application using the following npm packages:
 [MySQL](https://www.npmjs.com/package/mysql)
 [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3)
 [console.table](https://www.npmjs.com/package/console.table)

To run the application, enter "node index.js" in the terminal.

Once the application is running, the user will be given the following list choices using Inquirer:
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

Depending on the choice they may be given more propmpts to get more information about the choice selected, or they may just be given the information pertaining to their selection is no additional prompting is required.

A schema.sql and seed.sql file are present in the sql folder to set the data base up and populate it with the data needed to run the application.