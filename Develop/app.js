const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

/**
 * List prompt example
 */

const anyButtonToExit = () => {
  console.log('Press any key to exit');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
}

const managerPrompt = async () => {
  console.log("Manager Selected");
  inquirer
    .prompt([
    {
      type: 'input',
      name: 'name: ',
      message: 'What is their name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is their employee ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is their email?'
    },
    {
      type: 'input',
      name: 'officeNum',
      message: 'What is their office number?'
    },
    {
      type: 'list',
      name: 'role',
      message: 'What type of role is their first employee?',
      choices: [
        'Intern',
        'Engineer'
      ],
    }
      ])
    .then((answer) => {
    let manager = new Manager(answer.name, answer.id, answer.email, answer.officeNum);
    switch(answer.role){
      case 'Intern':
        return([manager].concat(internPrompt()));
      case 'Engineer':
        return([manager].concat(engineerPrompt()));
      }    })
}

const basicQ = [
    {
      type: 'input',
      name: 'name: ',
      message: 'What is their name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is their employee ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is their email?'
    },
  ];

const engineerQ = {
  type: 'input',
  name: 'github',
  message: 'What is their github?'
}

const internQ = {
  type: 'input',
  name: 'school',
  message: 'What school do they go to?'
}

const whichQ = {
      type: 'list',
      name: 'role',
      message: 'What type of role is the next employee?',
      choices: [
        'Intern',
        'Engineer',
        new inquirer.Separator(),
        'Done'
      ],
}

const engineerPrompt = () => {
  inquirer
  .prompt(basicQ.concat(engineerQ, whichQ))
  .then((answer) => {
    let newGuy = new Engineer(answer.name, answer.id, answer.email, answer.github);
    switch(answer.role){
      case 'Intern':
        return([newGuy].concat(internPrompt()));
      case 'Engineer':
        return([newGuy].concat(engineerPrompt()));
      case 'Done':
        return [newGuy];
      }
  })
}

const internPrompt = () => {
  inquirer
  .prompt(basicQ.concat(internQ, whichQ))
  .then((answer) => {
    let newGuy = new Engineer(answer.name, answer.id, answer.email, answer.school);
    switch(answer.role){
      case 'Intern':
        return([newGuy].concat(internPrompt()));
      case 'Engineer':
        return([newGuy].concat(engineerPrompt()));
      case 'Done':
        return [newGuy];
    }
  })
}


function writeFile(){
    fs.writeFileSync(outputPath, render(employees), "utf-8");
}

managerPrompt().then(writeFile());