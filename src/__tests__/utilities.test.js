const {
  deepEqual,
  displayErrorMessages,
  shallowMerge,
} = require("teeny-js-utilities");
const { logger } = require("../utilities");

let mockLog,
  mockLogError,
  mockLogWarning,
  spyExit,
  spyLog,
  spyLogError,
  spyLogWarning,
  mockExit;

describe("when testing for configuration merging wtih no logging side-effects", () => {
  it("should perform a deep equality between 2 exact same objects", async () => {
    const config = {
      bump: {
        nextPossible: [
          {
            default: true,
            type: "minor",
          },
        ],
      },
      release: {
        prerelease: [
          {
            command: "npm run test",
            name: "run tests",
          },
          {
            command: "npm run changelog",
            name: "generate changelog",
          },
        ],
      },
    };
    expect(deepEqual(config, config)).toBe(true);
  });

  it("should perform a deep equality between 2 slightly different objects", async () => {
    const configA = {
      bump: {
        nextPossible: [
          {
            default: true,
            type: "minor",
          },
        ],
      },
      release: {
        prerelease: [
          {
            command: "npm run test",
            name: "run tests",
          },
          {
            command: "npm run changelog",
            name: "generate changelog",
          },
        ],
      },
    };
    const configB = {
      bump: {
        nextPossible: [
          {
            default: false,
            type: "minor",
          },
        ],
      },
      release: {
        prerelease: [
          {
            command: "npm run test",
            name: "run tests",
          },
          {
            command: "npm run changelog",
            name: "generate changelog",
          },
        ],
      },
    };
    expect(deepEqual(configA, configB)).toBe(false);
  });

  it("should perform a deep equality between 2 completely different objects", async () => {
    const configA = {
      bump: {
        nextPossible: [
          {
            default: true,
            type: "minor",
          },
        ],
      },
    };
    const configB = {
      bump: {
        nextPossible: [
          {
            default: false,
            type: "minor",
          },
        ],
      },
      release: true,
    };
    expect(deepEqual(configA, configB)).toBe(false);
  });

  it("should return a new configuration with custom nexPossible", async () => {
    const configA = require("../defaults");
    const configB = {
      gzip: false,
      port: 8081,
    };
    expect(deepEqual(configA, configB)).toBe(false);
    /**
     * This method will alter the objects, so no way to test for their
     * equality AFTER the merge is done... Only thing we can do is test
     * that the end result gets the right values.
     */
    const res = shallowMerge(configA, configB);

    // eslint-disable-next-line no-magic-numbers
    expect(res.port).toBe(8081);
    expect(res.cache).toBe(0);
    expect(res.cors).toBe(false);
    expect(res.gzip).toBe(false);
    expect(res.logs).toBe(false);
    expect(res.open).toBe(false);
    expect(res.path).toBe(`${process.cwd()}/`);
    expect(
      deepEqual(res.headers, [{ "X-Powered-By": "Teeny Static Server" }])
    ).toBe(true);
  });
});

/**
 * Some utilities have logging capabilities that needs to be
 * tested a little bit differently:
 * - mocking process.exit
 * - console.log
 */
describe("when testing for utilities with logging side-effects", () => {
  beforeEach(() => {
    mockExit = jest.fn();
    mockLog = jest.fn();
    mockLogError = jest.fn();
    mockLogWarning = jest.fn();

    spyExit = jest.spyOn(process, "exit").mockImplementation(mockExit);
    spyLog = jest.spyOn(console, "log").mockImplementation(mockLog);
    spyLogError = jest.spyOn(console, "error").mockImplementation(mockLogError);
    spyLogWarning = jest
      .spyOn(console, "warn")
      .mockImplementation(mockLogWarning);
  });
  afterEach(() => {
    spyExit.mockRestore();
    spyLog.mockRestore();
    spyLogError.mockRestore();
    spyLogWarning.mockRestore();
  });

  it("should log a simple message", async () => {
    logger.log("Hello World");
    expect(mockLog).toHaveBeenCalledWith("Hello World");
    logger.log();
    expect(mockLog).toHaveBeenCalledWith("");
  });

  it("should display the proper error messages and exit with 0", async () => {
    displayErrorMessages(["message one", "message two"]);
    expect(mockLogError).toHaveBeenCalledWith("message one");
    expect(mockLogError).toHaveBeenCalledWith("message two");
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it("should not display any error messages and should not exit with 0", async () => {
    displayErrorMessages();
    expect(mockLog).not.toHaveBeenCalled();
    expect(mockExit).not.toHaveBeenCalled();
  });
});
