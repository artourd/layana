/**
 * 
 * @returns {gameLayana}
 */
function Game(){
    this.tic = 0;
    this.name = 'Layana';
    this.keys = [['wood', [3, -4]], ['wood', [2, -5]], ['gold', [3, -3]]];
    
    this.map = [];
    
    //1-t-cl,2-r-cl,3-tr-cl,4-t-op,5-r-op,6-tr-op,7-t-br,8-r-br,9-tr-br
    this.doors = [['wood', 1, [3, -4]], ['wood', 2, [2, -5]], ['gold', 3, [3, -3]]];
    this.lifes = [['little', [4, -3]], ['little', [2, -3]], ['normal', [1, -5]], ];
    this.bufs = [['armor', [4, -2]], ['damage', [2, -2]], ['invis', [1, -4]], ['immort', [1, -4]] ];
    this.tools = [['hammer', [5, -6] ], ['shield', [5, -5]], ['axe', [5, -2]], ];
    this.weapon = [['fire', [5, -6] ], ['arrow', [5, -5]], ['light', [5, -2]], ];
    
    this.monsters = [];
    this.fireballs = [];
    
    this.hero = null;
    this.lab = null;
    
    this.paused = 0;
    this.liveSpeed = 100;
    this.inc = 0;    
    this.genId = function(){
        return ++this.inc;
    };    
    this.live = function(){
        game.tic++;
        if (!game.paused){
            setTimeout(function(){
                //monsters
                if (game.monsters) $.each(game.monsters, function(index, monster) {
                    if (monster) {
                        monster.scripting(12);

                        //eating hero
                        if ((monster.pos[0] == game.hero.pos[0]) && (monster.pos[1] == game.hero.pos[1])) {
                            game.hero.hurt();
                        } 
                    }

                });

                //fires
                
                if (game.fireballs) $.each(game.fireballs, function(index, fireBall) {
                    
                    if (fireBall) {
                        fireBall.move();

                        //hero killed by projectile
                        if (game.hero.isLive() && (fireBall.pos[0] == game.hero.pos[0]) && (fireBall.pos[1] == game.hero.pos[1])) {
                            game.hero.hurt();
                        }

                        //hero kill monster
                        $.each(game.monsters, function(index, monster) {                
                            if (monster && (fireBall.pos[0] == monster.pos[0]) && (fireBall.pos[1] == monster.pos[1])) {
                                if (fireBall.sender == 'hero'){
                                    game.hero.addXP(monster.xp);
                                }                    
                                monster.hurt();
                            }
                        });
                    }
                });          
                game.live();
            }, game.liveSpeed);
        }
    }
    this.pause = function(){
        if (this.paused){
            this.paused = 0;
            this.live();
        } else {
            this.paused = 1;
        }
    };    
    this.init = function(){
        this.lab = new Labyrinth();
        var quad = this.lab.quad;
        this.hero = new Hero();    
        $.each(this.lab.monsters, function(index, monster) { 
            var mon = new Monster(monster[0], monster[1]);
            game.monsters[mon.id] = mon;
        });
        this.live();
    };
}

