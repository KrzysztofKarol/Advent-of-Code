const fs = require("fs");

const data = fs.readFileSync("./data/1", "utf8");

function getFirstFrequency(input) {
    const known = new Set();
    let current = 0;
    known.add(current);

    while(true) {
        for (const [sign, ...digits] of input) {
            const number = Number(digits.join(""));
            current = sign === "+"
                ? current + number
                : current - number;

            if (known.has(current)) {
                return current;
            }

            known.add(current);
        }
    }
}

const input = data.split("\n")
// Omit last empty line
    .filter(Boolean);

const result = getFirstFrequency(input);

console.log({result});

module.exports = {
    getFirstFrequency,
};
