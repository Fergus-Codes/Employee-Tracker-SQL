
// Import and require mysql2 & inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'classlist_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

// Prompt questions
inquirer
  .prompt([
    {
      type: 'list',
      message: 'Please select from the following options below;',
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
      name:"userchoice"
    }
])

    if (answers.userchoice == "View all departments") {
        viewAllDepartments()
    }
    if (answers.userchoice == "View all roles") {
        viewAllRoles()
    }
    if (answers.userchoice == "View all employees") {
        viewAllEmployees()
    }
    if (answers.userchoice == "Add a department") {
        addADepartment()
    }
    if (answers.userchoice == "Add a role") {
        addARole()
    }
    if (answers.userchoice == "Add an employee") {
        addAnEmployee()
    }
    if (answers.userchoice == "Update an employee role") {
        updateEmployeeRole()
    }

function viewAllDepartments () {
 //select * from departments
}

function viewAllRoles () {
 // select * from roles
}

function viewAllEmployees () {
// select * from employees
}

function addADepartment () {

    inquirer
    .prompt([

      {
        type: "input",
        message: 'Please enter the name of the department you would like to add',
        name: "departmentname"
      },

    ])

.then((answers) => {
      if (answers.departmentname.length === 0 ) {

console.log("Please enter a valid department name")
 
      } else {
// add the department name to department table 

console.log(`The ${answers.departmentname} department has been added to the database`)
      }
      
})};


function addARole () {

    inquirer
    .prompt([
      {
        type: "input",
        message: 'Please enter the role title',
        name: "roletitle"
      },
      {
        type: "input",
        message: 'Please enter the role salary',
        name: "rolesalary"
      },
      {
        type: "input",
        message: 'Please enter the role department',
        name: "roledepartment"
      },
  ])

  .then((answers) => {
    if(answers.roletitle.length == 0) {

        console.log("Please enter a valid role title")

    } else {
    if(answers.rolesalary.length == 0) {

        console.log("Please enter a valid role salary")

    } else {
    if(answers.roledepartment.length == 0) {

        console.log("Please enter a valid role department")

    } else {

// add all user input to create a new role
console.log(`The ${answers.roletitle} role has been added to the database`)

    }}}
  })
}

function addAnEmployee () {

    inquirer
    .prompt([
      {
        type: "input",
        message: 'Please enter the new employees first name',
        name: "employeefirstname"
      },
      {
        type: "input",
        message: 'Please enter the new employees last name',
        name: "employeelastname"
      },
      {
        type: "input",
        message: 'Please enter the role of the employee',
        name: "employeerole"
      },
  ])

  .then((answers) => {
    if(answers.employeefirstname.length == 0) {

        console.log("Please enter a valid employee first name")

        return;

    } else {
    if(answers.employeelastname.length == 0) {

        console.log("Please enter a valid employee last name")

        return;

    } else {
    if(answers.employeerole.length == 0) {

        console.log("Please enter a valid employee role")

        return;

    } else {
// add all user input to create a new role
console.log(`The ${answers.roletitle} role has been added to the database`)
    }}}
  })
}

function updateEmployeeRole () {

    inquirer
    .prompt([
      {
        type: 'list',
        message: 'Please select from the following options below;',
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        name:"userchoice"
      }
  ])
}

