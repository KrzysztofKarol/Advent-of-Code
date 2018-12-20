const {run, getPowerLevel} = require("./day-11-part-1");
const {runTests} = require("./test-helper");

const testsRun = [
    {
        input: 18,
        expected: 29,
    },
    {
        input: 42,
        expected: 30,
    },
];

runTests(testsRun, run);

// noinspection SpellCheckingInspection
const testsGetPowerLevel = [
    {
        args: [57, 122, 79],
        expected: -5,
    },
    {
        args: [39, 217, 196],
        expected: 0,
    },
    {
        args: [71, 101, 153],
        expected: 4,
    },
];

runTests(testsGetPowerLevel, getPowerLevel);
