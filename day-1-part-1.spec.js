const {getFrequency} = require("./day-1-part-1");

const tests = [
    {input: "+1, +1, +1", expected: 3},
    {input: "+1, +1, -2", expected: 0},
    {input: "-1, -2, -3", expected: -6},
]
    .map(({input, ...rest}) => ({input: input.split(", "), ...rest}));

for (const {input, expected} of tests) {
    const actual = getFrequency(input);

    if (actual !== expected) {
        throw new Error(`Input: ${input}\nExpected: ${expected}\nActual: ${actual}`);
    }
}
