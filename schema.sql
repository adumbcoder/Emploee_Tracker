-- drops the database if its already made
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    department_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY(department_id)
);

CREATE TABLE role (
    role_id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL (10, 2),
    department_id INT,
    PRIMARY KEY(role_id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);