// Run COOKIES="session=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" node 1.js
const {getData} = require("./helpers");

getData("https://adventofcode.com/2018/day/1/input", (data) => {
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
});
