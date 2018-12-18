const {run} = require("./day-5-part-1");
const {runTests} = require("./test-helper");

const tests = [
    {
        input: "dabAcCaCBAcCcaDA",
        expected: "dabCBAcaDA".length,
    },
];

runTests(tests, run);
