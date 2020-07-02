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

-- Adding departments -- 
INSERT INTO department (department) VALUES ("IT");
INSERT INTO department (department) VALUES ("Finance");
INSERT INTO department (department) VALUES ("Human Resources");
INSERT INTO department (department) VALUES ("Digital");

-- Adding roles --
INSERT INTO role (title, salary, department_id) VALUES ("Jr. Developer",15000,1);
INSERT INTO role (title, salary, department_id) VALUES ("Sr. Developer",25000,1);
INSERT INTO role (title, salary, department_id) VALUES ("Development Lead",35000,1);
INSERT INTO role (title, salary, department_id) VALUES ("Development Manager",50000,1);
INSERT INTO role (title, salary, department_id) VALUES ("Finance Analyst",16000,2);
INSERT INTO role (title, salary, department_id) VALUES ("Finance Specialist",27000,2);
INSERT INTO role (title, salary, department_id) VALUES ("Finance Lead",40000,2);
INSERT INTO role (title, salary, department_id) VALUES ("Finance Manager",55000,2);
INSERT INTO role (title, salary, department_id) VALUES ("Jr. Recruiter",10000,3);
INSERT INTO role (title, salary, department_id) VALUES ("Sr. Recruiter",20000,3);
INSERT INTO role (title, salary, department_id) VALUES ("Recruiting Manager",30000,3);
INSERT INTO role (title, salary, department_id) VALUES ("Digital Analyst",17000,4);
INSERT INTO role (title, salary, department_id) VALUES ("Digital Specialist",30000,4);
INSERT INTO role (title, salary, department_id) VALUES ("Digital Lead",42000,4);
INSERT INTO role (title, salary, department_id) VALUES ("Digital Manager",57000,4);

-- Adding Managers --
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Rodrigo","Rosas",15);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Alejandra","Elizarraras",8);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Paola","Gomez",11);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Fernando","Granados",4);

-- Adding Leads --
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Daniel","Pastor",14, 1);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Ana","Cervantes",7, 2);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Miriam","Castillo",10, 3);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Enrique","Fernandez",3, 4);
-- Adding Specialists/Sr. --
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Juan","Cuevas",13,1);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Danna","Vargas",6, 2);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Sara","Olmos",9, 3);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Alan","Woloski",2, 4);

-- Adding Analysts/Jr. --
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Daniel","Vences",12,1);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Paola","Orozco",5, 2);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Berenice","Cano",9, 3);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Elmer","Payro",1, 4);

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

