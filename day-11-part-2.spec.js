const {run, getPowerLevel} = require("./day-11-part-2");
const {runTests} = require("./test-helper");

const testsRun = [
    // {
    //     input: 18,
    //     expected: "90,269,16",
    // },
    // {
    //     input: 42,
    //     expected: "232,251,12",
    // },
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
