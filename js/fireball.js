function FireBall(idirect, ipos, itype, isender) {
    this.direct = idirect;
    this.pos = ipos;
    this.id = game.genId();
    this.step = 0;
    this.speed = 39;
    this.type = 'fire';
    this.time = 5;
    this.damage = 20;
    this.distance = 120;
    this.sender = 'hero';
    this.cssPos = function(){
        var lpos = game.lab.align[0] + this.pos[0];
        var tpos = game.lab.align[1] - this.pos[1];
        return [lpos, tpos];
    }      
    this.init = function() {
        if (isender)
            this.sender = isender;
        if (itype)
            this.type = itype;
        
        var coord = game.lab.directToCoord(this.direct);
        var can = game.lab.canChangePos(coord[0], coord[1], this.pos);
        if (can) {
            this.pos = [this.pos[0] / 1 + coord[0] * this.speed, this.pos[1] / 1 + coord[1] * this.speed];
            
            switch (this.type) {
                case 'fire':
                    this.speed = 39;
                    this.damage = 10;
                    this.distance = 120;
                    break;
                case 'arrow':
                    this.speed = 78;
                    this.damage = 6;
                    this.distance = 200;
                    break;
                case 'bullet':
                    this.speed = 156;
                    this.damage = 4;
                    this.distance = 320;
                    break;
                case 'light':
                    this.speed = 312;
                    this.damage = 4;
                    this.distance = 500;
                    break;
            }

            var cssPos = this.cssPos();

            if (!$('#fire' + this.id).length) {
                var fire = $('<div id="fire' + this.id + '" class="' + this.type + ' ' + this.direct + '"></div>');
                $(fire).appendTo('.area');
                $(fire).css('left', cssPos[0]).css('top', cssPos[1]).fadeIn(500);
            }
            game.fireballs[this.id] = this;
        }
        document.getElementById('snd_fire').pause();
        document.getElementById('snd_fire').currentTime = 0;
        document.getElementById('snd_fire').play();
    };
    this.move = function() {
        var coord = game.lab.directToCoord(this.direct);
        var can = game.lab.canChangePos(coord[0], coord[1], this.pos);
        if (can) {
            this.pos = [this.pos[0] / 1 + coord[0] * this.speed, this.pos[1] / 1 + coord[1] * this.speed];

            var cssPos = this.cssPos();

            this.step++;

            $('#fire' + this.id).css('left', cssPos[0]).css('top', cssPos[1]);

            if (this.speed * this.step > this.distance) {
                this.dead();
            }
        } else {
            this.dead();
        }
    };
    this.dead = function() {
        game.fireballs[this.id] = null;
        $('#fire' + this.id).remove();        
    }
    this.init();
}