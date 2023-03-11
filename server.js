const express = require('express');
const inquirer = require('inquirer');
// get the client
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// create the connection to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log(`connected to company_db database.`)
);





const menu = ()=>{
    console.log('Employee Tracker');

    inquirer.prompt({
        type: 'list',
        name: 'answer',
        message: 'Make a choice',
        choices: [
            "View ALL Departments",
            "View ALL Roles",
            "View ALL Employees",
            "ADD a Department",
            "ADD Role",
            "ADD Employee",
            "Update Employee Role"
        ]
    })
    .then(select =>{
        switch (select.answer){
            case "View ALL Departments":
                viewDepts();
                break;
             case "View ALL Roles":
                viewRoles();
                break;
             case "View ALL Employees":
                viewEmployees();
                break;
             case "ADD a Department":
                addDept();
                break;
             case "ADD Role":
                addRole();
                break;
             case "ADD Employee":
                addEmployee();
                break;
             case "Update Employee Role":
                updateEmployee()
                break;
        }
    });
};
menu();

function seekDept(){
    db.findAllDepartments()
    .then(([rows])=>{
        let departments = rows;
        console.log("departments");
        console.table(departments);
    })
    .then(()=>menu());
}

function seekRoles(){
    db.findAllRoles()
    .then(([rows])=>{
        let roles = rows;
        console.log("roles");
        console.table(roles);
    })
    .then(()=>menu());
}

function seekEmployees(){
    db.findAllEmployees()
    .then(([rows])=>{
        let employees = rows;
        console.log("employee");
        console.table(employees);
    })
    .then(()=>menu());
}

function addADept(){
    prompt([
        {
            name: "name",
            message:"Enter new department: "
        }
    ])
    .then(res => {
        let name= res;
        db.createDept(name)
        .then(()=>console.log("Added department to database"))
        .then(()=>menu())
    })
}

function addARole(){
    db.findAllDepartments()
    .then(([rows])=>{
        let departments = rows;
        const deptChoices = departments.map(({id, name})=>({
            name: name,
            value: id
        }));

        prompt([
            {
                name: "title",
                message: "Enter new role: "
            },
            {
                name: "salary",
                message: "Enter role salary: "
            },
            {
                type:"list",
                name: "department_id",
                message: "Role belongs to the which dept? ",
                choices: deptChoices
            }
        ])
        .then(role =>{
            db.createRole(role)
            .then(()=>console.log("Added role to database"))
            .then(()=> menu())
        })
    })
    .then(()=>menu());
}