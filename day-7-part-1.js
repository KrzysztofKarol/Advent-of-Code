const fs = require("fs");
const data = fs.readFileSync("./data/7", "utf8");

const LETTER = Symbol();
const PARENTS = Symbol();
const CHILDREN = Symbol();
const AVAILABLE = Symbol();

class Node {

    constructor(letter) {
        this[LETTER] = letter;
        this[CHILDREN] = [];
        this[PARENTS] = [];
        this[AVAILABLE] = false;
    }

    get letter() {
        return this[LETTER];
    }

    get available() {
        return this[AVAILABLE];
    }

    set available(value) {
        this[AVAILABLE] = value;
    }

    addChild(child) {
        this[CHILDREN].push(child);
    }

    getChildren() {
        return [...this[CHILDREN]].sort((child1, child2) => child1.letter > child2.letter ? 1 : -1);
    }

    addParent(parent) {
        this[PARENTS].push(parent);
    }

    getParents() {
        return [...this[PARENTS]].sort((parent1, parent2) => parent1.letter > parent2.letter ? 1 : -1);
    }

    shouldBeAvailable() {
        return this.getParents().every(parent => parent.available);
    }

}

Node.prototype.toJSON = function () {
    return {
        letter: this.letter,
        children: this.getChildren(),
        // parents: this.getParents().map(parent => parent.letter),
    };
};

function run(input) {
    const nodes = input.reduce((acc, [parentLetter, childLetter]) => {
        const parent = acc[parentLetter] || new Node(parentLetter);
        const child = acc[childLetter] || new Node(childLetter);

        parent.addChild(child);
        child.addParent(parent);

        acc[parentLetter] = parent;
        acc[childLetter] = child;
        return acc;
    }, {});

    // fs.writeFileSync("out.json", JSON.stringify(root, null, 4));

    let node;
    let path = "";
    while ((node = getFirstAvailable(nodes, path)) !== undefined) {
        // console.log(1, getFirstAvailable(nodes, path).letter);

        const {letter} = node;

        if (!path.includes(letter)) {
            path += node.letter;
        }

        // console.log("av", getFirstAvailable(nodes, path).letter)

        node.available = true;
    }

    console.log({path});
    // console.log(JSON.stringify(nodes, null, 4));
    return path;
}


function prepareData(data) {
    return data.split("\n")
    // Omit last empty line
        .filter(Boolean)
        .map(line => line.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin\./))
        .map(([, parent, child]) => [parent, child]);
}

const result = run(prepareData(data));
console.log({result});

module.exports = {
    run,
    prepareData,
};

function getFirstAvailable(nodes, path) {
    const allAvailable = Object.values(nodes)
        .filter(node => (node.getParents().length === 0 || node.shouldBeAvailable()) && !path.includes(node.letter))
        .sort((node1, node2) => node1.letter > node2.letter ? 1 : -1);

    return allAvailable[0];
}
