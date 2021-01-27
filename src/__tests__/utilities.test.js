const {
  displayErrorMessages,
  log,
  mergeConfigurations,
  printHTTPLogs,
  upperFirst,
} = require("../utilities");

const deepEqual = require("./helpers/deepEqual");

let mockExit, spyExit, mockLog, spyLog;

describe("when testing for individual utilities wtih no logging side-effects", () => {
  it("should convert the first letter of a sentence to uppercase", async () => {
    expect(upperFirst("this is a test")).toBe("This is a test");
  });
});

describe("when testing for configuration merging wtih no logging side-effects", () => {
  it("should perform a deep equality between 2 exact same objects", async () => {
    const config = {
      bump: {
        nextPossible: [
          {
            type: "minor",
            default: true,
          },
        ],
      },
      release: {
        prerelease: [
          {
            name: "run tests",
            command: "npm run test",
          },
          {
            name: "generate changelog",
            command: "npm run changelog",
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
            type: "minor",
            default: true,
          },
        ],
      },
      release: {
        prerelease: [
          {
            name: "run tests",
            command: "npm run test",
          },
          {
            name: "generate changelog",
            command: "npm run changelog",
          },
        ],
      },
    };
    const configB = {
      bump: {
        nextPossible: [
          {
            type: "minor",
            default: false,
          },
        ],
      },
      release: {
        prerelease: [
          {
            name: "run tests",
            command: "npm run test",
          },
          {
            name: "generate changelog",
            command: "npm run changelog",
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
            type: "minor",
            default: true,
          },
        ],
      },
    };
    const configB = {
      bump: {
        nextPossible: [
          {
            type: "minor",
            default: false,
          },
        ],
      },
      release: true,
    };
    expect(deepEqual(configA, configB)).toBe(false);
  });

  it("should return a new configuration with custom nexPossible", async () => {
    const configA = {
      bump: {
        nextPossible: [
          {
            type: "minor",
            default: false,
          },
        ],
      },
    };
    const configB = {
      bump: {
        nextPossible: [
          {
            type: "minor",
            default: true,
          },
        ],
      },
    };
    expect(deepEqual(configA, configB)).toBe(false);
    /**
     * This method will alter the objects, so no way to test for their
     * equality AFTER the merge is done... Only thing we can do is test
     * that the end result gets the right values.
     */
    const res = mergeConfigurations(configA, configB);

    expect(
      deepEqual(res.bump.nextPossible, [
        {
          type: "minor",
          default: true,
        },
      ])
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
    spyExit = jest.spyOn(process, "exit").mockImplementation(mockExit);
    mockLog = jest.fn();
    spyLog = jest.spyOn(console, "log").mockImplementation(mockLog);
  });
  afterEach(() => {
    spyExit.mockRestore();
    spyLog.mockRestore();
  });

  it("should log a simple message", async () => {
    log("Hello World");
    expect(mockLog).toHaveBeenCalledWith("Hello World");
    log();
    expect(mockLog).toHaveBeenCalledWith();
  });

  it("should display the proper error messages and exit with 0", async () => {
    displayErrorMessages(["message one", "message two"]);
    expect(mockLog).toHaveBeenCalledWith("message one");
    expect(mockLog).toHaveBeenCalledWith("message two");
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it("should not display any error messages and should not exit with 0", async () => {
    displayErrorMessages();
    expect(mockLog).not.toHaveBeenCalled();
    expect(mockExit).not.toHaveBeenCalled();
  });

  it("", async () => {
    const DateReal = global.Date;
    const mockDate = new Date("2020-11-01T00:00:00.000Z");

    const spyDate = jest.spyOn(global, "Date").mockImplementation((...args) => {
      if (args.length) {
        return new DateReal(...args);
      }
      return mockDate;
    });

    printHTTPLogs({ method: "GET", url: "/" });
    expect(mockLog).toHaveBeenCalledWith(
      "[ Sat Oct 31 2020 5:00:00 PM ] GET /"
    );
    spyDate.mockRestore();
  });
});
