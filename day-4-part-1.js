const fs = require("fs");

const data = fs.readFileSync("./data/4", "utf8");

const FALLS_ASLEEP = "falls asleep";
const WAKES_UP = "wakes up";

function run(input) {
    const guards = input.reduce((acc, {guardId, time, comment}, i) => {
        const [, minute] = time.split(":").map(Number);

        const guard = acc[guardId] || {};

        if (guard.sleeps === undefined) {
            guard.sleeps = Array.from({length: 60}, () => 0);
        }

        if (comment === FALLS_ASLEEP) {
            // For debug purpose
            if (guard.feltAsleepAt !== undefined && guard.feltAsleepAt !== null) {
                throw new Error(`${i}. feltAsleepAt should be null for guard #${guardId}. guard.feltAsleepAt: ${guard.feltAsleepAt}`);
            }

            guard.feltAsleepAt = minute;
        } else /* WAKES_UP */ {
            for (let m = guard.feltAsleepAt; m < minute; m++) {
                guard.sleeps[m]++;
            }

            guard.feltAsleepAt = null;
        }

        acc[guardId] = guard;
        return acc;
    }, {});

    const guardsWithMax = Object.entries(guards)
        .map(([guardId, guard]) =>
            [guardId, {...guard, sum: guard.sleeps.reduce((acc, curr) => acc + curr)}],
        );
    const max = Math.max(...guardsWithMax.map(([_, guard]) => guard.sum));

    const guardObjWithMax = guardsWithMax.find(([guardId, guard]) => guard.sum = max);
    const [guardId, guard] = guardObjWithMax;

    const maxInMinute = Math.max(...guard.sleeps);
    const maxAtMinute = guard.sleeps.findIndex(sleep => sleep === maxInMinute);

    draw(guardsWithMax);

    console.log({guardId, maxAtMinute});
    return Number(guardId) * maxAtMinute;
}

function prepareData(data) {
    // Ugly but simple
    let guardId = null;

    return data.split("\n")
    // Omit last empty line
        .filter(line => line !== "")
        .map(line => {
            const [, date, time, comment] = /^\[(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})] (.+)$/.exec(line);

            return {date, time, comment};
        })
        .sort(({date: date1, time: time1}, {date: date2, time: time2}) =>
            date1 > date2
                ? 1
                : (
                    date1 < date2
                        ? -1
                        : (
                            time1 > time2
                                ? 1
                                : time1 < time2 ? -1 : 0
                        )
                )
        )
        // .map((line, i) => console.log(i + 1, line))
        .map(({comment, ...rest}) => {
            if (comment.startsWith("Guard")) {
                ([, guardId] = /Guard #(\d+) begins shift/.exec(comment));
            }

            return {comment, guardId, ...rest};
        })
        .filter(({comment}) => comment === FALLS_ASLEEP || comment === WAKES_UP)
}


const input = prepareData(data);
const result = run(input);
console.log({result});

module.exports = {
    run,
    prepareData,
};

function draw(guards) {
    console.log(JSON.stringify(guards));
}