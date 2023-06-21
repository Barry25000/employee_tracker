const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;

//connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_db",
  },
  console.log(`Connected to employee_db database.`)
);

function options() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
        ],
        name: "employeeTracker",
      },
    ])
    // Takes user choice, checks with equality, and then runs corresponding function
    .then((answer) => {
      console.log(answer);
      if (answer.employeeTracker === "View All Departments") {
        viewAllDepartments();
      } else if (answer.employeeTracker === "View All Roles") {
        viewAllRoles();
      } else if (answer.employeeTracker === "View All Employees") {
        viewAllEmployees();
      } else if (answer.employeeTracker === "Add Department") {
        addDepartment();
      } else if (answer.employeeTracker === "Add Role") {
        addRole();
      } else if (answer.employeeTracker === "Add Employee") {
        addEmployee();
      } else {
        updateEmployeeRole();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//perform db manipulation
var viewAllDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
  });
  options();
};
var viewAllRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.log(results);
  });
  options();
};

var viewAllEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.log(results);
  });
  options();
};

var addDepartment = () => {
  db.insert("SELECT * FROM department", function (err, results) {
    console.log(results);
  });
  options();
};

var addRole = () => {
  console.log("hello4");
  options();
};

var addEmployee = () => {
  console.log("hello5");
  options();
};

var updateEmployeeRole = () => {
  console.log("hello6");
  options();
};

options();
