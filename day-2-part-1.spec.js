const {getChecksum} = require("./day-2-part-1");
const {runTests} = require("./test-helper");

const tests = [
    {
        input: [
            "abcdef",
            "bababc",
            "abbcde",
            "abcccd",
            "aabcdd",
            "abcdee",
            "ababab",
        ],
        expected: 12,
    },
];

runTests(tests, getChecksum);
