const mongoose = require('mongoose');
const logger = require('./logger');
const bcrypt = require('bcrypt');
const db = require('./dbConfig');
const dotenv = require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const Employee = require('./employeeSchema');


const register = async (req,res) => {
    try{
        let params = req.body;
        let employeeName = params.name, employeeEmail = params.email, employeePhone = params.phone, employeePass = params.pass, employeeCode = uuidv4();
        
        // check if employee is already in db or not

        const employeeAlready = await Employee.findOne({employee_email : employeeEmail});

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(employeePass, salt);

        if(!employeeAlready){
            try{
                const employee = new Employee({
                    employee_name : employeeName,
                    employee_code : employeeCode,
                    employee_email : employeeEmail,
                    employee_phone : employeePhone,
                    employee_password : hashedPassword
                });
                let employeCreateRecord =  await employee.save();
                
                return res.status(200).send({
                    message : "Profile Created Successfully",
                    profile : employee
                })
            }catch(err){
                logger.error({
                    message : "Unable to regiser, try again!",
                    err : err
                });

                return res.status(500).send({
                    message : "failed to reister"
                });
            }
        }
        else{
            return res.status(400).send({
                message : "Profile already present",
                profile : employeeAlready
            })
        }
        
    }catch(error){
        logger.error({
            message : "Unable to regiser, please try again!",
            err : error
        });

        return res.status(500).send({
            message : "failed to register"
        });
    }
}



module.exports = {register};