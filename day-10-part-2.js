const fs = require("fs");
const data = fs.readFileSync("./data/10", "utf8");

function run(input) {
    let points = input;
    let i = 1;
    while (i < 20000) {
        points = points.map(({posX, posY, velX, velY}) => ({posX: posX + velX, posY: posY + velY, velX, velY}));


        const minX = Math.min(...points.map(({posX}) => posX));
        const minY = Math.min(...points.map(({posY}) => posY));

        const maxX = Math.max(...points.map(({posX}) => posX));
        const maxY = Math.max(...points.map(({posY}) => posY));

        const diff = Math.abs(maxX - minX) + Math.abs(maxY - minY);

        if (diff === 70) {
            // console.log({input, minX, minY, maxX, maxY});

            const diffY = maxY - minY;
            const diffX = maxX - minX;
            const board = Array.from({length: diffY + 1}, () =>
                Array.from({length: diffX + 1}, () => "."),
            );

            points.forEach(({posX, posY}) => {
                board[posY - minY][posX - minX] = "#";
            });

            // console.log(board.map(line => line.join("")).join("\n"));
            console.log({i});

            break;
        }

        i++;
    }
}

function prepareData(data) {
    return data.split("\n")
    // Omit last empty line
        .filter(Boolean)
        .map(line => line.match(/position=<\s*([\-\d]+),\s*([\-\d]+)> velocity=<\s*([\-\d]+),\s*([\-\d]+)>/)
            .map(Number)
        )
        .map(([, posX, posY, velX, velY]) => ({posX, posY, velX, velY}));
}

const result = run(prepareData(data));
console.log({result});

module.exports = {
    run,
    prepareData,
};
