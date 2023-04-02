const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
const logger = require('./logger');
const db = require('./dbConfig');
const Employee = require('./employeeSchema');

const login = async (req,res) => {
    try{
        let params = req.body;
        let employeeEmail = params.email, employeePass = params.password;

        const employeeInRecord = await Employee.findOne({employee_email : employeeEmail});

        if(!employeeInRecord){
            logger.error({
                message : "Email not in DB"
            });
            return res.status(401).send({
                message : "Invalid email or password"
            });
        }
        else{
            logger.info("Email found in DB");
            const isEmployeePassMatch = await bcrypt.compare(employeePass,employeeInRecord.employee_password);

            if(!isEmployeePassMatch){
                logger.error({
                    message : "Wrong Password"
                });
                return res.status(401).send({
                    message : "Invalid email or password"
                });
            }
            const token = jwt.sign({ id: employeeInRecord._id }, 'secret-key');
            logger.info("Login Successful");
            return res.status(200).send({
                name : employeeInRecord.employee_name,
                email : employeeInRecord.employee_email,
                phone : employeeInRecord.employee_phone,
                code : employeeInRecord.employee_code,
                token : token
            });

        }
        
        res.send("hi");
    }catch(err){
        logger.error({
            message : "Unable to login, please try again!",
            err : err
        });

        return res.status(500).send({
            message : "failed to login"
        });
    }
};

module.exports = {login}