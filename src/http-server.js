const { log, handleShutdown, startServer } = require("./utilities");
module.exports = async (config) => {
  await startServer(config);
  handleShutdown(() => {
    log();
    log("Shutting down. Please wait...");
    process.on("SIGINT", () => {
      process.exit(0);
    });
  });
};
