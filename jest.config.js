module.exports = {
    testEnvironment: 'jest-environment-node',
    setupFilesAfterEnv: ['jest-extended/all'],
    coverageReporters: ['text', 'text-summary'],
    verbose: true,
    coverageThreshold: {
        global: {
            statements: 70,
            functions: 70,
            lines: 70,
            branches: 40,
        },
    },
};
