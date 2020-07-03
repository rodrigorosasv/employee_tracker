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
