module.exports = {
  cache: 0,
  cors: false,
  gzip: true,
  headers: [
    {
      "X-Powered-By": "Teeny Static Server",
    },
  ],
  logs: false,
  open: false,
  path: process.cwd(),
  port: 8080,
};
