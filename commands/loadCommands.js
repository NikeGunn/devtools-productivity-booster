import { Command } from "commander";
import { execCommand } from "../utils/exec.js";
import axios from "axios";
import chalk from "chalk"; // Import chalk for color formatting

// Load API command
export const loadCommands = (program) => {
  program
    .command("api")
    .description("Make an API request")
    .option("-u, --url <url>", "API URL")
    .option("-m, --method <method>", "HTTP method", "GET")
    .action(async (options) => {
      try {
        const response = await axios({
          method: options.method,
          url: options.url,
        });
        console.log("API request successful:", response.data);
      } catch (error) {
        console.error("Error during API request:", error.message);
      }
    });

  // Load Git command
  program
    .command("git <command>")
    .description("Git operations (status, commit, push)")
    .action((command) => {
      execCommand(`git ${command}`)
        .then((output) => {
          console.log(output);
        })
        .catch((err) => console.error(err));
    });

  // Load Code Generator
  program
    .command("codegen <type> [name]")
    .description("Generate boilerplate code (e.g., component, route, model)")
    .action((type, name) => {
      switch (type) {
        case "component":
          console.log(`Generating React component: ${name}`);
          break;
        case "route":
          console.log(`Generating Express route: ${name}`);
          break;
        case "model":
          console.log(`Generating MongoDB model: ${name}`);
          break;
        default:
          console.log("Unknown codegen type");
      }
    });

  // Load Log viewer
  program
    .command("logs [file]")
    .description("View logs from a file")
    .action((file) => {
      if (!file) {
        console.error("Please specify a log file.");
        return;
      }
      console.log(`Viewing logs from ${file}`);
      // Implement log viewer logic here
    });

  // Load Formatter
  program
    .command("format")
    .description("Format your code with Prettier")
    .action(() => {
      execCommand("prettier --write .")
        .then((output) => {
          console.log(output);
        })
        .catch((err) => console.error(err));
    });

  // Load Testing Utility
  program
    .command("test")
    .description("Run unit tests")
    .action(() => {
      execCommand("npm test")
        .then((output) => {
          // Checking if the test result is successful by looking at output for 'Test Suites: 2 passed'
          if (output.includes("Test Suites: 2 passed")) {
            console.log(chalk.green(output)); // Green for passed tests
          } else if (output.includes("Test Suites: 0 failed")) {
            console.log(chalk.green(output)); // Green even if no tests failed
          } else {
            console.log(chalk.red(output)); // Red for failed tests
          }
        })
        .catch((err) => {
          // Use basic console.error if chalk is causing issues
          console.error(chalk.red(err));
        });
    });

  // Load Environment Manager
  program
    .command("env <action>")
    .description("Manage .env files (e.g., switch, view)")
    .action((action) => {
      switch (action) {
        case "switch":
          console.log("Switching to a different environment...");
          break;
        case "view":
          console.log("Viewing current environment variables...");
          break;
        default:
          console.log("Unknown action");
      }
    });
};
