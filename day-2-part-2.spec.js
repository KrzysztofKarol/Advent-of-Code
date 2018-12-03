const {getLetters} = require("./day-2-part-2");
const {runTests} = require("./test-helper");

const tests = [
    {
        input: [
            "abcde",
            "fghij",
            "klmno",
            "pqrst",
            "fguij",
            "axcye",
            "wvxyz",
        ],
        expected: "fgij",
    },
];

runTests(tests, getLetters);
