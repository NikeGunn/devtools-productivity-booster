import fs from "fs/promises";
import path from "path";

export function logsCommand(program) {
  program
    .command("logs")
    .description("View application logs")
    .option("-t, --tail <lines>", "Number of lines to show", "10")
    .action(async (options) => {
      try {
        const logFile = path.join(process.cwd(), "logs", "app.log");
        const content = await fs.readFile(logFile, "utf-8");
        const lines = content.split("\n");
        const lastLines = lines.slice(-parseInt(options.tail)).join("\n");
        console.log(lastLines);
      } catch (error) {
        console.error("Failed to read logs:", error.message);
      }
    });
}
