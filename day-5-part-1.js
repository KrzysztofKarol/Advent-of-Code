const fs = require("fs");
const data = fs.readFileSync("./data/5", "utf8");

function run(input) {
    for (let pointer = 0; pointer < input.length - 1 - 1;) {
        const letter1 = input[pointer];
        const letter2 = input[pointer + 1];

        if (isSameLetterButDifferentCase(letter1, letter2)) {
            input = input.substring(0, pointer) + input.substring(pointer + 2);
            pointer = Math.max(0, pointer - 2);
        } else {
            pointer++;
        }
    }

    // return input;
    return input.length;
}


function prepareData(data) {
    return data.replace(/[^a-zA-Z]/g, "");
}

const result = run(prepareData(data));
console.log({result});

module.exports = {
    run,
};

function isSameLetterButDifferentCase(letter1, letter2) {
    const SMALL_BIG_LETTER_DIFF = Math.abs("a".charCodeAt(0) - "A".charCodeAt(0));

    return Math.abs(letter1.charCodeAt(0) - letter2.charCodeAt(0)) === SMALL_BIG_LETTER_DIFF;
}