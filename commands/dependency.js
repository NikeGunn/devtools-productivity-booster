import { execSync } from "child_process";
import ora from "ora";

export function dependencyCommand(program) {
  program
    .command("add")
    .description("Add a dependency to the project")
    .argument("<package>", "Package name to add")
    .option("-D, --dev", "Add as development dependency")
    .action(async (packageName, options) => {
      const spinner = ora("Installing dependency...").start();
      try {
        const command = `npm install ${options.dev ? "-D" : ""} ${packageName}`;
        execSync(command, { stdio: "pipe" });
        spinner.succeed(`Successfully installed ${packageName}`);
      } catch (error) {
        spinner.fail(`Failed to install ${packageName}`);
        console.error(error.message);
      }
    });

  program
    .command("remove")
    .description("Remove a dependency from the project")
    .argument("<package>", "Package name to remove")
    .action(async (packageName) => {
      const spinner = ora("Removing dependency...").start();
      try {
        execSync(`npm uninstall ${packageName}`, { stdio: "pipe" });
        spinner.succeed(`Successfully removed ${packageName}`);
      } catch (error) {
        spinner.fail(`Failed to remove ${packageName}`);
        console.error(error.message);
      }
    });
}
