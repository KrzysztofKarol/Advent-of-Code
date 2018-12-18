// 9178 is wrong answer (too high)
// 4975 is wrong answer (too low)
// 4976 is correct answer

const fs = require("fs");
const data = fs.readFileSync("./data/6", "utf8");

function run(input, limit) {
    const maxX = Math.max(...input.map(([x,]) => x));
    const maxY = Math.max(...input.map(([, y]) => y));

    // Ugly!
    // input = input.map(([x, y]) => [x + maxX, y + maxY]);

    const map = Array.from({length: maxY + 1}, () =>
        Array.from({length: maxX + 1}),
    );

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            map[y][x] = getDistanceSum(input, x, y) < limit
                ? "#"
                : ".";
        }
    }

    const mapStringified = map.map(line => line.join("")).join("\n");
    // console.log(mapStringified);
    fs.writeFileSync("out", mapStringified);

    return map.flat().filter(char => char === "#").length;
}


function prepareData(data) {
    return data.split("\n")
    // Omit last empty line
        .filter(Boolean)
        .map(line => line.split(", ").map(Number));
}

const result = run(prepareData(data), 10000);
console.log({result});

module.exports = {
    run,
    prepareData,
};

function getLetter(index) {
    const BIG_A_CHAR_CODE = "A".charCodeAt(0); // 65
    const BIG_Z_CHAR_CODE = "Z".charCodeAt(0); // 90
    const SMALL_A_CHAR_CODE = "a".charCodeAt(0); // 97
    const NUMBER_OF_LETTERS = BIG_Z_CHAR_CODE - BIG_A_CHAR_CODE + 1; // 26

    const base = index <= BIG_Z_CHAR_CODE - BIG_A_CHAR_CODE ? BIG_A_CHAR_CODE : SMALL_A_CHAR_CODE;

    return String.fromCharCode(base + index % NUMBER_OF_LETTERS);
}

function getBase(index) {
    return getLetter(index);
}

function getDistanceSum(input, x, y) {
    return input.reduce((acc, [baseX, baseY]) => acc + Math.abs(baseX - x) + Math.abs(baseY - y), 0);
}
