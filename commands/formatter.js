import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { program } from "commander";

// Utility function to execute shell commands
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(`Error: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
};

// Format files using Prettier
const formatFiles = async (directory = ".") => {
  const formatCommand = `npx prettier --write ${directory}/**/*.{js,jsx,ts,tsx,json,css,html,md}`;

  try {
    console.log("Formatting files...");
    const output = await execCommand(formatCommand);
    console.log(output);
    console.log("Code formatted successfully!");
  } catch (error) {
    console.error(`Formatting failed: ${error}`);
  }
};

// Command-line interface for formatting
program
  .command("format")
  .description("Format your code using Prettier")
  .action(() => {
    formatFiles() // Format the current directory (or specify another directory if needed)
      .catch((error) => console.error(error));
  });

// Parse the command-line arguments
program.parse(process.argv);
