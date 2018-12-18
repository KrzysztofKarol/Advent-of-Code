const {run} = require("./day-5-part-2");
const {runTests} = require("./test-helper");

const tests = [
    {
        input: "dabAcCaCBAcCcaDA",
        expected: "daDA".length,
    },
];

runTests(tests, run);
