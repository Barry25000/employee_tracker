INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("HR"),
       ("Testing");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 01),
       ("Lead Engineer", 150000, 02),
       ("Software Engineer", 120000, 02),
       ("Account Manager", 160000, 03),
       ("Accountant", 125000, 03),
       ("Legal Team Lead", 250000, 04),
       ("Lawyer", 190000, 03);

       INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 1, null),
       ("Ashley", "Rodriguez", 2, null),
       ("Kevin", "Tupik", 2, 2),
       ("Ben", "Ten", 4, null),
       ("Bruce", "Jenner", 6, 4),
       ("Betty", "White", 5, 2),
       ("Larry", "Samon", 3, null);
        