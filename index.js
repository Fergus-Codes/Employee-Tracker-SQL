//! TODO: Make screen recording




// Import and require mysql2 & inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config()


// Connect to SQL database -- DONT FORGET TO ADD PASSWORD 
const db = mysql.createConnection(
  {
    // SQL Host
    host: process.env.SQL_HOST,
    // MySQL username
    user: process.env.SQL_USERNAME,
    // MySQL password
    password: process.env.SQL_PASSWORD,
    // MySQL Database
    database: process.env.SQL_DATABASE
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
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Update employee managers", "View employees by manager", "View employees by department", "Delete departments, roles and employees", "View total utalized budget per department"],
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

    } else if (answers.userchoice == "Update employee managers") {

        updateEmployeeManagers ()

    } else if (answers.userchoice == "View employees by manager") {

        viewEmployeesByManager ()

    } else if (answers.userchoice == "View employees by department") {

        viewEmployeesByDepartment ()

    } else if (answers.userchoice == "Delete departments, roles and employees") {
        
        deleteData ()

    } else if (answers.userchoice == "View total utalized budget per department") {

        totalUtalizedBudget ()

    }
})};

// View all Departments function
function viewAllDepartments () { // COMPLETE
 //select * from departments
 db.query('SELECT * FROM department ', function (err, results) {
    console.log('|--------------------Result----------------------|')
    console.table(results)
    console.log('|------------------------------------------------|')
    initUserPrompts()
});
};

// View all Roles function
function viewAllRoles () { // COMPLETE

    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {

      if (err)
      throw err

        console.log('|--------------------Result----------------------|')
        console.table(results)
        console.log('|------------------------------------------------|')

        initUserPrompts()
    });
 // select * from roles
};

// View all employees function
function viewAllEmployees () { // COMPLETE
// select * from employees
db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary AS salary, department.name AS department, CONCAT (manager.first_name," ", manager.last_name) AS manager  FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', function (err, results) {

  if(err)
  throw err

    console.log('|--------------------Result----------------------|')
    console.table(results)
    console.log('|------------------------------------------------|')

    initUserPrompts()
});
};

// Add a department function
function addADepartment () { // COMPLETE
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

// Add a role function
function addARole () { // COMPLETE

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

// Add an employee function
function addAnEmployee () { // COMPLETE

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

// update an employees role function
function updateEmployeeRole() { // COMPLETE
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
          let updateField = '`' + answers.updateemployeefield + '`'; 
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
            console.table(results);
            console.log(`The records for employee ${updateSelectedEmployee} have been updated in the database`);
            console.log('|------------------------------------------------|')
            initUserPrompts();
          });
        }
      });
};

// update manager of an employee function
function updateEmployeeManagers () { // COMPLETE
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter the employee ID of the employee you would like to update.',
        name: 'changeManagerEmployeeID'
      },
      {
        type: 'input',
        message: 'Please enter the new manager you would like to update the employees record with',
        name: 'newManager'
      },
    ])
    .then((answers) => {
      if (answers.changeManagerEmployeeID.length === 0) {
            console.log('|--------------------Result----------------------|')
            console.log('Please ensure you enter a valid employee ID');
            console.log('|------------------------------------------------|')

      } else {
        let updateSelectedEmployee = answers.changeManagerEmployeeID;
        let updateContent = answers.newManager;

        let sql = 'UPDATE employee SET manager_id = ? WHERE id = ?';
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
          console.log(`The manager for employee ${updateSelectedEmployee} has been updated in the database`);
          console.log('|------------------------------------------------|')
          initUserPrompts();
        });
      }
    });


}

// view all employees by manager
function viewEmployeesByManager () { // COMPLETE
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter a manager ID to view all employees',
        name: 'viewEmpByManagerID'
      },
    ])
    .then((answers) => {
      if (answers.viewEmpByManagerID.length === 0) {

            console.log('|--------------------Result----------------------|')
            console.log('Please ensure you enter a valid manager ID');
            console.log('|------------------------------------------------|')

      } else {

        let sql = 'SELECT * FROM EMPLOYEE WHERE manager_id = ?';
        let values = [answers.viewEmpByManagerID];

        db.query(sql, values, function (err, results) {
          if (err) {
                console.log('|--------------------Result----------------------|')
                console.error('An error occurred while updating the employee:', err);
                console.log('|------------------------------------------------|')
            return;
          }
            console.log('|--------------------Result----------------------|')
            console.table(results)
            console.log('|------------------------------------------------|')

          initUserPrompts();
        });
      }
    });


}


// view all employees by department
function viewEmployeesByDepartment () { // COMPLETE
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please enter a department ID to view all employees',
        name: 'viewEmpByDepartmentID'
      },
    ])
    .then((answers) => {
      if (answers.viewEmpByDepartmentID.length === 0) {

            console.log('|--------------------Result----------------------|')
            console.log('Please ensure you enter a valid department ID');
            console.log('|------------------------------------------------|')

      } else {
        
        let sql = 
        `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department
        FROM employee
         WHERE department.id = ?`;
        
        let departmentID = answers.viewEmpByDepartmentID
        db.query(sql, departmentID, function (err, results) {
          if (err) {
                console.log('|--------------------Result----------------------|')
                console.error('An error occurred while updating the employee:', err);
                console.log('|------------------------------------------------|')
            return;
          }
            console.log('|--------------------Result----------------------|')
            console.log(results)
            console.log('|------------------------------------------------|')

          initUserPrompts();
        });
      }
    });
}


// Delete selected data from selected tables function
function deleteData () { // INCOMPLETE
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'Please select what you would like to delete from the database',
      choices: ["Delete an employee", "Delete a department", "Delete a role"],
      name: 'userDeleteQuery'
    },
    {
      type:'input',
      message: 'Please enter the ID of the department, role or employee you wish to delete',
      name:'deleteID'
    }
  ])
  .then((answers) => {

    if (answers.userDeleteQuery.length === 0) {

          console.log('|--------------------Result----------------------|')
          console.log('Please ensure you enter a valid item from the list');
          console.log('|------------------------------------------------|')
          
    } else { 

     if (answers.userDeleteQuery == "Delete an employee") {

      console.log(answers.deleteID)

      db.query(`DELETE FROM employee WHERE id = ?;` , [answers.deleteID], function (err, results) {

         if (err) {
                console.log('|--------------------Result----------------------|')
                console.error('An error occurred while deleting the employee:', err);
                console.error(serverStatus)
                console.log('|------------------------------------------------|')
            return;
      }

      console.log('|--------------------Result----------------------|')
      console.log(results)
      console.log('|------------------------------------------------|')

      initUserPrompts();
    
      })

     } else {

      if( answers.userDeleteQuery == "Delete a department") {

      db.query(`DELETE FROM department WHERE id = ?;`, [answers.deleteID], function (err, results) {

        if (err) {
          console.log('|--------------------Result----------------------|')
          console.error('An error occurred while deleting the department:', err);
          console.log('|------------------------------------------------|')
        return;
        }

        console.log('|--------------------Result----------------------|')
        console.log(results)
        console.log('|------------------------------------------------|')

        initUserPrompts();
      })

     } else {

      if( answers.userDeleteQuery == "Delete a role") {


        db.query(`DELETE FROM role WHERE id = ?;`, [answers.deleteID], function(err, results) {

          if (err) {
            console.log('|--------------------Result----------------------|')
            console.error('An error occurred while deleting the role:', err);
            console.log('|------------------------------------------------|')
          return;

          } 

          console.log('|--------------------Result----------------------|')
          console.log(results)
          console.log('|------------------------------------------------|')
    
          initUserPrompts();
      


    })}}
}}})}

// Sum of utalized budget per department function
function totalUtalizedBudget () { // INCOMPLETE
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Please enter a department ID to view total utalized budget',
      name: 'departmenttotalbudget'
    },
  ])
  .then((answers) => {
    if (answers.departmenttotalbudget.length === 0) {

          console.log('|--------------------Result----------------------|')
          console.log('Please ensure you enter a valid department ID');
          console.log('|------------------------------------------------|')

    } else {
      
      let sql = 
      `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department
      FROM employee
      JOIN department ON employee.department_id = department.id
      WHERE department.id = ?`;
      
      let departmentID = answers.viewEmpByDepartmentID
      db.query(sql, departmentID, function (err, results) {
        if (err) {
              console.log('|--------------------Result----------------------|')
              console.error('An error occurred while updating the employee:', err);
              console.log('|------------------------------------------------|')
          return;
        }
          console.log('|--------------------Result----------------------|')
          console.log(results)
          console.log('|------------------------------------------------|')

        initUserPrompts();
      });
    }
  });
 
}

// '(SELECT SUM(salary) FROM role WHERE role.department_id = department_id AS Total_Utalized_Budget)'

// Init the application when node index.js is prompted.
initUserPrompts();