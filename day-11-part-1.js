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

    console.log({board});
}

// const result = run(6392);
// console.log({result});

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
