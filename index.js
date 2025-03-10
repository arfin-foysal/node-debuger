const fs = require("fs");
const path = require("path");

/**
 * Configuration for logging
 */
const LOG_TO_FILE = false; // Set to true to enable logging
const LOG_FILE_PATH = path.join(__dirname, "debug.log");

/**
 * Helper function to format and log data.
 * @param {string} title - The title of the log (e.g., "DUMP", "DUMP & DIE").
 * @param {boolean} exit - Whether to exit the process after logging.
 * @param {...any} data - The parameters to log.
 */
function logData(title, exit, ...data) {
  const timestamp = new Date().toISOString();
  console.log("\n" + "█".repeat(50));
  console.log(`🔍 ${title} at ${timestamp}`);
  console.log("█".repeat(50) + "\n");

  const formattedData = data.map((item, index) => {
    console.log(`👉 Param ${index + 1}:`);
    console.dir(item, { depth: null, colors: true });
    return `Param ${index + 1}:\n${JSON.stringify(item, null, 2)}`;
  }).join("\n\n");

  if (LOG_TO_FILE) {
    fs.appendFileSync(LOG_FILE_PATH, `\n[${timestamp}] ${title}:\n${formattedData}\n`);
  }

  if (exit) {
    console.log("\n🚫 Execution stopped.\n");
    process.exit(1);
  }
}

/**
 * The `dd` function prints each parameter and then stops script execution.
 * Supports Express.js response and logging to a file.
 * @param {...any} data - Data to print.
 */
function dd(...data) {
  if (isExpressResponse(data)) {
    return expressResponse(data, true);
  }
  logData("DUMP & DIE", true, ...data);
}

/**
 * The `dump` function prints each parameter but does not stop execution.
 * Supports Express.js response and logging to a file.
 * @param {...any} data - Data to print.
 */
function dump(...data) {
  if (isExpressResponse(data)) {
    return expressResponse(data, false);
  }
  logData("DUMP", false, ...data);
}

/**
 * Checks if the first argument is an Express response object.
 * @param {any[]} data
 * @returns {boolean}
 */
function isExpressResponse(data) {
  return data.length > 0 && data[0] && typeof data[0].json === "function";
}

/**
 * Handles Express.js responses.
 * @param {any[]} data
 * @param {boolean} exit
 */
function expressResponse(data, exit) {
  const res = data.shift();
  res.status(200).json({
    status: exit ? "terminated" : "debug",
    timestamp: new Date().toISOString(),
    data: data
  });
  if (exit) {
    process.exit(1);
  }
}

module.exports = { dd, dump };
exports.default = dd;
