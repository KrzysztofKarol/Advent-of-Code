// 122871765 - too low

const fs = require("fs");
const data = fs.readFileSync("./data/23", "utf8");

function run(input) {
    // TODO: This is wrong implementation
    const inputWithInRange = input.map(({x, y, z}) => ({
        x,
        y,
        z,
        inRange: input.reduce((inRange, {x: xa, y: ya, z: za, range}) =>
                Math.abs(xa - x) + Math.abs(ya - y) + Math.abs(za - z) <= range ? ++inRange : inRange
            , 0),
    }));

    const maxInRange = Math.max(...inputWithInRange.map(({inRange}) => inRange));
    const nanobotsWithMaxInRange = inputWithInRange.filter(({inRange}) => inRange === maxInRange);

    console.log({nanobotsWithMaxInRange});
    if (nanobotsWithMaxInRange.length !== 1) {
        throw new Error("Implement nanobotsWithMaxInRange.length !== 1");
    }

    const {x, y, z} = nanobotsWithMaxInRange[0];

    return Math.abs(x) + Math.abs(y) + Math.abs(z);
}

function prepareData(data) {
    return data
        .split("\n")
        .filter(Boolean)
        .map(line => line.match(/^pos=<([\-\d]+),([\-\d]+),([\-\d]+)>, r=(\d+)$/)
            .map(Number)
        )
        .map(([_, x, y, z, range]) => ({x, y, z, range}));
}

const result = run(prepareData(data));
console.log({result});

module.exports = {
    run,
    prepareData,
};
