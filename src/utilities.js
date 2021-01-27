const _ = require("lodash");
const compression = require("compression");
const { promisify } = require("util");
const handler = require("serve-handler");
const http = require("http");
const portfinder = require("portfinder");
const boxen = require("boxen");
const opn = require("opn");
const { cyan, green, grey, red, yellow } = require("kleur");

const ONE_SECOND = 1000;
const FORCE_SERVER_CLOSE_DELAY = 3000;

const log = (...args) => {
  // eslint-disable-next-line no-console
  console.log(...args);
};

const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

/**
 *
 * WARNING: this method is nasty! It will alter the original
 * objects... This needs to be fixed, but for now, it's what it is.
 *
 */
const mergeConfigurations = (defaultConfig, customConfig) =>
  _.mergeWith(defaultConfig, customConfig, (def, cust, key) => {
    if (key === "nextPossible") {
      return _.orderBy(
        _.values(_.merge(_.keyBy(def, "type"), _.keyBy(cust, "type"))),
        ["pos"]
      );
    }
  });

const displayErrorMessages = (errorMsg) => {
  if (errorMsg && errorMsg.length) {
    log();
    errorMsg.forEach(function (msg) {
      log(red(msg));
    });
    log();
    process.exit(0);
  }
};

const printHTTPLogs = (req) => {
  const now = new Date();
  log(
    `${grey("[ ")}${grey(now.toDateString())} ${grey(
      now.toLocaleTimeString()
    )}${grey(" ]")} ${green(req.method)} ${cyan(req.url)}`
  );
};

/* istanbul ignore next */
const handleShutdown = (callback) => {
  let run = false;
  const onShutdown = () => {
    if (!run) {
      run = true;
      return callback();
    }
  };
  process.on("SIGINT", onShutdown);
  process.on("SIGTERM", onShutdown);
  process.on("exit", onShutdown);
};

/* istanbul ignore next */
const startServer = async (config) => {
  const requestListener = async (req, res, err) => {
    if (config.headers) {
      config.headers.forEach((header) => {
        const key = Object.keys(header)[0];
        const value = Object.values(header)[0];
        res.setHeader(key, value);
      });
    }
    if (config.cors) {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
    if (config.cache === 0) {
      res.setHeader(
        "Cache-Control",
        "max-age=0, no-cache, no-store, must-revalidate"
      );
    } else {
      res.setHeader(
        "Cache-Control",
        `max-age=${Number(config.cache) * ONE_SECOND}`
      );
    }
    if (config.gzip) {
      await promisify(compression())(req, res);
    }
    if (config.logs) {
      printHTTPLogs(req, res, err);
    }
    return handler(req, res, config);
  };

  const server = http.createServer(requestListener);

  server.on("error", (err) => {
    log(err);
    process.exit(1);
  });

  let port;
  try {
    port = await portfinder.getPortPromise({ port: config.port });
    if (port !== config.port) {
      log(yellow(`Port ${config.port} is not available...`));
      log(yellow(`Using next available instead: ${port}`));
    }
  } catch (e) {
    log(e);
    process.exit(1);
  }
  server.listen(config.port, "0.0.0.0", async () => {
    handleShutdown(() => {
      setTimeout(() => {
        log("Force-closing all open sockets...");
        process.exit(0);
      }, FORCE_SERVER_CLOSE_DELAY);
      server.close();
    });

    const url = `http://localhost:${config.port}`;
    const msg = `Teeny Static Server is up and running.\nURL is now available here:\n${cyan(
      url
    )}\nHit CTRL+C to stop the server.`;
    log();
    log(
      boxen(msg, {
        padding: 1,
        align: "center",
        borderColor: "yellow",
      })
    );

    if (config.open) {
      opn(url, {
        url: true,
        wait: false,
      });
    }
  });
};

module.exports = {
  // public methods
  upperFirst,
  displayErrorMessages,
  handleShutdown,
  log,
  mergeConfigurations,
  startServer,
  // private methods
  printHTTPLogs,
};
