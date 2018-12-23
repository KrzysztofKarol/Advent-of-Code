const {run, prepareData} = require("./day-23-part-1");
const {runTests} = require("./test-helper");

const testsRun = [
    {
        input: prepareData(`pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1
`),
        expected: 7,
    },
];

runTests(testsRun, run);
