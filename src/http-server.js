/* istanbul ignore file */
const { startServer } = require("./utilities");

module.exports = async (config) => {
  await startServer(config);
};
