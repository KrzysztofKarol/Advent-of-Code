const length = 300;
const board = Array.from({length}, () =>
    Array.from({length}),
);

function get(x, y) {
    // try {
    return board[y - 1][x - 1];
    // } catch (e) {
    //     console.error({x, y});
    //     throw new Error(e);
    // }
}

function set(x, y, value) {
    return board[y - 1][x - 1] = value;
}

function run(input) {
    for (let x = 1; x <= length; x++) {
        for (let y = 1; y <= length; y++) {
            const powerLevel = getPowerLevel(input, x, y);

            set(x, y, powerLevel);
        }
    }

    let max = Number.MIN_SAFE_INTEGER;
    let maxX;
    let maxY;
    let maxSize;

    for (let size = 1; size <= length; size++) {
        for (let x = 1; x <= length - size + 1; x++) {
            for (let y = 1; y <= length - size + 1; y++) {
                let sum = 0;

                for (let incX = 0; incX <= size - 1; incX++) {
                    for (let incY = 0; incY <= size - 1; incY++) {
                        sum += get(x + incX, y + incY);
                    }
                }

                if (sum > max) {
                    max = sum;
                    maxX = x;
                    maxY = y;
                    maxSize = size;
                    console.log({x, y, size, max});
                }
            }
        }
        console.log({size});
    }

    return `${maxX},${maxY},${maxSize}`;
}

const result = run(6392);
console.log({result});

module.exports = {
    run,
    getPowerLevel,
};

function getPowerLevel(input, x, y) {
    const rackId = x + 10;
    let powerLevel = rackId * y;
    powerLevel += input;
    powerLevel *= rackId;
    powerLevel = Math.floor(powerLevel / 100) % 10;
    powerLevel -= 5;

    return powerLevel;
}
