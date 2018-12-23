const fs = require("fs");
const data = fs.readFileSync("./data/23", "utf8");

function run(input) {
    const maxRange = Math.max(...input.map(({range}) => range));
    const strongestNanobot = input.find(({range}) => range === maxRange);

    const {x: x0, y: y0, z: z0, range: r0} = strongestNanobot;
    return input
        .filter(({x, y, z}) => Math.abs(x - x0) + Math.abs(y - y0) + Math.abs(z - z0) <= r0)
        .length;
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

