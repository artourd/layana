function Hero() {
    this.id = game.genId();
    this.name = 'layana';
    this.life = 5;
    this.mana = 3;
    this.level = 1;
    this.xp = 0;    
    this.level_xp = [0, 100, 300, 500, 800, 1300, 2100, 3400, 5500, 8900, 99999];
    this.speed = 5;
    this.step = 0;    
    this.direct = 'down';
    this.pos = [0, 0];
    this.keys = 0;
    this.keysSpec = [];
    this.fireBalls = 999;
    this.weapon = 0;
    this.armor = 0;
    this.bufs = [];
    this.items = [];
    this.blim = 0;
    this.god = 0;
    this.ticMove = 2;
    this.ticFire = 0;
    this.prevDirect = null;
    this.spriteNum = 4;
    this.sprite = 0;
    this.cssPos = function(){
        var lpos = game.lab.align[0] + this.pos[0];
        var tpos = game.lab.align[1] - this.pos[1];
        return [lpos, tpos];
    }
    this.init = function(){
        var cssPos = this.cssPos();        
        $('<div id="pers'+this.id+'" class="pers down"></div>').css('left', cssPos[0]).css('top', cssPos[1]).appendTo('.area');
    }
    this.move = function(direct) {
        if (this.ticMove + 0 > game.tic){
            return false;
        }
        this.ticMove = game.tic;
        
        if (direct && (this.direct != 'dead') )
            this.direct = direct;
        
        if (this.direct !== 'dead'){
            var coord = game.lab.directToCoord(this.direct);

            var can = game.lab.canChangePos(coord[0], coord[1], this.pos);
            if (can) {
                this.pos = [this.pos[0] / 1 + coord[0] * this.speed, this.pos[1] / 1 + coord[1] * this.speed];
            }
            this.step++;
        }
        
        var cssPos = this.cssPos();
        
        $('#pers'+this.id).css('left', cssPos[0]).css('top', cssPos[1])
                .removeClass('s1').removeClass('s2').removeClass('s3')
                .removeClass('up').removeClass('down').removeClass('left').removeClass('right')
                .addClass(this.direct);
        
        this.sprite++;
        if (this.sprite >= this.spriteNum) this.sprite = 0;
        if (this.sprite){
            $('#pers'+this.id).addClass('s'+this.sprite);
        }
        
    };
    this.fire = function() {
        if (this.ticFire + 0 > game.tic){
            return false;
        }
        this.ticFire = game.tic;
        
        if ( (this.direct != 'dead') && this.fireBalls ){
            this.fireBalls--;
            new FireBall(this.direct, this.pos, 'fire', 'hero');
        }
    };
    this.addXP = function(xp) {
        this.xp += xp;
        if (this.xp > this.level_xp[this.level + 1]) {
            this.lvlUp();
        }
    };
    this.hurt = function(pts){
        if (!pts) pts = 1;
        this.life = this.life - 1;
        if (this.life < 1){
            this.dead();
        }
    };
    this.dead = function(){
        this.move('dead');
    };
    this.isLive = function(){
        return (this.direct != 'dead');
    };
    this.lvlUp = function(){
        this.level++;
        var pid = '#pers'+this.id;
        $(pid).animate({opacity: 0.5, height: "toggle"}, 300, function() {
            $(pid).animate({opacity: 1, height: "toggle"}, 300);
        });
    };
    
    //bufs
    this.invis = function(){
        var pid = '#pers'+this.id;
        $(pid).animate({opacity: 0.3}, 300, function() {
            setTimeout(function(){
                $(pid).animate({opacity: 1}, 300);
            }, 10000);
        });
    };
    this.speedUp = function(){
        var pid = '#pers'+this.id;
        this.speed = this.speed * 2;
        $(pid).animate({opacity: 0.8}, 300, function() {
            setTimeout(function(){
                $(pid).animate({opacity: 1}, 300);
                game.hero.speed = game.hero.speed/2;
            }, 10000);
        });
    };
    this.damageUp = function(){
        var pid = '#pers'+this.id;
        this.damage = this.damage * 2;
        $(pid).animate({opacity: 0.8}, 300, function() {
            setTimeout(function(){
                $(pid).animate({opacity: 1}, 300);
                game.hero.damage = game.hero.damage/2;
            }, 10000);
        });
    };
    this.armorUp = function(){
        var pid = '#pers'+this.id;
        this.armor = this.armor * 2;
        $(pid).animate({opacity: 0.8}, 300, function() {
            setTimeout(function(){
                $(pid).animate({opacity: 1}, 300);
                game.hero.armor = game.hero.armor/2;
            }, 10000);
        });
    };    
    //effects
    this.bliming = function(on){
        if (on) this.blim = 1;
        
        if (this.blim){
            var pid = '#pers'+this.id;
            $(pid).animate({opacity: 0.1}, 300, function() {
                $(pid).animate({opacity: 1}, 300, function() {
                    game.hero.bliming();
                });
            });
        }
    };
    this.normal = function(cnt){
        this.blim = 0;
    }
    
            
    this.init();
}