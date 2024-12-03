import { exec } from "child_process";

export function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      } else if (stderr) {
        reject(`stderr: ${stderr}`);
      } else {
        resolve(stdout); // Capture standard output here
      }
    });
  });
}
