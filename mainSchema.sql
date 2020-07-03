DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
use employee_tracker;
create table department (
	id int auto_increment primary key,
    department varchar(30) not null
);
create table role (
	id int auto_increment primary key,
    title varchar(30) not null,
    salary decimal(10,4) not null,
    department_id int not null,
    foreign key(department_id) references department(id)
);
create table employee (
 id INT auto_increment primary key,
 first_name varchar(30) not null,
 last_name varchar(30) not null,
 role_id int not null, 
 manager_id int,
 foreign key(role_id) references role(id),
 foreign key(manager_id) references employee(id)
);

/*
DELETE FROM department WHERE ID=6;
SELECT * FROM employee where manager_id IS NULL;
SELECT * FROM employee where manager_id IS NOT NULL;
SELECT * FROM role;
SELECT * FROM department;
UPDATE employee set role_id=9 where id=15;

SELECT 
employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, employee.manager_id
FROM department 
INNER JOIN role ON role.department_id=department.id
INNER JOIN employee ON employee.role_id=role.id
WHERE department.department="Digital"
ORDER BY employee.id;

SELECT 
employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, employee.manager_id
FROM department 
INNER JOIN role ON role.department_id=department.id
INNER JOIN employee ON employee.role_id=role.id
WHERE employee.first_name="Rodrigo" and employee.last_name="Rosas"
ORDER BY employee.id;


SELECT * FROM employee
INNER JOIN employee ON employee.manager_id=employee.id;

SELECT 
child.first_name,
child.last_name,
CONCAT(parent.first_name, ' ',parent.last_name) AS 'Manager'
FROM employee as child
JOIN employee as parent
ON parent.id = child.manager_id;


SELECT employee.id FROM employee
WHERE CONCAT(employee.first_name, ' ',employee.last_name)="Rodrigo Rosas";


SELECT 
CONCAT(employee.first_name, ' ',employee.last_name) AS 'Employee Name'
FROM employee;

SELECT department.id FROM department WHERE department.department="Legal";
SELECT * FROM department;*/

