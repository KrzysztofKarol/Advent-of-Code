// 17289 - too low
// 18940 - too high
const fs = require("fs");
const data = fs.readFileSync("./data/24", "utf8");

class Army {

    constructor(name, groups) {
        this.name = name;
        this.groups = groups.map(group => new Group(this, group));
    }

    getAliveGroups() {
        return this.groups.filter(group => group.units !== 0);
    }

    getEffectivePower() {
        return this.groups.reduce((acc, group) => acc + group.effectivePower, 0);
    }

    getNumberOfUnits() {
        return this.groups.reduce((acc, group) => acc + group.units, 0);
    }

    getGroup(initiative) {
        return this.groups.find(group => group.initiative === initiative);
    }

    isAlive() {
        return this.groups.some(group => group.units !== 0);
    }

}

class Group {

    constructor(army, {units, hitPoints, weak, immune, fireDamage, fireType, initiative}) {
        this.army = army;
        this.units = units;
        this.hitPoints = hitPoints;
        this.weak = weak;
        this.immune = immune;
        this.fireDamage = fireDamage;
        this.fireType = fireType;
        this.initiative = initiative;
    }

    get effectivePower() {
        return this.units * this.fireDamage;
    }

    clearAttacks() {
        this.attacks = null;
        this.isAttackedBy = null;
    }

}

Group.prototype.log = function () {
    return {
        army: this.army.name,
        units: this.units,
        hitPoints: this.hitPoints,
        weak: this.weak,
        immune: this.immune,
        fireDamage: this.fireDamage,
        fireType: this.fireType,
        initiative: this.initiative,
        attacks: this.attacks,
        isAttackedBy: this.isAttackedBy,
        effectivePower: this.effectivePower,
    }
};

function run(input) {
    const armies = {
        immuneSystem: input.find(army => army.name === "Immune System"),
        infection: input.find(army => army.name === "Infection"),
    };

    const immuneSystem = new Army(armies.immuneSystem.name, armies.immuneSystem.groups);
    const infection = new Army(armies.infection.name, armies.infection.groups);


    while (immuneSystem.isAlive() && infection.isAlive()) {
        // target selection
        let groups = [
            ...immuneSystem.getAliveGroups(),
            ...infection.getAliveGroups(),
        ];

        console.log(`Immune System:
${immuneSystem.getAliveGroups().map(group => `Group ${getGroupIndex(group)} contains ${group.units} ${getUnitEnding(group.units)}`).join("\n")}
Infection:
${infection.getAliveGroups().map(group => `Group ${getGroupIndex(group)} contains ${group.units} ${getUnitEnding(group.units)}`).join("\n")}
`);


        groups.forEach(group => group.clearAttacks());

        groups.sort((group1, group2) => {
            if (group1.army.getEffectivePower() > group2.army.getEffectivePower()) {
                return -1;
            }

            if (group1.army.getEffectivePower() < group2.army.getEffectivePower()) {
                return 1;
            }

            if (group1.effectivePower > group2.effectivePower) {
                return -1;
            }

            if (group1.effectivePower < group2.effectivePower) {
                return 1;
            }

            return group2.initiative - group1.initiative;
        });

        groups.forEach(group => {
            const target = getTarget(group, groups);
            const targetInitiative = (target[0] || {}).initiative;
            if (targetInitiative) {
                group.attacks = targetInitiative;
                getGroup(targetInitiative).isAttackedBy = group.initiative;
            }
        });
        // groups.forEach(group => console.log(group.log()));
        console.log("");


        // attacking phase
        groups.sort((g1, g2) => g2.initiative - g1.initiative);


        groups.forEach(group => attack(group, getGroup(group.attacks)));

        // console.log("=".repeat(48));
        break;
    }

    console.log(`Immune System:
${immuneSystem.getNumberOfUnits() === 0 ? "No groups remain." : immuneSystem.getAliveGroups().map(group => `Group ${getGroupIndex(group)} contains ${group.units} ${getUnitEnding(group.units)}`).join("\n")}
Infection:
${infection.getNumberOfUnits() === 0 ? "No groups remain." : infection.getAliveGroups().map(group => `Group ${getGroupIndex(group)} contains ${group.units} ${getUnitEnding(group.units)}`).join("\n")}`);

    return immuneSystem.getNumberOfUnits() + infection.getNumberOfUnits();

    function getGroup(initiative) {
        return immuneSystem.getGroup(initiative) || infection.getGroup(initiative);
    }
}

function attack(attacker, defender) {
    if (defender === null || defender === undefined) {
        return;
    }

    const fireDamageAgainstDefender = getFireDamageAgainstDefender(attacker, defender);

    const possibleDeaths = Math.floor(fireDamageAgainstDefender / defender.hitPoints);
    const unitsBefore = defender.units;

    defender.units = Math.max(0, defender.units - possibleDeaths);

    const unitsAfter = defender.units;

    const actualDeaths = unitsBefore - unitsAfter;

    console.log(`${attacker.army.name} group ${getGroupIndex(attacker)} attacks defending group ${getGroupIndex(defender)}, killing ${actualDeaths} ${getUnitEnding(actualDeaths)}`);
}

function getGroupIndex(group) {
    return group.army.groups.findIndex(g => g.initiative === group.initiative) + 1;
}

function getFireDamageAgainstDefender(attacker, defender) {
    function getFireDamageAgainstDefenderPerUnit() {
        const {fireDamage, fireType} = attacker;

        if (defender.weak.includes(fireType)) {
            return fireDamage * 2;
        }

        if (defender.immune.includes(fireType)) {
            return 0;
        }

        return fireDamage;
    }

    return getFireDamageAgainstDefenderPerUnit() * attacker.units;
}

function getTarget(attacker, possibleTargets) {
    return possibleTargets
        .filter(pt => attacker.army !== pt.army && pt.isAttackedBy === null)
        .map(pt => ({
            ...pt,
            damageAgainstAttacker: getFireDamageAgainstDefender(attacker, pt),
        }))
        .map(pt => {
            console.log(`${attacker.army.name} group ${getGroupIndex(attacker)} would deal defending group ${getGroupIndex(pt)} ${pt.damageAgainstAttacker} damage`);
            return pt;
        })
        .sort((pt1, pt2) => {
            if (pt1.damageAgainstAttacker > pt2.damageAgainstAttacker) {
                return -1;
            }

            if (pt1.damageAgainstAttacker < pt2.damageAgainstAttacker) {
                return 1;
            }

            // TODO: This is ugly! Keep reference or make it functional
            pt1 = new Group(null, pt1);
            pt2 = new Group(null, pt2);
            if (pt1.effectivePower > pt2.effectivePower) {
                return -1;
            }

            if (pt1.effectivePower < pt2.effectivePower) {
                return 1;
            }

            return pt2.initiative - pt1.initiative;
        });
}

function prepareData(data) {
    return data
    // Split armies
        .split("\n\n")
        // Trim last, empty line
        .map(armyText => armyText.trim())
        .map(armyText => armyText.match(/([A-Za-z ]+):\n([\s\S]+)/))
        .map(([, name, allGroupsText]) => ({name, allGroupsText}))
        .map(({allGroupsText, ...rest}) => ({groupText: allGroupsText.split("\n"), ...rest}))
        .map(({groupText, ...rest}) => ({
            groups: groupText.map(gt => {
                let [, units, hitPoints, weakOrImmune, fireDamage, fireType, initiative] = gt.match(/(\d+) units each with (\d+) hit points (\(.*\) )?with an attack that does (\d+) ([a-z]+) damage at initiative (\d+)/)
                units = Number(units);
                hitPoints = Number(hitPoints);
                fireDamage = Number(fireDamage);
                initiative = Number(initiative);


                let immune = [];
                let weak = [];
                if (weakOrImmune) {
                    const [, , immunes, , , weaks] = weakOrImmune.match(/\((immune to (.+?))?(; )?(weak to (.+?))?\) /);
                    immune = immunes && immunes.split(", ") || [];
                    weak = weaks && weaks.split(", ") || [];
                }

                return {units, hitPoints, weak, immune, fireDamage, fireType, initiative};
            }),
            ...rest,
        }));
}

const result = run(prepareData(data));
console.log({result});

module.exports = {
    run,
    prepareData,
    getTarget,
};


function getUnitEnding(units) {
    return units === 1 ? "unit" : "units";
}