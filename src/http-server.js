const { log, handleShutdown, startServer } = require("./utilities");
module.exports = async (config) => {
  await startServer(config);
  handleShutdown(() => {
    log();
    log("Gracefully shutting down. Please wait...");
    process.on("SIGINT", () => {
      log("Force-closing all open sockets...");
      process.exit(0);
    });
  });
};
