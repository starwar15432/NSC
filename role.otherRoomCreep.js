require('global');

var type1 = require ('role.type1'); //RCL upgrader
var type2 = require ('role.type2'); //builder
var type3 = require ('role.type3'); //repairer
var type4 = require ('role.type4'); //wallRepairer and tower replenisher

module.exports = {
    run: function (room, creep, roomToGoTo) {

        if (roomToGoTo) {

            if (creep.room.name != roomToGoTo) {
                var roomPos = new RoomPosition(26, 20, roomToGoTo);
                creep.moveTo(roomPos);
            }
            else {
                if (!creep.memory.type) {
                    if (_.sum(Game.creeps, (c) => c.memory.type == 'type1') < 1) {
                        creep.memory.type = 'type1';
                    }
                    else if (_.sum(Game.creeps, (c) => c.memory.type == 'type2') < 4) {
                        creep.memory.type = 'type2';
                    }
                    if (_.sum(Game.creeps, (c) => c.memory.type == 'type3') < 1) {
                        creep.memory.type = 'type3';
                    }
                    if (_.sum(Game.creeps, (c) => c.memory.type == 'type4') < 0) {
                        creep.memory.type = 'type4';
                    }
                    else {
                        creep.memory.type = 'type2';
                    }
                }
                else {

                    switch (creep.memory.type) {
                        case 'type1':
                            type1.run(creep);
                            break;
                        case 'type2':
                            type2.run(creep);
                            break;
                        case 'type3':
                            type3.run(creep);
                            break;
                        case 'type4':
                            type4.run(creep);
                            break;
                        default:
                            creep.say('ERR TYPE');
                    }

                }
            }

        }
    }
};