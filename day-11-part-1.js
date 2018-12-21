const length = 300;
const board = Array.from({length}, () =>
    Array.from({length}),
);

function get(x, y) {
    return board[y - 1][x - 1];
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

    for (let x = 1; x <= length - 2; x++) {
        for (let y = 1; y <= length - 2; y++) {
            const sum = [
                get(x, y), get(x + 1, y), get(x + 2, y),
                get(x, y + 1), get(x + 1, y + 1), get(x + 2, y + 1),
                get(x, y + 2), get(x + 1, y + 2), get(x + 2, y + 2),
            ].reduce((acc, curr) => acc + curr);

            if (sum > max) {
                max = sum;
                maxX = x;
                maxY = y;
            }
        }
    }

    return `${maxX},${maxY}`;
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
