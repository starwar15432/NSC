require('global');

const roleHarvester = require ('role.harvester');
const roleCarrier = require ('role.carrier');
const roleDistributor = require ('role.distributor');
const roleUpgrader = require ('role.upgrader');
const roleBuilder = require ('role.builder');
const roleRepairer = require ('role.repairer');
const roleDefenceManager = require ('role.defenceManager');
const roleLandlord = require ('role.landlord');
const otherRoomCreep = require ('role.otherRoomCreep');
const energyThief = require ('role.energyThief');
const roleRemoteHarvester = require ('role.remoteHarvester');
const roleRemoteHauler = require ('role.remoteHauler');
const roleEnergyHelper = require ('role.energyOtherRoomHelper');
const roleMiner = require ('role.miner');
const roleMarketMover = require ('role.marketMover');
const roleGuard = require ('role.guard');
const roleSigner = require ('role.signer');
const roleCreepHarasser = require ('role.creepHarasser');
const rolespawnSmasher = require ('role.spawnSmasher');
const roleStructureDestroyer = require ('role.structureDestroyer');
const roleWallBreaker = require ('role.wallBreaker');
const roleWarHealer = require ('role.warHealer');
const roleTowerDrainer = require ('role.towerDrainer');

module.exports = {
    run: function (room, areWeUnderAttack, otherRoomCreepsRoomToGoToPos, remoteCreepFlags, energyThiefFlag, energyHelperFlag) {

        try {
            for (let name in Game.creeps) {
                let creep = Game.creeps[name];

                this.creepActions(room, creep, remoteCreepFlags, energyThiefFlag, energyHelperFlag, otherRoomCreepsRoomToGoToPos);

            }
        }
        catch (err) {
            if (err !== null && err !== undefined) {
                Game.notify("Creep Error: \n" + err + "\n " + err.stack);
                console.log("Creep Error: \n" + err + "\n" + err.stack);
            }
        }

    },

    creepActions: function (room, creep, remoteCreepFlags, energyThiefFlag, energyHelperFlag, roomToGoTo) {
        if (creep.memory.room == room.name && creep.spawning === false) {
            var energyOfTowers = this.getEnergyOfTower(room);
            if (!global[creep.name]) {
                global[creep.name] = {};
            }

            var getRole = function (creepName) {
                var creepNameAsArray = creepName.split('-');
                return creepNameAsArray[0];
            };

            switch (creep.memory.role) {
                case 'harvester':
                    roleHarvester.run(room, creep);
                    break;
                case 'carrier':
                    if (room.storage) {
                        var numberOfDistributors = _.sum(Game.creeps, (c) => c.memory.role == 'distributor' && c.memory.room == room.name);
                        if (numberOfDistributors <= 0) {
                            roleDistributor.run(room, creep, energyOfTowers);
                        }
                        else {
                            roleCarrier.run(room, creep);
                        }
                    }
                    else {
                        creep.memory.role = 'distributor';
                    }
                    break;
                case 'distributor':
                    roleDistributor.run(room, creep, energyOfTowers);
                    break;
                case 'upgrader':
                    roleUpgrader.run(room, creep);
                    break;
                case 'builder':
                    roleBuilder.run(room, creep);
                    break;
                case 'repairer':
                    roleRepairer.run(room, creep);
                    break;
                case 'defenceManager':
                    roleDefenceManager.run(room, creep, Memory.rooms[room].isUnderAttack);
                    break;
                case 'landlord':
                    roleLandlord.run(room, creep);
                    break;
                case 'otherRoomCreep':
                    if (roomToGoTo) {
                        otherRoomCreep.run(room, creep, roomToGoTo);
                    }
                    else {
                        creep.memory.role = 'upgrader';
                    }
                    break;
                case 'energyThief':
                    if (energyThiefFlag) {
                        if (Game.cpu.bucket > 1000) energyThief.run(room, creep, energyThiefFlag);
                    }
                    else {
                        creep.memory.role = 'carrier';
                    }
                    break;
                case 'remoteHarvester':
                    roleRemoteHarvester.run(room, creep, remoteCreepFlags);
                    break;
                case 'remoteHauler':
                    roleRemoteHauler.run(room, creep, remoteCreepFlags);
                    break;
                case 'energyHelper':
                    if (energyHelperFlag != undefined && energyHelperFlag.room != undefined) {
                        if (Game.cpu.bucket > 500) roleEnergyHelper.run(room, creep, energyHelperFlag);
                    }
                    else {
                        if (Game.cpu.bucket > 500) creep.memory.role = 'carrier';
                    }
                    break;
                case 'miner':
                    if (Game.cpu.bucket > 500) roleMiner.run(room, creep);
                    break;
                case 'marketMover':
                    if (Game.cpu.bucket > 2000) roleMarketMover.run(room, creep);
                    break;
                case 'guard':
                    roleGuard.run(room, creep);
                    break;
                case 'signer':
                    roleSigner.run(room, creep);
                    break;
                case 'creepHarasser':
                    roleCreepHarasser.run(room, creep);
                    break;
                case 'spawnSmasher':
                    rolespawnSmasher.run(room, creep);
                    break;
                case 'structureDestroyer':
                    roleStructureDestroyer.run(room, creep);
                    break;
                case 'wallBreaker':
                    roleWallBreaker.run(room, creep);
                    break;
                case 'warHealer':
                    roleWarHealer.run(room, creep);
                    break;
                case 'towerDrainer':
                    roleTowerDrainer.run(room, creep);
                    break;
                case '':
                    creep.say('ERROR!!!', true);
                    break;
                default:
                    creep.say('ERROR!!!', true);
                    console.log('Unknown Creep Role ' + creep.memory.role);
                    creep.memory.role = getRole(creep.name);
                    break;
            }

        }
    },

    getEnergyOfTower: function (room) {
        var towers = room.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        var allEnergy = [];

        for (let tower of towers) {
            allEnergy.push(tower.energy);
        }
        return _.min(allEnergy) + 1;
    }
};
