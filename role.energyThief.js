require('global');
require('prototype.creepSpeech')();

module.exports = {
    run: function (room, creep, energyThiefFlag) {
        if (energyThiefFlag) {

            if (creep.memory.working == true && _.sum(creep.carry) == 0) {
                creep.memory.working = false;
            }
            else if (creep.memory.working == false && _.sum(creep.carry) == creep.carryCapacity) {
                creep.memory.working = true;
            }

            if (creep.memory.working == true) {
                if (creep.pos.roomName != room.name) {
                    creep.moveTo(room.storage, {reusePath: 20});
                }
                else {
                    var storage = room.storage;
                    if (_.sum(storage.store) < storage.storeCapacity) {
                        for (let resourceType in creep.carry) {
                            if (creep.transfer(storage, resourceType) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage, {reusePath: 19});
                            }
                        }
                    }
                    else {
                        console.log('Storage Full In Room ' + room.name);
                    }
                }
            }
            else {
                if (creep.pos.roomName != energyThiefFlag.pos.roomName) {
                    creep.moveTo(energyThiefFlag, {reusePath: 20});
                }
                else {
                    var storageInThisRoom = energyThiefFlag.room.storage;
                    if (_.sum(storageInThisRoom.store) < storageInThisRoom.storeCapacity) {
                        for (let resourceType in storageInThisRoom.store) {
                            if (creep.withdraw(storageInThisRoom, resourceType) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storageInThisRoom, {reusePath: 19});
                            }
                        }
                    }
                    else {
                        energyThiefFlag.remove();
                    }
                }
            }
        }
    }
};