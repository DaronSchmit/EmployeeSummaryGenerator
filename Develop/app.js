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

const managerPrompt = () => {
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
      name: 'nextOne',
      message: 'What type of role is their first employee?',
      choices: [
        'Intern',
        'Engineer'
      ],
    }
      ])
    .then((answer) => {
    return [new Manager(answer.name, answer.id, answer.email, answer.officeNum), answer.nextOne];
  })
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
    return new Engineer(answer.name, answer.id, answer.email, answer.github);
  })
}

const internPrompt = () => {
  inquirer
  .prompt(basicQ.concat(internQ, whichQ))
  .then((answer) => {
    let newGuy = new Intern(answer.name, answer.id, answer.email, answer.school);
    switch(answer.role){
      case 'Intern':
        console.log("making new intern")
        return([newGuy].concat(internPrompt()));
      case 'Engineer':
        console.log("making new engineer")
      case 'Done':
        console.log('done, returning employee')
        console.log(newGuy);
        return [newGuy];
    }
  })
}

async function createTeam(){
  let promise = new Promise((res, rej) => {
    managerPrompt();
  });
  
  let result = await promise;
  let team = [];
  team.concat(result);
  console.log(result);
  
  let done = false;
  while(!done){
    next = promptWhich();
    switch(next){
      case 'Engineer':
        newGuy =
    }
    if(newGuy.role === "Done"){
      done = true;
    }
    
  }
}
createTeam();

function writeFile(){
  console.log("writing file");
    fs.writeFileSync(outputPath, render(employees), "utf-8");
}

async function firstAsync() {
    let promise = new Promise((res, rej) => {
        setTimeout(() => res("Now it's done!"), 1000)
    });

    // wait until the promise returns us a value
    let result = await promise;
  
    // "Now it's done!"
    console.log(result);
    }
//firstAsync();