const mongoose = require('mongoose');
const logger = require('./logger');
const bcrypt = require('bcrypt');
const db = require('./dbConfig');
const dotenv = require("dotenv").config();
const Employee = require('./employeeSchema');

const updateProfile = async (req,res) => {
    let {name,email,phone,pass} = req.body;
    const code = req.params.empcode;

    if(!code){
        logger.info("Employee code not found");

        return res.status(400).send({
            message: "Inavlid Employee Code"
        });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(pass, salt)

    try{

        const codeInDB = await Employee.findOne({employee_code : code});

        if(!codeInDB){
            logger.info("Profile Not in Database");

            return res.status(400).send({
                message: "Inavlid Details"
            });
        }

        const updateRes = await Employee.updateOne(
            {employee_code : code}, 
            {$set : {
                employee_name: name, 
                employee_email: email,
                employee_password: hashedPassword,
                employee_phone : phone
            }}
        );

        if(!updateRes){
            logger.info("Unable to update in Database");

            return res.status(400).send({
                message: "Update Failed"
            });
        }

        logger.info("Update Successful");

        res.status(200).send({
            message : "Profile Update",
            updatedProfile : {
                name : name,
                email : email,
                phone : phone,
                pass : hashedPassword
            }
        });

    }catch(err){
        logger.error({
            message : "Failed to update, try again",
            err : err
        });

        return res.status(500).send({
            message : "Failed to Update profile"
        });
    }
}

module.exports = {updateProfile}