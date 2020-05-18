const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");
let teamArray = [];
let primeEmp = true;
let dayOne = true;

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function newEmp() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "Role within the company?",
            choices: [
                'Manager',
                'Engineer',
                'Intern'
            ]
        }
    ]).then(function (response) {
        if (response.role === 'Manager') {
            return newMgr();
        }
        else if (response.role === 'Engineer') {
            return newEng();
        }
        else if (response.role === 'Intern') {
            return newIntern();
        }
    })
}
function newMgr() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Manager Full Name: '
        },
        {
            type: 'input',
            name: 'id',
            message: 'Manager ID: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Manager Email: '
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Manager Office Number: '
        }
    ]).then(function (response) {
        noob = new Manager(response.name, response.id, response.email, response.officeNumber);
        teamArray.push(noob);
    });
}
function newEng() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Engineer Full Name: '
        },
        {
            type: 'input',
            name: 'id',
            message: 'Engineer ID: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Engineer Email: '
        },
        {
            type: 'input',
            name: 'github',
            message: 'Engineer Github: '
        }
    ]).then(function (response) {
        noob = new Engineer(response.name, response.id, response.email, response.github);
        teamArray.push(noob);
    });
}
function newIntern() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Intern Full Name: '
        },
        {
            type: 'input',
            name: 'id',
            message: 'Intern ID: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Intern Email: '
        },
        {
            type: 'input',
            name: 'school',
            message: 'Intern School Location: '
        }
    ]).then(function (response) {
        noob = new Intern(response.name, response.id, response.email, response.school);
        teamArray.push(noob);
    });
}
// function addMember() {
//     return inquirer.prompt(
//         {
//             type: 'list',
//             name: 'repeat',
//             message: 'Add a team member? ',
//             choices: [
//                 'YES',
//                 'NO'
//             ]
//         }
//     ).then(function(response) {
//             if (response.repeat === 'YES') {
//                 newEmp();
//             }
//             else {
//                 console.log('Team Complete: ' + teamArray);
//             }
//         }
//     )
// }
// addMember();
async function mainFunction() {
    // Conditions to create team
    while (dayOne == true) {
        if (primeEmp == true) {
            // Creates first manager
            await newMgr();
            primeEmp = false;
        }
        else {
            await inquirer.prompt([
                {
                    type: "list",
                    message: "Would you like to add another team member?",
                    name: "newMember",
                    choices: [
                        "yes",
                        "no"
                    ]
                }
            ]).then(async function (res) {
                if (res.newMember == "yes") {
                    await newEmp();
                }
                else {
                    dayOne = false;
                    
                }
            })
        }
    }
    const html = render(teamArray);

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
  
    fs.writeFile(outputPath, html, (err) => {
      if (err) throw err;
      console.log("SUCCESS!");
    });
}
mainFunction();




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
