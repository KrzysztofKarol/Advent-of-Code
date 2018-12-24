const {run, prepareData} = require("./day-23-part-2");
const {runTests} = require("./test-helper");

const testsRun = [
    {
        input: prepareData(`pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5
`),
        expected: 36,
    },
];

runTests(testsRun, run);
