const fs = require("fs");

const data = fs.readFileSync("./data/1", "utf8");

const result = data.split("\n")
// Omit last empty line
    .filter(Boolean)
    .reduce((acc, [sign, ...digits]) => {
        const number = Number(digits.join(""));

        return sign === "+"
            ? acc + number
            : acc - number;
    }, 0);

console.log({result});
