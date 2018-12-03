const fs = require("fs");

const data = fs.readFileSync("./data/3", "utf8");

function getUniqueId(input) {
    // This is ugly but works for 1000x1000
    const EMPTY = ".";
    const OVERLAP = "X";
    const length = 1000;
    const fabric = Array.from({length},
        () => Array.from({length}, () => EMPTY),
    );
    input.forEach(({id, top, left, width, height}) => {
        for (let y = top; y < top + height; y++) {
            for (let x = left; x < left + width; x++) {
                if (fabric[x][y] === EMPTY) {
                    fabric[x][y] = id;
                } else {
                    fabric[x][y] = OVERLAP;
                }
            }
        }
    });
    const areas = input.map(({id, width, height}) => ({id, area: width * height}));

    // noinspection CommaExpressionJS
    const uniqueAreas = fabric
        .flat()
        .filter(char => char !== EMPTY && char !== OVERLAP)
        .reduce((acc, id) => ((acc[id] === undefined ? acc[id] = 1 : acc[id]++), acc), {});

    return areas.find(({id, area}) => uniqueAreas[id] === area).id;
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
const result = getUniqueId(input);
console.log({result});

module.exports = {
    getUniqueId,
    prepareData,
};
