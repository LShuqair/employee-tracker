USE employee_tracker;


insert into department(name)
values ('Management'),
       ('Engineering'),
       ('Sales'),
       ('Operations'),
       ('Human Resources');

insert into role(title, salary, department_id) values('Manager', 221032, 1);
insert into role(title, salary, department_id) values('Engineer', 32032, 2);
insert into role(title, salary, department_id) values('Sales', 2032, 3);
insert into role(title, salary, department_id) values('SOC', 1032, 4);
insert into role(title, salary, department_id) values('Administration', 2212, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Ryan", "Salamone", 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Mickey", "Mouse", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Lou", "Sal", 4, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Elvis", "Presely", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jerry", "Garcia", 5, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Bobby", "Weir", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Phil", "LEsh", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Bill", "The Drummer", 1, 1 );
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Mickey", "Hart", 1, 1);


