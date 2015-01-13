function Monster(type, pos) {
    this.id = game.genId();
    this.type = 'spider';
    this.life = 1;
    this.speed = 39;
    this.damage = 1;
    this.behavior = 'calm';
    this.xp = 5;
    this.direct = 'down';
    this.pos = [0, 0];
    
    this.cssPos = function(){
        var lpos = game.lab.align[0] + this.pos[0];
        var tpos = game.lab.align[1] - this.pos[1];
        return [lpos, tpos];
    }    
    this.init = function() {
        if (type)
            this.type = type;
        if (pos){
            this.pos[0] = pos[0] * game.lab.quad;
            this.pos[1] = pos[1] * game.lab.quad;
        }

       /* switch (type) {
            case 'spider':
                this.behavior = 'calm';
                this.xp = 5;
                this.life = 3;
                this.damage = 5;
            case 'bat':
                this.behavior = 'calm';
                this.xp = 10;                
                this.life = 5;
                break;
            case 'snake':
                this.behavior = 'fast';
                this.xp = 20;                
                this.life = 7;
                break;                
            case 'snake':
                this.behavior = 'fast';
                this.xp = 20;                
                this.life = 7;
                break;    
                    
        }*/

        var cssPos = this.cssPos();

        if (!$('#monster' + this.id).length) {
            var monster = $('<div id="monster' + this.id + '" class="monster ' + this.type + ' ' + this.direct + '"></div>');
            $(monster).appendTo('.area');
            $(monster).css('left', cssPos[0]).css('top', cssPos[1]).fadeIn(500);
        }
    };
    this.fire = function() {

    };
    this.move = function(direct) {
        if (direct && (this.direct != 'dead') )
            this.direct = direct;

        var coord = game.lab.directToCoord(this.direct);

        var changed = game.lab.canChangePos(coord[0], coord[1], this.pos);
        if (changed) {
            this.pos = [this.pos[0] / 1 + coord[0] * this.speed, this.pos[1] / 1 + coord[1] * this.speed];
        }

        var cssPos = this.cssPos();

        this.step++;

        $('#monster' + this.id).css('left', cssPos[0]).css('top', cssPos[1])
                .removeClass('up').removeClass('down').removeClass('left').removeClass('right')
                .addClass(this.direct);
    };
    this.hurt = function(pts){
        if (!pts) pts = 1;
        this.life = this.life - 1;

        if (this.life < 1){
            this.dead();
        }
    };    
    this.dead = function() {
        $('#monster' + this.id).remove();
        game.monsters[this.id] = null;
    };
    this.scripting = function(coef) {
        if (!coef) coef = 6;
        var action = Math.floor(Math.random() * coef, 1);
        
        switch (action) {
            case 0:
                this.move();
                break;
            case 1:
                this.fire();
                break;
            case 2:
                this.move('up');
                break;
            case 3:
                this.move('down');
                break;
            case 4:
                this.move('left');
                break;
            case 5:
                this.move('right');
                break;
        }
    };    
    this.init();
}