const fs = require("fs");
const data = fs.readFileSync("./data/22", "utf8");

const getRegionType = function (depth, [targetX, targetY], [x, y]) {
    const getGeologicIndex = (function () {
        const geologicMap = [];

        function get([x, y]) {
            if (geologicMap[y] === undefined) {
                return undefined;
            }

            return geologicMap[y][x];
        }

        function set([x, y], value) {
            if (geologicMap[y] === undefined) {
                geologicMap[y] = [];
            }

            geologicMap[y][x] = value;
        }

        function saveToCacheAndReturn([x, y], value) {
            set([x, y], value);

            return value;
        }

        return function ([x, y]) {
            const fromCache = get([x, y]);

            if (fromCache !== undefined) {
                return fromCache;
            }

            // The region at 0,0 (the mouth of the cave) has a geologic index of 0.
            if (x === 0 && y === 0) {
                return saveToCacheAndReturn([x, y], 0);
            }

            // The region at the coordinates of the target has a geologic index of 0.
            if (x === targetX && y === targetY) {
                return saveToCacheAndReturn([x, y], 0);
            }

            // If the region's Y coordinate is 0, the geologic index is its X coordinate times 16807.
            if (y === 0) {
                return saveToCacheAndReturn([x, y], x * 16807);
            }

            // If the region's X coordinate is 0, the geologic index is its Y coordinate times 48271.
            if (x === 0) {
                return saveToCacheAndReturn([x, y], y * 48271);
            }

            // Otherwise, the region's geologic index is the result of multiplying the erosion levels of the regions at X-1,Y and X,Y-1.
            return saveToCacheAndReturn([x, y], getErosionLevel([x - 1, y]) * getErosionLevel([x, y - 1]));
        }
    })();

    const getErosionLevel = function ([x, y]) {
        // A region's erosion level is its geologic index plus the cave system's depth, all modulo 20183.
        return (getGeologicIndex([x, y]) + depth) % 20183;
    };

    return getErosionLevel([x, y]) % 3;
};


function run(input) {
    const {depth, target} = input;
    const [targetX, targetY] = target;

    const getRegionTypeForProvidedDepthAndTarget = getRegionType.bind(null, depth, target);

    let risk = 0;
    for (let x = 0; x <= targetX; x++) {
        for (let y = 0; y <= targetY; y++) {
            risk += getRegionTypeForProvidedDepthAndTarget([x, y]);
        }
        console.log({x});
    }

    return risk;
}

function prepareData(data) {
    const [, depth, targetX, targetY] = data.match(/^depth: (\d+)\ntarget: (\d+),(\d+)\n/)
        .map(Number);

    return {
        depth,
        target: [targetX, targetY],
    };
}

const result = run(prepareData(data));
console.log({result});

module.exports = {
    run,
    prepareData,
};

