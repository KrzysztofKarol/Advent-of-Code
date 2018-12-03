const fs = require("fs");

const data = fs.readFileSync("./data/2", "utf8");

function getLetters(input) {
    return [...input
        .flatMap((str, i, arr) => {
            if (i === 0) {
                return [];
            }

            return arr.slice(0, i)
                .map(s => [...s].filter((letter, si) => letter === str[si]).join(""));
        })
        .sort((a, b) => b.length - a.length)
    ][0];
}

const input = data.split("\n")
// Omit last empty line
    .filter(Boolean);

const result = getLetters(input);

console.log({result});

module.exports = {
    getLetters,
};
