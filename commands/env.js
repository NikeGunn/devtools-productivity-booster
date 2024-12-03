import inquirer from "inquirer";
import fs from "fs/promises";

export function envCommand(program) {
  program
    .command("env")
    .description("Manage environment variables")
    .option("-s, --set <key=value>", "Set an environment variable")
    .option("-l, --list", "List all environment variables")
    .action(async (options) => {
      try {
        if (options.set) {
          const [key, value] = options.set.split("=");
          await appendToEnvFile(key, value);
        } else if (options.list) {
          await listEnvVariables();
        } else {
          await interactiveEnvManager();
        }
      } catch (error) {
        console.error("Failed to manage environment variables:", error);
      }
    });
}

async function appendToEnvFile(key, value) {
  const envContent = `${key}=${value}\n`;
  await fs.appendFile(".env", envContent);
  console.log(`Added ${key} to .env file`);
}

async function listEnvVariables() {
  try {
    const content = await fs.readFile(".env", "utf-8");
    console.log("Current environment variables:");
    console.log(content);
  } catch (error) {
    console.log("No .env file found");
  }
}

async function interactiveEnvManager() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["Add new variable", "List variables", "Exit"],
    },
  ]);

  if (action === "Add new variable") {
    const { key, value } = await inquirer.prompt([
      {
        type: "input",
        name: "key",
        message: "Enter variable name:",
      },
      {
        type: "input",
        name: "value",
        message: "Enter variable value:",
      },
    ]);
    await appendToEnvFile(key, value);
  } else if (action === "List variables") {
    await listEnvVariables();
  }
}
