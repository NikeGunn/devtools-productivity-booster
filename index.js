#!/usr/bin/env node
import { Command } from "commander";
import { loadCommands } from "./commands/loadCommands.js";

const program = new Command();
program.version("1.0.0");

// Load custom commands (e.g., api, other commands)
loadCommands(program);

// Add a catch-all for showing available commands
program.on("command:*", () => {
  console.log("Available commands:");
  program.commands.forEach((command) => {
    console.log(`  ${command.name()}: ${command.description()}`);
  });
});

// Parse command-line arguments
program.parse(process.argv);
