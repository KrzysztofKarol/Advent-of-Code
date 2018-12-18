const fs = require("fs");
const data = fs.readFileSync("./data/5", "utf8");

const BIG_A_CHAR_CODE = "A".charCodeAt(0);
const BIG_SMALL_LETTER_DIFF = Math.abs("a".charCodeAt(0) - BIG_A_CHAR_CODE);

function react(input) {
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

function run(input) {
    return Math.min(
        ...Array.from({length: "Z".charCodeAt(0) - BIG_A_CHAR_CODE}, (_, i) => [
            String.fromCharCode(BIG_A_CHAR_CODE + i),
        ])
            .map(letter => react(input.replace(new RegExp(letter, "gi"), "")))
    );
}

function prepareData(data) {
    return data.replace(/[^A-Za-z]/g, "");
}

const result = run(prepareData(data));
console.log({result});

module.exports = {
    run,
};

function isSameLetterButDifferentCase(letter1, letter2) {
    return Math.abs(letter1.charCodeAt(0) - letter2.charCodeAt(0)) === BIG_SMALL_LETTER_DIFF;
}