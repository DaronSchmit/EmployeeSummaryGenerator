const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

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
  console.log(newGuy);
  //return again ? collectInputs(newInputs) : newInputs;

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
  console.log(inputs);
};

main();
