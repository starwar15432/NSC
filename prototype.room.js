require('global');

module.exports = function () {
    Room.prototype.findAttackFlag =
        function (room) {

            var rallyFlag = _.filter(Game.flags, f => f.memory.type == 'rallyFlag' && f.memory.roomsToAttackFrom.includes(room) && f.memory.whenToAttack && f.memory.whereToAttack && f.memory.armySize)[0];

            if (rallyFlag) {
                return rallyFlag;
            }
            else {
                return undefined;
            }

        },

        Room.prototype.updateConstructionTargets =
            function () {

                /*
                 *		RED         container
                 *		PURPLE      extension
                 *		BLUE        link
                 *		CYAN		rampart
                 *		GREEN		extractor
                 *		YELLOW		spawn
                 *		ORANGE		storage
                 *		BROWN		tower
                 *		GREY		wall
                 *		WHITE		road
                 */

                if (global.rooms == undefined || global.rooms[this.name] == undefined) {
                    console.log(this.name + ': Setting Global.rooms');
                    _.set(global, ['rooms', this.name, 'controllerLevel'], undefined);
                }

                if (global.rooms[this.name].controllerLevel != this.controller.level) {
                    _.set(global, ['rooms', this.name, 'constructionTargets'], _.transform(CONTROLLER_STRUCTURES, (r, v, k) => r[k] = v[this.controller.level]));
                    _.set(global, ['rooms', this.name, 'controllerLevel'], this.controller.level);
                    console.log(this.name + ': global.rooms', JSON.stringify(global.rooms));
                }

                console.log(this.name + ': Check room');
                let sites = this.find(FIND_CONSTRUCTION_SITES);
                let existing = {};
                if (sites.length == 0) {
                    for (let flagName in Game.flags) {
                        let flag = Game.flags[flagName];
                        if (flag.color == COLOR_WHITE && flag.pos.roomName == this.name) {
                            let object = undefined;
                            switch (flag.secondaryColor) {
                                case COLOR_GREY:
                                    object = STRUCTURE_WALL;
                                    break;
                                case COLOR_CYAN:
                                    object = STRUCTURE_RAMPART;
                                    break;
                                case COLOR_BROWN:
                                    object = STRUCTURE_TOWER;
                                    break;
                                case COLOR_RED:
                                    object = STRUCTURE_CONTAINER;
                                    break;
                                case COLOR_PURPLE:
                                    object = STRUCTURE_EXTENSION;
                                    break;
                                case COLOR_BLUE:
                                    object = STRUCTURE_LINK;
                                    break;
                                case COLOR_GREEN:
                                    object = STRUCTURE_EXTRACTOR;
                                    break;
                                case COLOR_YELLOW:
                                    object = STRUCTURE_SPAWN;
                                    break;
                                case COLOR_ORANGE:
                                    object = STRUCTURE_STORAGE;
                                    break;
                                case COLOR_WHITE:
                                    object = STRUCTURE_ROAD;
                                    break;
                                default:
                                    console.log('Color error: ' + flag.secondaryColor);
                            }
                            if (object != undefined) {
                                let atPos = flag.pos.look();
                                atPos = atPos.filter(o => o.type == LOOK_STRUCTURES && o.structure.structureType == object);
                                if (existing[object] == undefined) {
                                    existing[object] = this.find(FIND_STRUCTURES, {filter: o => o.structureType == object});
                                }
                                console.log(this.name + `: check ${object} : ${atPos.length} vs ${global.rooms[this.name].constructionTargets[object]} vs ${existing[object].length}`);
                                if (atPos.length == 0 &&
                                    global.rooms[this.name].constructionTargets[object] != undefined &&
                                    global.rooms[this.name].constructionTargets[object] > existing[object].length) {
                                    let res = flag.room.createConstructionSite(flag.pos, object);
                                    if (res != 0) {
                                        console.log(this.name + `: Failed to create construction site at ${flag.name}: ${res}`);
                                    } else {
                                        console.log(this.name + `: Created construction site at ${flag.name}: ${res}`);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
//        console.log(`Check construction in ${this.name}`);
                this.memory.constructionTargets = _.map(sites, 'id');
            }
};