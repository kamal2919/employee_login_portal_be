const mongoose = require('mongoose');
const logger = require('./logger');
const bcrypt = require('bcrypt');
const db = require('./dbConfig');
const dotenv = require("dotenv").config();
const Employee = require('./employeeSchema');

const deleteProfile = async (req,res) => {
    const code = req.params.empcode;

    if(!code){
        logger.info("Employee code not found");

        return res.status(400).send({
            message: "Inavlid Employee Code"
        });
    }


    try{

        const codeInDB = await Employee.findOne({employee_code : code});

        if(!codeInDB){
            logger.info("Profile Not in Database");

            return res.status(400).send({
                message: "Inavlid Details"
            });
        }

        const deleteRes = await Employee.deleteOne({employee_code : code});

        if(!deleteRes){
            logger.info("Unable to delete profile from Database");

            return res.status(400).send({
                message: "Delete Failed"
            });
        }

        logger.info("Profile Deleted successfully");

        res.status(200).send({
            message : "Profile Deleted",
        });

    }catch(err){
        logger.error({
            message : "Failed to delete, try again",
            err : err
        });

        return res.status(500).send({
            message : "Failed to delete profile"
        });
    }
}

module.exports = {deleteProfile}