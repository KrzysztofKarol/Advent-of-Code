// 9178 is wrong answer (too high)
// 4975 is wrong answer (too low)
// 4976 is correct answer

const fs = require("fs");
const data = fs.readFileSync("./data/6", "utf8");

function run(input) {
    const maxX = Math.max(...input.map(([x,]) => x));
    const maxY = Math.max(...input.map(([, y]) => y));

    // Ugly!
    input = input.map(([x, y]) => [x + maxX, y + maxY]);

    const map = Array.from({length: 3 * maxY}, () =>
        Array.from({length: 3 * maxX}),
    );

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            const distances = input.map(point => getDistance([x, y], point));
            const maxDistance = Math.min(...distances);

            const baseIndex = input.findIndex(([baseX, baseY]) => baseX === x && baseY === y);

            map[y][x] = baseIndex === -1
                ? distances.filter(distance => distance === maxDistance).length === 1
                    ? getLetter(distances.findIndex(distance => distance === maxDistance))
                    // ? "."
                    : "."
                : getBase(baseIndex);
        }
    }

    const minX = Math.min(...input.map(([x,]) => x));
    const minY = Math.min(...input.map(([, y]) => y));

    const finite = input
        .map(([x, y], i) => isInfinite(map, getLetter(i)) ? null : getLetter(i))
        .filter(Boolean);

    console.log({finite});

    const finiteOccurrences = finite
    // +1 is already in base
        .map(letter => map.flat().filter(char => char === letter).length);
    console.log({finiteOccurrences});

    // const mapStringified = map.map(line => line.join("")).join("\n");
    // console.log(mapStringified);
    // fs.writeFileSync("out", mapStringified);
    return Math.max(...finiteOccurrences);
}


function prepareData(data) {
    return data.split("\n")
    // Omit last empty line
        .filter(Boolean)
        .map(line => line.split(", ").map(Number));
}

const result = run(prepareData(data));
console.log({result});

module.exports = {
    run,
    prepareData,
};

function getDistance([fromX, fromY], [toX, toY]) {
    return Math.abs(fromX - toX) + Math.abs(fromY - toY);
}

function getLetter(index) {
    const BIG_A_CHAR_CODE = "A".charCodeAt(0); // 65
    const BIG_Z_CHAR_CODE = "Z".charCodeAt(0); // 90
    const SMALL_A_CHAR_CODE = "a".charCodeAt(0); // 97
    const NUMBER_OF_LETTERS = BIG_Z_CHAR_CODE - BIG_A_CHAR_CODE + 1; // 26

    const base = index <= BIG_Z_CHAR_CODE - BIG_A_CHAR_CODE ? BIG_A_CHAR_CODE : SMALL_A_CHAR_CODE;

    return String.fromCharCode(base + index % NUMBER_OF_LETTERS);
}

function getBase(index) {
    return `${getLetter(index)}'`
    // return `${getLetter(index)}`
}

function isInfinite(map, letter) {
    return map[0].includes(letter)
        || map[map.length - 1].includes(letter)
        || map.flatMap(([firstLetterInRow]) => firstLetterInRow).includes(letter)
        || map.flatMap(row => row[row.length - 1]).includes(letter)
    ;
}