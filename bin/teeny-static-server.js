#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");
const commander = require("commander");
const program = new commander.Command();
const { displayErrorMessages, shallowMerge } = require("teeny-js-utilities");
const httpServer = require("../src/http-server");
const defaults = require("../src/defaults");
const pkg = require(path.join(__dirname, "../package.json"));

const DEFAULT_PORT = 8080;

const optionParseInt = (value) => {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidOptionArgumentError("Not a number.");
  }
  return parsedValue;
};

program
  .version(pkg.version, "-v, --version", "Output the current version")
  .arguments("[path]")
  .option("-c, --cache <number>", "Time in seconds for caching files", 0)
  .option(
    "-C, --cors",
    "Set CORS headers to * to allow requests from any origin",
    false
  )
  .option("-o, --open", "Open in your default browser", false)
  .option("-l, --logs", "Log HTTP requests at the prompt", false)
  .option(
    "-p, --port <n>",
    "Port to listen on - Will try next available if already used",
    optionParseInt,
    DEFAULT_PORT
  )
  .option("-u, --no-gzip", "Disable GZIP compression (default: false)", false)
  .helpOption("-h, --help", "Display help instructions");

program.addHelpText(
  "after",
  `\nPath: the path to serve files from (default: current folder)`
);

program.configureHelp({
  sortOptions: true,
});

program.parse(process.argv);
const customCfg = program.opts();

if (program.args.length) {
  const customPath = program.args[0];
  if (fs.pathExistsSync(customPath)) {
    customCfg.path = customPath;
  } else {
    displayErrorMessages([`Folder ${customPath} does not exist!`]);
  }
}

/**
 * Merging default configuration with the
 * preferences shared by the user.
 */
const config = shallowMerge(defaults, customCfg);

httpServer(config);
