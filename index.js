#!/usr/bin/env node
import { Command } from "commander";
import { loadCommands } from "./commands/loadCommands.js";
import axios from "axios";

// Function to fetch the version from the npm registry
const fetchVersionFromNpm = async () => {
  try {
    // Replace with your actual package name
    const response = await axios.get('https://registry.npmjs.org/buster-cli');
    return response.data['dist-tags'].latest;
  } catch (error) {
    console.error("Error fetching version from npm:", error.message);
    return "1.0.0"; // Fallback version if there's an error
  }
};

const program = new Command();

// Fetch the version from npm and set it dynamically
fetchVersionFromNpm().then((version) => {
  program.version(version);

  // Load custom commands (e.g., API, Git, logs)
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
});
