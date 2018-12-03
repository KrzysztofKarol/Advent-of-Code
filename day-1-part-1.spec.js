const {getFrequency} = require("./day-1-part-1");
const {runTests} = require("./test-helper");

const tests = [
    {input: "+1, +1, +1", expected: 3},
    {input: "+1, +1, -2", expected: 0},
    {input: "-1, -2, -3", expected: -6},
]
    .map(({input, ...rest}) => ({input: input.split(", "), ...rest}));

runTests(tests, getFrequency);
