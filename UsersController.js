const express = require('express');
const path = require('path');
const fs = require('fs');


const usersPath = path.join(__dirname, './users.json');
const users = JSON.parse(fs.readFileSync(usersPath));

controller = {
    saveUser: async function (req, res){
        const data = req.body;
        let user = {
            name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            cuit: data.cuit,
            phone: data.phone,
            rubro: data.rubro,
            company: data.company,
        }
        users.push(user);
        console.log(users);
        
        fs.writeFileSync(usersPath, JSON.stringify(users));
        res.send(user);
    },
    getUsers: async function (req, res){
        res.send(users);
    }
}

module.exports = controller