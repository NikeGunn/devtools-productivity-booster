import { execSync } from "child_process";

export function gitCommand(program) {
  program
    .command("git")
    .description("Git operations")
    .option("-b, --branch <name>", "Create and checkout new branch")
    .option("-c, --commit <message>", "Commit changes")
    .option("-p, --push", "Push changes to remote")
    .action(async (options) => {
      try {
        if (options.branch) {
          execSync(`git checkout -b ${options.branch}`, { stdio: "inherit" });
        }
        if (options.commit) {
          execSync("git add .", { stdio: "inherit" });
          execSync(`git commit -m "${options.commit}"`, { stdio: "inherit" });
        }
        if (options.push) {
          execSync("git push", { stdio: "inherit" });
        }
      } catch (error) {
        console.error("Git operation failed:", error.message);
      }
    });
}
