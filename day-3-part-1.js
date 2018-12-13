const fs = require("fs");

const data = fs.readFileSync("./data/3", "utf8");

function getNumberOfOverlaps(input) {
    // This is ugly but works for 1000x1000
    const EMPTY = ".";
    const OVERLAP = "X";
    const length = 1000;
    const fabric = Array.from({length},
        () => Array.from({length}, () => EMPTY),
    );
    input.forEach(({id, top, left, width, height}) => {
        const display = id % 10;

        for (let y = top; y < top + height; y++) {
            for (let x = left; x < left + width; x++) {
                if (fabric[x][y] === EMPTY) {
                    fabric[x][y] = display;
                } else {
                    fabric[x][y] = OVERLAP;
                }
            }
        }
    });

    // console.log(fabric.map(line => line.join("")));

    return fabric.flat().filter(sign => sign === OVERLAP).length;
}

function prepareData(data) {
    return data.split("\n")
    // Omit last empty line
        .filter(Boolean)
        .map(line => {
            const [, id, left, top, width, height] = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/.exec(line).map(Number);

            return {id, left, top, width, height};
        })
}

const input = prepareData(data);
const result = getNumberOfOverlaps(input);
console.log({result});

module.exports = {
    getNumberOfOverlaps: run,
    prepareData,
};
