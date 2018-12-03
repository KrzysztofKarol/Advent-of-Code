const fs = require("fs");

const data = fs.readFileSync("./data/2", "utf8");

function getChecksum(input) {
    return input
        .reduce(([double, triple], str) => {
            const map = [...str].reduce((m, letter) => {
                if (m.has(letter)) {
                    m.set(letter, m.get(letter) + 1);
                } else {
                    m.set(letter, 1);
                }

                return m;
            }, new Map());

            // noinspection JSCheckFunctionSignatures
            const countMap = new Map([...map].map(([key, value]) => [value, key]));

            if (countMap.has(2)) {
                double++;
            }

            if (countMap.has(3)) {
                triple++;
            }

            return [double, triple];

        }, [/*double*/0, /*triple*/0])
        .reduce((a, b) => a * b);
}

const input = data.split("\n")
// Omit last empty line
    .filter(Boolean);

const result = getChecksum(input);

console.log({result});

module.exports = {
    getChecksum,
};
