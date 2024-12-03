import fs from "fs";
import path from "path";
import { program } from "commander";
import inquirer from "inquirer";
import { exec } from "child_process";

// Utility function to create a new file with boilerplate code
const createFile = (filePath, template) => {
  fs.writeFileSync(filePath, template, "utf8");
  console.log(`File created: ${filePath}`);
};

// Ensure directories exist, and if not, create them
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

// React Component Template
const generateReactComponent = (name) => {
  const componentTemplate = `import React from 'react';
import './${name}.css';

const ${name} = () => {
  return (
    <div className="${name.toLowerCase()}">
      <h1>${name} Component</h1>
    </div>
  );
};

export default ${name};
  `;
  const componentPath = path.join(
    process.cwd(),
    "src",
    "components",
    `${name}.js`,
  );
  ensureDirectoryExistence(componentPath);
  createFile(componentPath, componentTemplate);

  // Create a basic CSS file for the component
  const cssTemplate = `.${name.toLowerCase()} {
  /* Add your styles here */
}
  `;
  const cssPath = path.join(process.cwd(), "src", "components", `${name}.css`);
  ensureDirectoryExistence(cssPath);
  createFile(cssPath, cssTemplate);
};

// Next.js Component Template
const generateNextJsComponent = (name) => {
  const componentTemplate = `import React from 'react';

const ${name} = () => {
  return (
    <div>
      <h1>${name} Next.js Component</h1>
    </div>
  );
};

export default ${name};
  `;
  const componentPath = path.join(process.cwd(), "src", "pages", `${name}.js`);
  ensureDirectoryExistence(componentPath);
  createFile(componentPath, componentTemplate);
};

// Angular Component Template
const generateAngularComponent = (name) => {
  const componentTemplate = `import { Component } from '@angular/core';

@Component({
  selector: 'app-${name.toLowerCase()}',
  template: '<h1>${name} Angular Component</h1>',
  styles: ['h1 { color: blue; }']
})
export class ${name}Component {
  constructor() { }
}
  `;
  const componentPath = path.join(
    process.cwd(),
    "src",
    "app",
    `${name.toLowerCase()}.component.ts`,
  );
  ensureDirectoryExistence(componentPath);
  createFile(componentPath, componentTemplate);
};

// Install packages based on user selection
const installPackages = (framework) => {
  let installCommand;

  switch (framework) {
    case "React":
      installCommand = "npm install react react-dom";
      break;
    case "Next.js":
      installCommand = "npm install next react react-dom";
      break;
    case "Angular":
      installCommand = "npm install @angular/core @angular/cli";
      break;
    default:
      console.error("Unknown framework selected.");
      return;
  }

  console.log(`Installing ${framework} dependencies...`);
  exec(installCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error installing packages: ${err}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

// Prompt user to select the template and install the necessary dependencies
const promptUserAndGenerate = (name) => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "framework",
        message: "Which framework would you like to use?",
        choices: ["React", "Next.js", "Angular"],
      },
    ])
    .then((answers) => {
      const { framework } = answers;

      // Install the required packages based on the framework selection
      installPackages(framework);

      // Generate the selected framework component
      switch (framework) {
        case "React":
          generateReactComponent(name);
          break;
        case "Next.js":
          generateNextJsComponent(name);
          break;
        case "Angular":
          generateAngularComponent(name);
          break;
      }
    });
};

// Command-Line Interface for Code Generation
program
  .command("generate <type> <name>")
  .description(
    "Generate boilerplate code for different types (e.g., component, route, model)",
  )
  .action((type, name) => {
    if (type === "component") {
      promptUserAndGenerate(name);
    } else {
      console.error("Unknown generation type. Use 'component' only.");
    }
  });

program.parse(process.argv);
