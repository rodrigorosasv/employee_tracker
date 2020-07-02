const inquirer = require("inquirer");
const path = require("path");
var mysql = require("mysql");
const { restoreDefaultPrompts } = require("inquirer");

var PORT = process.env.PORT || 8080;
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "thePassword20!",
  database: "employee_tracker"
});

// Initiate MySQL Connection.

function mysqlConnection(){
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    //console.log("connected as id " + connection.threadId);
  });
}
mysqlConnection();

//initializers
function allEmployees(){
    connection.query(`SELECT 
    CONCAT(employee.first_name, ' ',employee.last_name) AS 'Employee_Name'
    FROM employee;`
    , function(err, result) {
        if (err) throw err;
        for(var i=0; i<result.length; i++){
            employeesList.push(result[i].Employee_Name);
        }
        console.log(" ");
        return employeesList
        console.log(employeesList);
        mainMenu();
    });
}

mainMenu();

function mainMenu(){
    console.log("Welcome to the employee tracker ")
    inquirer
    .prompt([
        {
            type: "rawlist",
            name: "option",
            message: "Please select an option from the list below: ",
            choices:[
                "View all employees",               //Done
                "Add employee",                     //Done
                "Remove employee",                  //Done
                "View all roles",                   //Done
                "Add role",                         //Done
                "View all departments",             //Done
                "Add department",                   //Done
                "View all employees by department", //Done
                "View all employees by manager",    //Done
                "Update employee role",             //Done
                "Update employee Manager",          //Done
                "Exit"
            ]   
        }
    ]).then(function(response){
        switch (response.option) {
            case "View all employees":
                viewAllEmployees()
            break;
            case "Add employee":
                addEmployee();
            break; 
            case "Remove employee":
                removeEmployee();
            break; 
            case "View all roles":
                viewAllRoles();
            break;
            case "Add role":
                addRole();
            break;
            case "View all departments":
                viewAllDepartments();
            break;
            case "Add department":
                addDepartment();
            break;
            case "View all employees by department":
                employeeByDepartment();
                break; 
            case "View all employees by manager":
                employeeByManager();
                break; 
            case "Update employee role":
                updateEmployeeRole();
            break;
            case "Update employee Manager":
                updateEmployeeManager();
            break;
            case "Exit":
                console.log("Goodbye");
                exit();
            break;     
            default:
                break;
        }
    })
}
function exit(){
    process.exit;
}
function viewAllEmployees(){
    connection.query(`SELECT 
    employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, employee.manager_id
    FROM department 
    INNER JOIN role ON role.department_id=department.id
    INNER JOIN employee ON employee.role_id=role.id
    ORDER BY employee.id;`
    , function(err, result) {
        if (err) throw err;
        console.log(" ");
        console.table(result);
        mainMenu();
    });
}

function viewAllDepartments(){
    connection.query(`SELECT * from department`, function(err, result) {
        if (err) throw err;
        console.log(" ");
        console.table(result);
        mainMenu();
    });
}

function viewAllRoles(){
    connection.query("SELECT * FROM role", function(err, result) {
        if (err) throw err;
        console.log(" ");
        console.table(result);
        mainMenu();
    });
}

function employeeByDepartment(){
    var sendDepartments=[];
    var selectedDepartment="";
    var query = "SELECT department FROM department";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            sendDepartments.push(res[i].department);
        }
        inquirer
        .prompt([
            {
                type: "rawlist",
                name: "department",
                message: "Select a department: ",
                choices: sendDepartments
            }
        ]).then(function(response){
                selectedDepartment=response.department;
                console.log(selectedDepartment);
                connection.query(`SELECT 
                employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, employee.manager_id
                FROM department 
                INNER JOIN role ON role.department_id=department.id
                INNER JOIN employee ON employee.role_id=role.id
                WHERE department.department=?
                ORDER BY employee.id;`
                , [selectedDepartment], function(err, result) {
                    if (err) throw err;
                    console.log(" ");
                    console.table(result);
                    mainMenu();
                });   
        })
    });
}

function employeeByManager(){
    var sendManagers=[];
    var selectedManager="";
    var query = "SELECT first_name, last_name FROM employee;";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            sendManagers.push(`${res[i].first_name} ${res[i].last_name}`);
        }
        inquirer
        .prompt([
            {
                type: "rawlist",
                name: "manager",
                message: "Select a manager: ",
                choices: sendManagers
            }
        ]).then(function(response){
                selectedManager=response.manager;
                //console.log(selectedManager);
                connection.query(`SELECT employee.id FROM employee
                    WHERE CONCAT(employee.first_name, ' ',employee.last_name)=?;`
                    , [selectedManager], function(err, result) {
                        if (err) throw err;
                        var managerID=result[0].id;
                        //console.log(managerID);
                        connection.query(`SELECT 
                        employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, employee.manager_id
                        FROM department 
                        INNER JOIN role ON role.department_id=department.id
                        INNER JOIN employee ON employee.role_id=role.id
                        WHERE employee.manager_id=?
                        ORDER BY employee.id;`
                        , [managerID], function(err, result) {
                        if (err) throw err;
                        console.log(" ");
                        console.table(result);
                        mainMenu();
                    });   
                });   
        })
    });
}


// function getEmployees(data, callback){
//     var query="SELECT CONCAT(employee.first_name, ' ',employee.last_name) AS 'Employee_Name' FROM employee;";
//     connection.query(query, function(err, results){
//         var employeesArray=[];
//         if(err) throw err;
//         for(var i=0; i<results.length; i++){
//             employeesArray.push(results[i].Employee_Name);
//         }
//         console.log(employeesArray);
//         return callback(employeesArray);
//     })
// };

// var employeesNameList='';

// getEmployees(parm, function(result){
//     employeesNameList=result;

//     console.log(employeesNameList);
// });

function addEmployee(){
    var employeeArray=[];
    connection.query(`
    SELECT 
    CONCAT(employee.first_name, ' ',employee.last_name) AS 'Employee_Name'
    FROM employee;`
    , function(err, result) {
        if (err) throw err;

        for(var i=0; i<result.length; i++){
            employeeArray.push(result[i].Employee_Name);
        }
        employeeArray.push("None");
        console.log(" ");
        //console.log(employeeArray);
        connection.query("SELECT title FROM role", function(err, results){
            var roleArray=[];
            if(err) throw err;
            for(var i=0; i<results.length; i++){
                roleArray.push(results[i].title);
            }
            //console.log(roleArray);
            inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Writte employee's name: "
            },
            {
                type: "input",
                name: "lastName",
                message: "Writte employee's last name: "
            },
            {
                type: "rawlist",
                name: "role",
                message: "Select employee's role: ",
                choices:roleArray
            },
            {
                type: "rawlist",
                name: "manager",
                message: "Select employee's manager: ",
                choices: employeeArray
            }
        ]).then(function(response){
                    connection.query(`SELECT employee.id FROM employee
                    WHERE CONCAT(employee.first_name, ' ',employee.last_name)=?;`
                    , [response.manager], function(err, result) {
                        if (err) throw err;
                        var managerID=result[0].id;
                        //console.log(managerID);
                        connection.query(`SELECT role.id FROM role
                        WHERE role.title=?;`
                        , [response.role], function(err, result) {
                        if (err) throw err;
                        var roleID=result[0].id;

                        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);",[response.name, response.lastName, roleID, managerID] ,function(err, result){
                            if(err) throw err;
                            console.log(`Employee: ${response.name} ${response.lastName} was added.`);
                            mainMenu();
                        })
                    });   
                });      
            })
        })
    });
}

function removeEmployee(){
    var employeeArray=[];
    connection.query(`
    SELECT 
    CONCAT(employee.first_name, ' ',employee.last_name) AS 'Employee_Name'
    FROM employee;`
    , function(err, result) {
        if (err) throw err;

        for(var i=0; i<result.length; i++){
            employeeArray.push(result[i].Employee_Name);
        }
        console.log(" ");
        inquirer
        .prompt([
        {
            type: "rawlist",
            name: "employee",
            message: "Select the employee to remove: ",
            choices:employeeArray
        }
        ]).then(function(response){
            connection.query(`SELECT employee.id FROM employee
            WHERE CONCAT(employee.first_name, ' ',employee.last_name)=?;`
            , [response.employee], function(err, result) {
                if (err) throw err;
                var employeeID=result[0].id;
                //console.log(managerID);
                connection.query(`DELETE FROM employee WHERE employee.id=?;`
                    , [employeeID], function(err, result) {
                    if (err) throw err;
                    console.log(" ");
                    console.log(`Employee: ${response.employee} was removed.`);
                    mainMenu();
                });   
            });   
        })
    });
}

function addDepartment(){
    inquirer.prompt(
        [
            {
                type: "input",
                name: "departmentName",
                message: "Writte the department name: "
            }
        ]).then(function(response){
            connection.query("INSERT INTO department (department) VALUES (?);",[response.departmentName], function(err, result) {
                if (err) throw err;
                console.log(`${response.departmentName} was added succesfully`);
                mainMenu();
        })
    });
}

function addRole(){
    var departmentList=[];
    var query = "SELECT department FROM department";
    connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
        departmentList.push(res[i].department);
    }
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "title",
                    message: "Writte the role title: "
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Writte the role salary: "
                },
                {
                    type: "rawlist",
                    name: "department",
                    message: "Select a department: ",
                    choices: departmentList
                }
            ]).then(function(response){
                connection.query("SELECT department.id FROM department WHERE department.department=?;",[response.department], function(err, result) {
                    if (err) throw err;
                    var departmentID=result[0].id;
                    console.table(departmentID);
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?);",[response.title, response.salary, departmentID], function(err, result) {
                        if (err) throw err;
                        console.log(`${response.title} was added succesfully`);
                        mainMenu();
                    })
                })
            });
    })
}

function updateEmployeeRole(){
    var employeeArray=[];
    connection.query(`
    SELECT 
    CONCAT(employee.first_name, ' ',employee.last_name) AS 'Employee_Name'
    FROM employee;`
    , function(err, result) {
        if (err) throw err;

        for(var i=0; i<result.length; i++){
            employeeArray.push(result[i].Employee_Name);
        }
        console.log(" ");
        //console.log(employeeArray);
        connection.query("SELECT title FROM role", function(err, results){
            var roleArray=[];
            if(err) throw err;
            for(var i=0; i<results.length; i++){
                roleArray.push(results[i].title);
            }
            //console.log(roleArray);
            inquirer
        .prompt([
            {
                type: "rawlist",
                name: "employee",
                message: "Select employee to modify: ",
                choices:employeeArray
            },
            {
                type: "rawlist",
                name: "role",
                message: "Select new role: ",
                choices:roleArray
            }
        ]).then(function(response){
                    connection.query(`SELECT employee.id FROM employee
                    WHERE CONCAT(employee.first_name, ' ',employee.last_name)=?;`
                    , [response.employee], function(err, result) {
                        if (err) throw err;
                        var employeeID=result[0].id;
                        //console.log(managerID);
                        connection.query(`SELECT role.id FROM role
                        WHERE role.title=?;`
                        , [response.role], function(err, result) {
                        if (err) throw err;
                        var roleID=result[0].id;

                        connection.query("UPDATE employee set role_id=? where id=?;",[roleID, employeeID] ,function(err, result){
                            if(err) throw err;
                            console.log(`Employee ${response.employee} role was modified to ${response.role}.`);
                            mainMenu();
                        });
                    });   
                });      
            });
        });
    });
}

function updateEmployeeManager(){
    var employeeArray=[];
    connection.query(`
    SELECT 
    CONCAT(employee.first_name, ' ',employee.last_name) AS 'Employee_Name'
    FROM employee;`
    , function(err, result) {
        if (err) throw err;

        for(var i=0; i<result.length; i++){
            employeeArray.push(result[i].Employee_Name);
        }
        console.log(" ");
        //console.log(employeeArray);
        inquirer
        .prompt([
            {
                type: "rawlist",
                name: "employee",
                message: "Select employee to modify: ",
                choices:employeeArray
            },
            {
                type: "rawlist",
                name: "manager",
                message: "Select employee's new manager: ",
                choices: employeeArray
            }
        ]).then(function(response){
                    connection.query(`SELECT employee.id FROM employee
                    WHERE CONCAT(employee.first_name, ' ',employee.last_name)=?;`
                    , [response.employee], function(err, result) {
                        if (err) throw err;
                        var employeeID=result[0].id;
                        //console.log(managerID);
                        connection.query(`SELECT employee.id FROM employee
                        WHERE CONCAT(employee.first_name, ' ',employee.last_name)=?;`
                        , [response.manager], function(err, result) {
                        if (err) throw err;
                        var managerID=result[0].id;

                        connection.query("UPDATE employee set manager_id=? where id=?;",[managerID, employeeID] ,function(err, result){
                            if(err) throw err;
                            console.log(`Employee ${response.employee} manager was modified to ${response.manager}.`);
                            mainMenu();
                        });
                    });   
                });      
            });
    });
}


