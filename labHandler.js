require('global');

module.exports = {

    run: function (room) {

        if (!Memory.rooms[room].labs) {
            Memory.rooms[room].labs = {};
        }

        var labs = room.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LAB});
        global[room.name].resourcesAvailable = [];

        for (let lab of labs) {
            if (!Memory.rooms[room].labs[lab.id]) {
                Memory.rooms[room].labs[lab.id] = {};
                Memory.rooms[room].labs[lab.id].type = 0; // 0 is a lab that is used
            }

            if (!lab.cooldown > 0) {
                if (Memory.rooms[room].labs[lab.id].type == 1) { // a lab that does the reactions
                    if (lab.mineralAmount < lab.mineralCapacity - 5) {
                        if (global[room.name].resourcesAvailable.length >= 2) {
                            var resourcesAvailableGlobal = global[room.name].resourcesAvailable;
                            lab.runReaction(resourcesAvailableGlobal[0], resourcesAvailableGlobal[1]);
                        }
                    }
                }
                else {
                    if (lab.mineralAmount > 5) {
                        if (lab.mineralType) {
                            global[room.name].resourcesAvailable.push = lab.id;
                        }
                    }
                }
            }
        }
    }
};