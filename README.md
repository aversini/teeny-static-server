# Teeny Static Server

[![npm version](https://badge.fury.io/js/teeny-static-server.svg)](https://badge.fury.io/js/teeny-static-server)
<a href="https://david-dm.org/aversini/teeny-static-server"><img src="https://david-dm.org/aversini/teeny-static-server.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/aversini/teeny-static-server/?type=dev"><img src="https://david-dm.org/aversini/teeny-static-server/dev-status.svg" alt="devDependency Status"></a> ![Build Status](https://github.com/aversini/teeny-static-server/workflows/coverage/badge.svg) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/6ffcf051947a4e8e9d6155edec2a6e00)](https://app.codacy.com/gh/aversini/teeny-static-server?utm_source=github.com&utm_medium=referral&utm_content=aversini/teeny-static-server&utm_campaign=Badge_Grade)

> Teeny Static Server is a simple, zero-configuration, command line HTTP server to serve static files locally.

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
| `-u` or `--no-gzip`        | false   | Disable GZIP compression                                    |
| `-v` or `--version`        |         | Output the current version                                  |

## Credits

This package was heavily inspired from [serve](https://github.com/vercel/serve), with the intent to make a version that is simpler to use, with zero-configuration needed, but only supporting a subset of "serve" features, limited to local serving, and no support for SSL encryption.

## License

MIT © Arno Versini
