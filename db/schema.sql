DROP IF EXISTS employee_db;
CREATE TABLE emplyoee_db;

USE employee_db;

SELECT DATABASE();


Create table department (

id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT null

)

CREATE TABLE role (

id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL

)

CREATE TABLE employee (

id: INT AUTO_INCREMENT PRIMARY KEY,
first_name: VARCHAR(30) NOT NULL,
last_name: VARCHAR(30) NOT NULL,
role_id: INT NOT NULL,
manager_id: INT NOT NULL
FOREIGN KEY (manager_id)
REFERENCES employee(id)
ON DELETE SET NULL

)