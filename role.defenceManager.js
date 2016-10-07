require('global');
require('prototype.creep')();

module.exports = {
    run: function (room, creep, isUnderAttack) {
        creep.say('defend');
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var towerLowerThan = room.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER && s.energy < 210});
            if (isUnderAttack === true || towerLowerThan.length > 0) {
                var tower = this.getTowerToRefill(room, creep);
                if (tower) {
                    if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower);
                    }
                }
            }
            else {
                var defenceToRepair = this.findDefence(room);

                if (defenceToRepair) {
                    if (creep.repair(defenceToRepair) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(defenceToRepair);
                    }
                }
            }
        }
        else {

            var storage = room.storage;

            if (storage && storage.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {reusePath: 10})
                }
            }
            else {
                var container = creep.findContainer(room);
                if (container) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container)
                    }
                }
            }
        }
    },

    findDefence: function (room) {
        var structures = room.find(FIND_STRUCTURES,
            {filter: (s) => (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL) && s.hits < s.hitsMax});

        var structure = _.min(structures, 'hits');

        return structure;
    },

    getTowerToRefill: function (room, creep) {
        var towers = room.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});

        if (towers.length > 0) {

            var tower = _.min(towers, 'energy');

            if (tower) {
                return tower;
            }
            else {
                return undefined;
            }

        }
        else {
            return undefined;
        }

    }
};