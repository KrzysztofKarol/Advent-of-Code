const {run} = require("./day-22-part-1");
const {runTests} = require("./test-helper");

const testsRun = [
    {
        input: {
            depth: 510,
            target: [10, 10],
        },
        expected: 114,
    },
];

runTests(testsRun, run);
