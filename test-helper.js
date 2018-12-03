module.exports = {
    runTests: (tests, method) => {
        for (const {input, expected} of tests) {
            const actual = method(input);

            if (actual !== expected) {
                throw new Error(`Input: ${input}\nExpected: ${expected}\nActual: ${actual}`);
            }
        }
    }
};
