module.exports = {
    bail: true,
    verbose: true,
    transform: {
        "^.+\\.(j|t)sx?$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    globals: {
        VERSION: "FAKE_VERSION",
    },
};
