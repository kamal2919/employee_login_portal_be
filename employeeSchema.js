const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employee_name : String,
    employee_code : String,
    employee_email : String,
    employee_phone : String,
    employee_password : String
});

module.exports = mongoose.model('employee_details',employeeSchema);