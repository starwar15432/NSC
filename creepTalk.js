require('global');

module.exports = {

    movingToSource: function (creep) {
        var say;
        switch (Game.time % 9) {
            case 0:
                say = ("I'm on");
                break;
            case 1:
                say = ('my way');
                break;
            case 2:
                say = ('from spawn');
                break;
            case 3:
                say = ('to source');
                break;
            case 4:
                say = ('this tick');
                break;
            case 5:
                say = ('uh-huh');
                break;
            case 6:
                say = ('uh-huh');
                break;
            case 7:
                say = ('uh-huh');
                break;
            case 8:
                say = ('uh-huh');
                break;
        }
        if (say != undefined) {
            creep.say(say, true);
        }
    },
    movingToSpawn: function (creep) {
        var say;
        switch (Game.time % 9) {
            case 0:
                say = ("I'm on");
                break;
            case 1:
                say = ('my way');
                break;
            case 2:
                say = ('from source');
                break;
            case 3:
                say = ('to spawn');
                break;
            case 4:
                say = ('this tick');
                break;
            case 5:
                say = ('uh-huh');
                break;
            case 6:
                say = ('uh-huh');
                break;
            case 7:
                say = ('uh-huh');
                break;
            case 8:
                say = ('uh-huh');
                break;
        }
        if (say != undefined) {
            creep.say(say, true);
        }
    },
    harvesting: function (creep) {
        var say;
        switch (Game.time % 18) {
            case 0:
                say = ("Aw I'm");
                break;
            case 1:
                say = ('a miner!');
                break;
            case 2:
                say = ('MINE MINE!');
                break;
            case 3:
                say = ('aw ya');
                break;
            case 4:
                say = ("it's");
                break;
            case 5:
                say = ('all I do');
                break;
            case 6:
                say = ('MINE MINE!');
                break;
            case 7:
                say = ("don't let");
                break;
            case 8:
                say = ('that');
                break;
            case 9:
                say = ('energy');
                break;
            case 10:
                say = ('waste in');
                break;
            case 11:
                say = ('the source');
                break;
            case 12:
                say = ('gotta');
                break;
            case 13:
                say = ('bring');
                break;
            case 14:
                say = ('that energy');
                break;
            case 15:
                say = ('and drop');
                break;
            case 16:
                say = ('it out');
                break;
            case 17:
                say = ('MINE MINE!');
                break;
        }
        if (say != undefined) {
            creep.say(say, true);
        }
    }
};