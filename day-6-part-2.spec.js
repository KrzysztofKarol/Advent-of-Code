const {run, prepareData} = require("./day-6-part-2");
const {runTests} = require("./test-helper");

const tests = [
    {
        args: [
            prepareData(`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`),
            32,
        ],
        expected: 16,
    },
];

runTests(tests, run);
