import axios from "axios";
import ora from "ora";

export function apiCommand(program) {
  program
    .command("api")
    .description("Test API endpoints")
    .option("-u, --url <url>", "API endpoint URL")
    .option("-m, --method <method>", "HTTP method", "GET")
    .option("-d, --data <data>", "Request body data")
    .option("-h, --headers <headers>", "Request headers")
    .action(async (options) => {
      const spinner = ora("Making API request...").start();
      try {
        const config = {
          method: options.method,
          url: options.url,
          data: options.data ? JSON.parse(options.data) : undefined,
          headers: options.headers ? JSON.parse(options.headers) : {},
        };

        const response = await axios(config);
        spinner.succeed("API request successful");
        console.log("Response:", JSON.stringify(response.data, null, 2));
      } catch (error) {
        spinner.fail("API request failed");
        console.error("Error:", error.message);
      }
    });
}
