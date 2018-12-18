const {run, prepareData} = require("./day-6-part-1");
const {runTests} = require("./test-helper");

const tests = [
    {
        input: prepareData(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`),
        expected: 17,
    },
];

runTests(tests, run);
