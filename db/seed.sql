INSERT INTO department (id, names)
VALUES  (1, "Sales"),
        (2, "Engineering"),
        (3, "Finance"),
        (4, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (1, "Rep", 60000, 5),
        (2, "Executive", 100000, 1),
        (3, "Admin", 80000, 3),
        (4, "Manager", 90000, 97);

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES (13, "Jane", "Rodgers", 4, 10, NUll),
       (62, "Joe", "Linn", 3, 20, NULL),
       (84, "Kate", "Roe", 2, 30, 90),
       (39, "Ron", "Greene", 1, 40, 45);