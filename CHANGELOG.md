# [2.0.0](https://github.com/aversini/teeny-static-server/compare/v1.1.0...v2.0.0) (2021-02-12)

### Features

- migrating from commander to meow ([231b6bb](https://github.com/aversini/teeny-static-server/commit/231b6bbb0a0e948ea6d2b2ac00c247d4b7126178))

### BREAKING CHANGES

The option to use or not use gzip has changed. It is still enabled by default.
To disable gzip, use the flag "--no-gzip" instead of "-u"

# [1.1.0](https://github.com/aversini/teeny-static-server/compare/v1.0.1...v1.1.0) (2021-01-30)

### Features

- migrating to teeny-logger for logging consistency ([ff8ffc4](https://github.com/aversini/teeny-static-server/commit/ff8ffc40f0d67b2184b40e4fac630212ffdb3689))

## [1.0.1](https://github.com/aversini/teeny-static-server/compare/v1.0.0...v1.0.1) (2021-01-29)

### Bug Fixes

- if the port is available, do not display error message (undefined) ([31e3c43](https://github.com/aversini/teeny-static-server/commit/31e3c4379cecbb6fe0e36baefc0bb33d78d51d45))

# [1.0.0](https://github.com/aversini/teeny-static-server/compare/v0.0.5...v1.0.0) (2021-01-28)

### Bug Fixes

- algo to detect if port is not available is not working at all ([f8e8a04](https://github.com/aversini/teeny-static-server/commit/f8e8a046e5c9ae8332424eae79dafd62b961660c))
- public path was not being rendered correctly ([2c5d7cd](https://github.com/aversini/teeny-static-server/commit/2c5d7cd581ad3469e7440e7e856fd9422d092e11))

## [0.0.5](https://github.com/aversini/teeny-static-server/compare/v0.0.4...v0.0.5) (2021-01-28)

### Bug Fixes

- replace deprecated opn with open ([e962fa8](https://github.com/aversini/teeny-static-server/commit/e962fa8606fdda46df9ebbf44c618ff2bc309086))

## [0.0.4](https://github.com/aversini/teeny-static-server/compare/v0.0.3...v0.0.4) (2021-01-28)

### Bug Fixes

- better shutdown process ([8b05996](https://github.com/aversini/teeny-static-server/commit/8b059968746f19ed12461d10535c2a0f55ccd053))

## 0.0.3 (2021-01-28)

### Bug Fixes

- custom Headers were not taken into account ([3600cdb](https://github.com/aversini/teeny-static-server/commit/3600cdb6ed0749448320b451b93874233e48bb5c))
- GZIP option was not taken into account ([d912193](https://github.com/aversini/teeny-static-server/commit/d912193b86d2699bf17bd3ed0b79f0dc8f97d978))
