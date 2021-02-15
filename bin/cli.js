#!/usr/bin/env node

const fs = require("fs-extra");
const meow = require("meow");
const {
  displayErrorMessages,
  meowOptionsHelper,
  meowParserHelper,
  shallowMerge,
} = require("teeny-js-utilities");
const defaults = require("../src/defaults");
const { startServer } = require("../src/utilities");

const DEFAULT_PORT = 8080;

const { helpText, options } = meowOptionsHelper({
  flags: {
    cache: {
      alias: "c",
      default: 0,
      description: "Time in seconds for caching files",
      type: "number",
    },
    cors: {
      alias: "C",
      default: false,
      description: "Set CORS headers to * to allow requests from any origin",
      type: "boolean",
    },
    gzip: {
      alias: "g",
      default: true,
      description: "Enable GZIP compression",
      type: "boolean",
    },
    help: {
      alias: "h",
      description: "Display help instructions",
      type: "boolean",
    },
    logs: {
      alias: "l",
      default: false,
      description: "Log HTTP requests at the prompt",
      type: "boolean",
    },
    open: {
      alias: "o",
      default: false,
      description: "Open in your default browser",
      type: "boolean",
    },
    port: {
      alias: "p",
      default: DEFAULT_PORT,
      description:
        "Port to listen on - Will try next available if already used",
      type: "number",
    },
    version: {
      alias: "v",
      description: "Output the current version",
      type: "boolean",
    },
  },
  parameters: {
    path: {
      default: "current folder",
      description: "the path to serve files from",
    },
  },
  usage: true,
});
const cli = meow(helpText, options);
meowParserHelper({ cli });

const customCfg = cli.flags;
if (cli.input.length) {
  const customPath = cli.input[0];
  if (fs.pathExistsSync(customPath)) {
    customCfg.path = `${customPath}/`;
  } else {
    displayErrorMessages([`Folder ${customPath} does not exist!`]);
  }
}

/**
 * Merging default configuration with the
 * preferences shared by the user.
 */
const config = shallowMerge(defaults, customCfg);

(async () => {
  await startServer(config);
})();
