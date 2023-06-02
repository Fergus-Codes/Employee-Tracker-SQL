// Import and require mysql2 & inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');


// Connect to SQL database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the emplyoee_db database.`)
);

// Prompt questions
function initUserPrompts () {
inquirer
  .prompt([
    {
      type: 'list',
      message: 'Please select from the following options below;',
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
      name:"userchoice"
    }
])

    .then((answers) => {

    if (answers.userchoice == "View all departments") {

        viewAllDepartments()

    } else if (answers.userchoice == "View all roles") {

        viewAllRoles()

    } else if (answers.userchoice == "View all employees") {

        viewAllEmployees()

    } else if (answers.userchoice == "Add a department") {

        addADepartment()

    } else if (answers.userchoice == "Add a role") {

        addARole()

    } else if (answers.userchoice == "Add an employee") {

        addAnEmployee()

    } else if (answers.userchoice == "Update an employee role") {

        updateEmployeeRole()

    }
})};

function viewAllDepartments () {
 //select * from departments
 db.query('SELECT * FROM department \G', function (err, results) {
    console.log('|--------------------Result----------------------|')
    console.log(results)
    console.log('|------------------------------------------------|')
    initUserPrompts()
});
};

function viewAllRoles () {

    db.query('SELECT * FROM role \G', function (err, results) {
        console.log('|--------------------Result----------------------|')
        console.log(results)
        console.log('|------------------------------------------------|')

        initUserPrompts()
    });
 // select * from roles
};

function viewAllEmployees () {
// select * from employees
db.query('SELECT * FROM employee \G', function (err, results) {
    console.log('|--------------------Result----------------------|')
    console.log(results)
    console.log('|------------------------------------------------|')

    initUserPrompts()
});
};

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
        console.log('|--------------------Result----------------------|')
          console.log("Please enter a valid department name");
        console.log('|------------------------------------------------|')

          initUserPrompts();
        } else {
          let newDepartment = answers.departmentname;
          // using placeholder '?' to avoid SQL injection attacks
          db.query('INSERT INTO department (name) VALUES (?);', [newDepartment], function (err, results) {
            if (err) {
              // error handling
              console.log('|--------------------Result----------------------|')
              console.error("An error occurred while adding the department: ", err);
              console.log('|------------------------------------------------|')
              return;
            }
            console.log('|--------------------Result----------------------|')
            console.log(results);
            console.log(`The ${answers.departmentname} department has been added to the database`);
            console.log('|------------------------------------------------|')
            initUserPrompts();
          });
        }
      });
};

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
        message: 'Please enter the role department ID',
        name: "roledepartment"
      },
  ])

  .then((answers) => {
    if(answers.roletitle.length == 0) {
        console.log('|--------------------Result----------------------|')
        console.log("Please enter a valid role title")
        console.log('|------------------------------------------------|')
    } else {
    if(answers.rolesalary.length == 0) {
        console.log('|--------------------Result----------------------|')
        console.log("Please enter a valid role salary")
        console.log('|------------------------------------------------|')
    } else {

    if(answers.roledepartment.length == 0) {
        console.log('|--------------------Result----------------------|')
        console.log("Please enter a valid role department")
        console.log('|------------------------------------------------|')
    } else {

          // using placeholder '?' to avoid SQL injection attacks
          db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [answers.roletitle, answers.rolesalary, answers.roledepartment], function (err, results) {
            if (err) {
              // error handling
              console.log('|--------------------Result----------------------|')
              console.error("An error occurred while adding the role: ", err);
              console.log('|------------------------------------------------|')
              return;
            }
            console.log('|--------------------Result----------------------|')
            console.log(results);
            console.log(`The ${answers.roletitle} role has been added to the database`);
            console.log('|------------------------------------------------|')
            initUserPrompts();
          });
    }}}
  })
};

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
        message: 'Please enter the role ID of the employee (must be a number)',
        name: "employeerole"
      },
      {
        type: "input",
        message: 'Please enter the employees manager ID (must be a number)',
        name: "employeemanagerid"
      },
  ])

  .then((answers) => {
    if(answers.employeefirstname.length == 0) {
        console.log('|--------------------Result----------------------|')
        console.log("Please enter a valid employee first name")
        console.log('|------------------------------------------------|')
        return;

    } else {
    if(answers.employeelastname.length == 0) {
        console.log('|--------------------Result----------------------|')
        console.log("Please enter a valid employee last name")
        console.log('|------------------------------------------------|')
        return;

    } else {
    if(answers.employeerole.length == 0) {
        console.log('|--------------------Result----------------------|')
        console.log("Please enter a valid employee role ID")
        console.log('|------------------------------------------------|')
        return;

    } else {
// add all user input to create a new role
          // using placeholder '?' to avoid SQL injection attacks
          db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [answers.employeefirstname , answers.employeelastname , answers.employeerole, answers.employeemanagerid], function (err, results) {
            if (err) {
              // error handling\
              console.log('|--------------------Result----------------------|')
              console.error("An error occurred while adding the employee: ", err);
              console.log('|------------------------------------------------|')
              return;
            }
            console.log('|--------------------Result----------------------|')
            console.log(results);
            console.log(`${answers.employeefirstname} ${answers.employeelastname}  has been added to the employee database`);
            console.log('|------------------------------------------------|')
            initUserPrompts();
          });

initUserPrompts()

    }}}
  })
};

function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Please enter the employee ID of the employee you would like to update.',
          name: 'updateemployeeid'
        },
        {
          type: 'list',
          message: 'Please select what you would like to update on the employee\'s record.',
          choices: ["first_name", "last_name", "role_id", "manager_id"],
          name: 'updateemployeefield'
        },
        {
          type: 'input',
          message: 'Please enter the value that you would like to replace the current value with on the employee\'s record.',
          name: 'updatecontent'
        },
      ])
      .then((answers) => {
        if (answers.updateemployeeid.length === 0) {
            console.log('|--------------------Result----------------------|')
          console.log('Please ensure you enter a valid employee ID');
          console.log('|------------------------------------------------|')

        } else {
          let updateSelectedEmployee = answers.updateemployeeid;
          let updateField = '`' + answers.updateemployeefield + '`'; // Enclose field name within backticks
          let updateContent = answers.updatecontent;
  
          let sql = 'UPDATE employee SET ' + updateField + ' = ? WHERE id = ?';
          let values = [updateContent, updateSelectedEmployee];
  
          db.query(sql, values, function (err, results) {
            if (err) {
                console.log('|--------------------Result----------------------|')
              console.error('An error occurred while updating the employee:', err);
              console.log('|------------------------------------------------|')
              return;
            }
            console.log('|--------------------Result----------------------|')
            console.log(results);
            console.log(`The records for employee ${updateSelectedEmployee} have been updated in the database`);
            console.log('|------------------------------------------------|')
            initUserPrompts();
          });
        }
      });
};

initUserPrompts();