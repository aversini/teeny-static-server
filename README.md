# Teeny Static Server

![npm](https://img.shields.io/npm/v/teeny-static-server?label=version&logo=npm)
![David](https://img.shields.io/david/aversini/teeny-static-server?logo=npm)
![David](https://img.shields.io/david/dev/aversini/teeny-static-server?logo=npm)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/aversini/teeny-static-server/coverage?label=coverage&logo=github)

> Teeny Static Server is a simple, zero-configuration, command line HTTP server to serve static files locally.

**DEPRECATION NOTICE:** For newer Node versions support, please use https://github.com/aversini/node-cli/tree/main/packages/static-server

## Installation

This command line utility can be installed globally or locally within your project. It does make more sense to have it installed globally though, since it then can be use anywhere by simply starting it to serve the files located in the current folder.

```sh
> npm install -g teeny-static-server
```

## Usage

```sh
> teeny-static-server [options] [path]
```

`[path]` defaults to the current folder if it's not provided at the command line prompt.

At that point, you should be able to visit `http://localhost:8080` and see the files located in the current folder.

### Options

| option                     | default | description                                                 |
| -------------------------- | ------- | ----------------------------------------------------------- |
| `-c` or `--cache <number>` | 0       | Time in seconds for caching files                           |
| `-C` or `--cors`           | false   | Set CORS headers to \* to allow requests from any origin    |
| `-h` or `--help`           |         | Display help instructions                                   |
| `-l` or `--logs`           | false   | Log HTTP requests at the prompt                             |
| `-o` or `--open`           | false   | Open in your default browser                                |
| `-p` or `--port <n>`       | 8080    | Port to listen on - Will try next available if already used |
| `-g` or `--gzip`           | true    | Enable GZIP compression                                     |
| `-v` or `--version`        |         | Output the current version                                  |

## Credits

This package was heavily inspired from [serve](https://github.com/vercel/serve), with the intent to make a version that is simpler to use, with zero-configuration needed, but only supporting a subset of "serve" features, limited to local serving, and no support for SSL encryption.

## License

MIT © Arno Versini
