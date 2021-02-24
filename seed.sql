USE employee_db;

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Rick', 'Sanchez', null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Morty', 'Smith', 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Beth', 'Smith', 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Jerry', 'Smith', 1, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Summer', 'Smith', 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Bird', 'Person', null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Abrodolph', 'Lincoler', null, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Squanch', 'unknown', null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Crocu', 'bot', null, 9);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Unity', 'N/A', null, 8);


INSERT INTO department (name)
VALUES ('Multi-Dimensional Traveler');
INSERT INTO department (name)
VALUES ('Jerry');
INSERT INTO department (name)
VALUES ('Vindicators');
INSERT INTO department (name)
VALUES ('Exes');
INSERT INTO department (name)
VALUES ('Family');
INSERT INTO department (name)
VALUES ('Friends');


INSERT INTO role (title, salary, department_id)
VALUES ('Scientist', null, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Horse Surgeon', 55000 , 5);
INSERT INTO role (title, salary, department_id)
VALUES ('Parasite', 0, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('GrandKids', 0, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('Bird Person', null, 6);
INSERT INTO role (title, salary, department_id)
VALUES ('Squancher', null, 6);
INSERT INTO role (title, salary, department_id)
VALUES ('Morally Neutral Super Leader', null, 6);
INSERT INTO role (title, salary, department_id)
VALUES ('Hivemind', null, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Cold and Unfeeling Machine', null, 3);

