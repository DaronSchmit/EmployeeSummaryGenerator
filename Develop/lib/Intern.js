// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Intern{
  constructor(name, id, email, school){
    super(name, id, email);
    this.school = school;
  }
}

Intern.prototype.getRole = function(){
  return "Intern";
}

Inter.prototype.getSchool(){
  return this.school;
}