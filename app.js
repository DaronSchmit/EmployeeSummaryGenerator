const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");


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


const basicQ = [
  {
    type: "input",
    name: "name",
    message: "What is their name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is their employee ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is their email?",
  },
];
const internQ = [
  {
    type: "input",
    name: "school",
    message: "What school do they go to?",
  },
];

const engineerQ = [
  {
    type: "input",
    name: "github",
    message: "What is their github?",
  },
];

const managerQ = [
  {
    type: "input",
    name: "officeNum",
    message: "What is their office number?",
  },
];

const whichQ = [
  {
    type: "list",
    name: "again",
    message: "What type of role is the next employee?",
    choices: ["Intern", "Engineer", new inquirer.Separator(), "Done"],
  },
];

const collectInputs = async (inputs = [], prompts) => {
  const { again, ...answers } = await inquirer.prompt(prompts);
  let newGuy;
  if(prompts.includes(managerQ[0])){
    newGuy = new Manager(answers.name, answers.id, answers.email, answers.officeNum);
  }
  else if (prompts.includes(engineerQ[0])){
    newGuy = new Engineer(answers.name, answers.id, answers.email, answers.github);
  }
  else if (prompts.includes(internQ[0])){
    newGuy = new Intern(answers.name, answers.id, answers.email, answers.school);
  }
  const newInputs = [...inputs, newGuy];

  switch (again) {
    case "Intern":
      prompts = basicQ.concat(internQ, whichQ);
      return collectInputs(newInputs, prompts);
      break;
    case "Engineer":
      prompts = basicQ.concat(engineerQ, whichQ);
      return collectInputs(newInputs, prompts);
      break;
    default:
      return newInputs;
  }
};

const main = async () => {
  const inputs = await collectInputs([], basicQ.concat(managerQ, whichQ));
  return inputs;
};

main().then(async (employees) => {
  let html = render(employees);
  await fs.writeFile(outputPath, html, function (error) {
      if (error) {
          console.log(error);
      }
  })
});