const fs = require("fs");

const data = fs.readFileSync("./data/1", "utf8");

function getFrequency(input) {
    return input.reduce((acc, [sign, ...digits]) => {
        const number = Number(digits.join(""));

        return sign === "+"
            ? acc + number
            : acc - number;
    }, 0);
}

const input = data.split("\n")
// Omit last empty line
    .filter(Boolean);

const result = getFrequency(input);

console.log({result});

module.exports = {
    getFrequency,
};
