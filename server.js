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
    });
}

//perform db manipulation
var viewAllDepartments = () => {
  console.log("hello");
  options();
};
var viewAllRoles = () => {
  console.log("hello1");
  options();
};

var viewAllEmployees = () => {
  console.log("hello2");
  options();
};

var addDepartment = () => {
  console.log("hello3");
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
