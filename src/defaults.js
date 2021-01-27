module.exports = {
  port: 8080,
  cache: 0,
  cors: false,
  unzipped: true,
  logs: false,
  open: false,
  path: process.cwd(),
  headers: {
    "X-Powered-By": "Teeny Static Server",
  },
};
