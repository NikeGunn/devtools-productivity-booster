import { initCommand } from "./init.js";
import { dependencyCommand } from "./dependency.js";
import { envCommand } from "./env.js";
import { gitCommand } from "./git.js";
import { apiCommand } from "./api.js";
import { logsCommand } from "./logs.js";
import chalk from "chalk";

export function loadCommands(program) {
  initCommand(program);
  dependencyCommand(program);
  envCommand(program);
  gitCommand(program);
  apiCommand(program);
  logsCommand(program);
}

export function initializeLogger() {
  return {
    info: (message) => console.log(chalk.blue("ℹ"), message),
    success: (message) => console.log(chalk.green("✔"), message),
    warning: (message) => console.log(chalk.yellow("⚠"), message),
    error: (message) => console.log(chalk.red("✖"), message),
    debug: (message) => {
      if (process.env.DEBUG) {
        console.log(chalk.gray("🐛"), message);
      }
    },
  };
}
