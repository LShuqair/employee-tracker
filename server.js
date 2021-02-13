var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")


var connection = mysql.createConnection({

  host: "localhost",

  // Your port; if not 3306
  port: 3306,

 // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "password",
  database: "employee_tracker"
});


connection.connect((err) => {
  if (err) throw err;
  startPrompt();
});

// startPrompt code
function startPrompt() {
  inquirer.prompt([
  {
  type: "list",
  message: "What would you like to do?",
  name: "choice",
  choices: [
            "View All Employees?", 
            "View All Employee's By Roles?",
            "View all Emplyees By Deparments", 
            "Update Employee Role",
            "Add Employee?",
            "Add Role?",
            "Add Department?"
          ]
      }
  ]).then(function(val) {
      switch (val.choice) {
          case "View All Employees?":
            viewAllEmployees();
          break;
  
        case "View All Employee's By Roles?":
            viewAllRoles();
          break;
        case "View all Emplyees By Deparments":
            viewAllDepartments();
          break;
        
        case "Add Employee?":
              addEmployee();
            break;
    
        case "Add Role?":
              addRole();
            break;

         case "Update Employee Role":
              updateRole();
                break;
        
    
          case "Add Department?":
            addDept();
            break;
  
          }
  })
}

//View All Employees Function
function   viewAllEmployees() {
    connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", 
      function(err, result, fields) {
        if (err) throw err;
        console.table(result);
       
          startPrompt();
      }
    );
  };

function viewAllRoles() {
connection.query(
"SELECT role.id, role.title, role.salary, role.department_id, department.id, department.name FROM role LEFT JOIN department on role.department_id = department.id",
function(err, result, fields) {
   if (err) throw err;
   console.table(result);

     startPrompt();
 }
); };

function viewAllDepartments() {
connection.query("SELECT * FROM department", function(err, result, fields) {
    if (err) throw err;
    console.table(result);
   
      startPrompt();
  }
); };


var roleChoices = [];
var empChoices = [];
var deptChoices = [];

function lookuprole(){  
  
  connection.query("SELECT * FROM role", function (err, data) {
      if (err) throw err;
      for (i = 0; i < data.length; i++) {
          roleChoices.push(data[i].id + "-" + data[i].title)
      }
   })
  }

function lookupEmployee(){  
   connection.query("SELECT * FROM employee", function (err, data) {
       if (err) throw err;
       for (i = 0; i < data.length; i++) {
           empChoices.push(data[i].id + "-" + data[i].first_name+" "+ data[i].last_name)
       }
   }) 
  }

function lookupDepts(){
connection.query("SELECT * FROM department", function (err, data) {
  if (err) throw err;
  for (i = 0; i < data.length; i++) {
      deptChoices.push(data[i].id + "-" + data[i].name)
  }
})
}

function addEmployee() {

  lookuprole()
  lookupEmployee()

  inquirer.prompt([
  {
    name: "firstname",
    type: "input",
    message: "What is the employee's first name?"
  },

  {
      name: "lastname",
      type: "input",
      message: "What is the employee's last name?"
  },

  {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: roleChoices 
    },

    {
      name: "reportingTo",
      type: "list",
      message: "Who is the employee's manager?",
      choices: empChoices
    }
  
   ]).then(function(answer) {
    var getRoleId =answer.role.split("-")
    var getReportingToId=answer.reportingTo.split("-")
    var query = 
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
     VALUES ('${answer.firstname}','${answer.lastname}','${getRoleId[0]}','${getReportingToId[0]}')`;
    connection.query(query, function(err, res) {
      console.log(`new employee ${answer.firstname} ${answer.lastname} added!`)
    });
      startPrompt();
  });
};

function addRole() {

lookuprole()
lookupEmployee()
lookupDepts()

inquirer.prompt([
{
  name: "role",
  type: "input",
  message: "Enter the role you would like to add:"
},

{
    name: "dept",
    type: "list",
    message: "In what department would you like to add this role?",
    choices: deptChoices
},

{
  name: "salary",
  type: "number",
  message: "Enter the role's salary:"
},

 ]).then(function(answer) {
   console.log(`${answer.role}`)
  var getDeptId =answer.dept.split("-")
  var query = 
  `INSERT INTO role (title, salary, department_id)
   VALUES ('${answer.role}','${answer.salary}','${getDeptId[0]}')`;
  connection.query(query, function(err, res) {
    console.log(`<br>-----new role ${answer.role} added!------`)
  });
    startPrompt();
});
};

function addDept() {

lookuprole()
lookupEmployee()
lookupDepts()

inquirer.prompt([
{
  name: "dept",
  type: "input",
  message: "Enter the department you would like to add:"
}
]).then(function(answer) {
  var query = 
  `INSERT INTO department (name)
   VALUES ('${answer.dept}')`;
  connection.query(query, function(err, res) {
    console.log(`-------new department added: ${answer.dept}-------`)
  });
    startPrompt();
});
};


function updateRole() {
connection.query('SELECT * FROM employee', function (err, result) {
  if (err) throw (err);
  inquirer
    .prompt([
      {
        name: "employeeName",
        type: "list",

        message: "Which employee's role is changing?",
        choices: function () {
          var employeeArray = [];
          result.forEach(result => {
            employeeArray.push(
              result.last_name
            );
          })
          return employeeArray;
        }
      }
    ])
 
    .then(function (answer) {
      console.log(answer);
      const name = answer.employeeName;
    
      connection.query("SELECT * FROM role", function (err, res) {
        inquirer
          .prompt([
            {
              name: "role",
              type: "list",
              message: "What is their new role?",
              choices: function () {
                var roleArray = [];
                res.forEach(res => {
                  roleArray.push(
                    res.title)
                })
                return roleArray;
              }
            }
          ]).then(function (roleAnswer) {
            const role = roleAnswer.role;
            console.log(role);
            connection.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
              if (err) throw (err);
              let roleId = res[0].id;
 
              let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
              let values = [parseInt(roleId), name]
      
              connection.query(query, values,
                function (err, res, fields) {
                  console.log(`You have updated ${name}'s role to ${role}.`)
                })
                viewAllEmployees();
            })
          })
      })
     
    })
})
}