module.exports = {
    runTests: (tests, method) => {
        for (const {input, args, expected} of tests) {
            const actual = input === undefined ? method(...args) : method(input);

            if (actual !== expected) {
                throw new Error(`Input: ${input}\nExpected: ${expected}\nActual: ${actual}`);
            }
        }
    }
};
