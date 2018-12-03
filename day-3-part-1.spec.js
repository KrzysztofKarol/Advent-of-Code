const {getNumberOfOverlaps, prepareData} = require("./day-3-part-1");
const {runTests} = require("./test-helper");

const tests = [
    {
        input: prepareData(`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`),
        expected: 4,
    },
];

runTests(tests, getNumberOfOverlaps);
