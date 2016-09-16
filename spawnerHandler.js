require('prototype.spawn')();

module.exports = {
    run: function (room) {

        var spawn = room.find(FIND_MY_SPAWNS, {filter: (s) => s.spawning != true})[0];

        if (spawn) {

            var minimumNumberOfHarvesters = 2;
            var minimumNumberOfCarriers = 2;
            var minimumNumberOfDistributors = 2;
            var minimumNumberOfUpgraders = 3;
            var minimumNumberOfBuilders = 1;
            var minimumNumberOfWallRepairers = 1;

            var numberOfSources = room.find(FIND_SOURCES);
            var amountOfBigHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.room == room
            && c.getActiveBodyParts(WORK) >= 5);

            if (amountOfBigHarvesters >= numberOfSources) {
                minimumNumberOfHarvesters = 2;
            }

            var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.room == room);
            var numberOfCarriers = _.sum(Game.creeps, (c) => c.memory.role == 'carrier' && c.memory.room == room);
            var numberOfDistributors = _.sum(Game.creeps, (c) => c.memory.role == 'distributor' && c.memory.room == room);
            var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.room == room);
            var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.room == room);
            var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' && c.memory.room == room);

            var energy = spawn.room.energyAvailable;
            var amountToSave = 0;
            var name = undefined;

            if ((numberOfHarvesters >= minimumNumberOfHarvesters)
                && (numberOfDistributors >= minimumNumberOfDistributors)
                && (numberOfCarriers >= minimumNumberOfCarriers)) {
                amountToSave = 0.1;//in percent
            }


            if (spawn.energy >= 300 && (energy - (energy * amountToSave)) >= 300) {

                if (numberOfHarvesters < minimumNumberOfHarvesters) {
                    name = spawn.createCustomCreep(room, energy, 'harvester', amountToSave);
                }
                else if (numberOfDistributors < minimumNumberOfDistributors) {
                    name = spawn.createCustomCreep(room, energy, 'distributor', amountToSave);
                }
                else if (numberOfCarriers < minimumNumberOfCarriers) {
                    name = spawn.createCustomCreep(room, energy, 'carrier', amountToSave);
                }
                else if (numberOfUpgraders < minimumNumberOfUpgraders) {
                    name = spawn.createCustomCreep(room, energy, 'upgrader', amountToSave);
                }
                else if (numberOfBuilders < minimumNumberOfBuilders) {
                    name = spawn.createCustomCreep(room, energy, 'builder', amountToSave);
                }
                else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
                    name = spawn.createCustomCreep(room, energy, 'wallRepairer', amountToSave);
                }

                if (name != undefined && -4 && -6) {
                    console.log("Creating Creep " + name);
                }

            }


            if (numberOfHarvesters <= 0) {
                Game.notify("No harvesters in room " + room);
                console.log("No harvesters in room " + room);
            }
            else if (numberOfDistributors <= 0) {
                Game.notify("No distributors in room " + room);
                console.log("No distributors in room " + room);
            }
        }

    }
};