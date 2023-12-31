const inquirer = require("inquirer");
const mysql = require("mysql2");

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
    console.log("/n");
    console.table(results);
  });
  options();
};
var viewAllRoles = () => {
  const sql = `SELECT role.id, title, salary, department.name FROM role
  inner join department on department.id=role.department_id
  `;

  db.query(sql, function (err, results) {
    console.log("/n");
    console.table(results);
    console.log(err);
  });
  options();
};

var viewAllEmployees = () => {
  const sql = `SELECT employee.id AS employee_id, employee.first_name AS first_name, employee.last_name AS last_name, role.title, department.name, role.salary, manager.first_name AS manager_name FROM employee
    left outer join role on role.id=employee.role_id
    left outer join department on department.id=role.department_id
    left outer join employee manager on manager.id=employee.manager_id
    `;

  db.query(sql, function (err, results) {
    console.log("/n");
    console.table(results);
    console.log(err);
  });
  options();
};

var addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department?",
        name: "department",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.department],
        function (error, results, fields) {
          if (error) console.log(error);
          console.log("/n");
          console.table(results.insertId);
          options();
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

var addRole = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
    const departmentName = results.map((department) => department.name);

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new role",
          name: "role",
        },
        {
          type: "number",
          message: "What is the salary of this role?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department will this role belong to?",
          choices: departmentName,
          name: "department",
        },
      ])
      .then((answer) => {
        console.log(answer);
        const departmentId = results.find(
          (b) => b.name === answer.department
        ).id;
        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
          [answer.role, answer.salary, departmentId],
          function (error, results, fields) {
            if (error) console.log(error);
            console.log("/n");
            console.table(results.insertId);
            options();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
///////////////////////////////////////////////////////////////////////////////////
var addEmployee = () => {
  db.query("SELECT * FROM role", function (err, results) {
    const roleName = results.map((role) => {
      return {
        name: `${role.title}`,
        value: `${role.id}`,
      };
    });

    db.query("SELECT * FROM employee", function (err, results) {
      const employeeNameArr = results.map((employee) => {
        return {
          name: `${employee.first_name}`,
          value: `${employee.id}`,
        };
      });
      console.log("hey", roleName, employeeNameArr);

      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the first name of the new employee?",
            name: "firstName",
          },
          {
            type: "input",
            message: "What is the last name of the new employee?",
            name: "lastName",
          },
          {
            type: "list",
            message: "What is the roll of the new employee?",
            choices: roleName,
            name: "role",
          },
          {
            type: "list",
            message: "Who is the manager of the new employee?",
            choices: employeeNameArr,
            name: "manager",
          },
        ])
        .then((answer) => {
          // const managerId = results.find(
          //   (b) => b.first_name === answer.manager
          // ).id;

          db.query(
            // "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
            "INSERT INTO employee (first_name, last_name) VALUES (?,?)",
            // [answer.firstName, answer.lastName, answer.role, managerId],
            [answer.firstName, answer.lastName],
            function (error, results, fields) {
              if (error) console.log(error);
              // console.log(results.insertId);

              // db.query(
              //   "INSERT INTO employee SET first_name=? WHERE id=?",
              //   [roleId, employeeId],
              //   function (error, results, fields) {
              //     if (error) console.log(error);
              console.log("/n");
              console.table(results);
              options();
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
      options();
    });
  });
};
/////////////////////////////////////////////

var updateEmployeeRole = () => {
  db.query("SELECT * FROM role", function (err, results) {
    const roleName = results.map((role) => {
      return {
        name: `${role.title}`,
        value: `${role.id}`,
      };
    });

    db.query("SELECT * FROM employee", function (err, results) {
      const employeeNameArr = results.map((employee) => {
        return {
          name: `${employee.first_name}`,
          value: `${employee.id}`,
        };
      });

      inquirer
        .prompt([
          {
            type: "list",
            message: "What is the name of the employee?",
            choices: employeeNameArr,
            name: "emp_id",
          },
          {
            type: "list",
            message: "What is the new roll of the employee?",
            choices: roleName,
            name: "role_id",
          },
        ])
        .then((answer) => {
          const employeeId = answer.emp_id;
          const roleId = answer.role_id;

          db.query(
            "UPDATE employee SET role_id=? WHERE id=?",
            [roleId, employeeId],
            function (error, results, fields) {
              if (error) console.log(error);
              console.log("/n");
              console.table(results);
              options();
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

options();
