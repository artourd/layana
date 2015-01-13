function Labyrinth() {
    this.level = 0;
    this.align = [0, 0];
    this.start = [0, 0];
    this.quad = 60;
    
    //bg: 1-ground,2-sand,stone
    //wall: 0-no,1-top,2-right,3-top-right, 4-top-big,5-right-big,6-top-right-big
    this.map = [
        [10, 20, 10, 20, 21, 11, 10, 22, 20, 11, 21, 12, 12, 10],
        [10, 10, 10, 10, 11, 11, 10, 12, 10, 10, 11, 12, 12, 10], 
        [10, 10, 10, 10, 11, 21, 10, 12, 10, 10, 11, 12, 12, 10], 
        [10, 10, 10, 10, 11, 11, 20, 12, 10, 11, 11, 12, 12, 10], 
        [10, 10, 10, 10, 11, 11, 20, 12, 10, 10, 11, 12, 12, 10], 
        [10, 10, 20, 10, 11, 21, 10, 22, 10, 11, 11, 12, 12, 10]
    ];    
    
    this.monsters = [];//[['spider', [5, -5]]];//[['spider', [4, -4]], ['spider', [4, -5]], ['spider', [5, -5]]];
    this.keys = [['wood', [3, -4]], ['wood', [2, -5]], ['gold', [3, -3]]];
    
    //1-t-cl,2-r-cl,3-tr-cl,4-t-op,5-r-op,6-tr-op,7-t-br,8-r-br,9-tr-br
    this.doors = [['wood', 1, [3, -4]], ['wood', 2, [2, -5]], ['gold', 3, [3, -3]]];
    this.lifes = [['little', [4, -3]], ['little', [2, -3]], ['normal', [1, -5]], ];
    this.bufs = [['armor', [4, -2]], ['damage', [2, -2]], ['invis', [1, -4]], ['immort', [1, -4]] ];
    this.tools = [['hammer', [5, -6] ], ['shield', [5, -5]], ['axe', [5, -2]], ];
    this.weapon = [['fire', [5, -6] ], ['arrow', [5, -5]], ['light', [5, -2]], ];

    this.drawTerrain = function() {
        
        var img = document.getElementById('img_bg');
        var map = this.map;
        var quad = this.quad;
        var c = document.getElementById('bg');
        var ctx = c.getContext('2d');

        $.each(map, function(x, line) {
            $.each(line, function(y, code) {
                var data = (code + '').split('');
                var diffy = 0;
                if (data[0]/1 == 2){
                    var diffy = 100;
                }
                ctx.drawImage(img, 0, diffy, quad, quad, 
                    y * quad, x * quad,
                    quad, quad);
                    
            });
        });
    };
    this.drawWalls = function() {
        
        var img = document.getElementById('img_bg');
        var map = this.map;
        var quad = this.quad;
        var c = document.getElementById('bg_walls');
        var ctx = c.getContext('2d');

        $.each(map, function(x, line) {
            $.each(line, function(y, code) {
                var data = (code + '').split('');
                var diffy = 0;
                if (data[1]/1){
                    if (data[1]/1 == 2){
                        var diffy = 100;
                    }
                    ctx.drawImage(img, 200, diffy, quad, quad, 
                        y * quad, x * quad,
                        quad, quad);
                }
            });
        });
    };    
    this.loadData = function(lvl){
        
    };
    this.clearData = function(){
        
    };
    this.newLvl = function(){
        this.level++;
        this.clearData();
        this.loadData(this.level);
        this.draw();
        this.generate();
        this.reanimate();
    };           
    this.canChangePos = function (x, y, pos) {
        var can = false;

        if (x / 1 && (pos[0] / 1 + x / 1 >= 0) && (pos[0] / 1 + x / 1 <= 9)) {
            can = true;
        }
        if (y / 1 && (pos[1] / 1 + y / 1 <= 0) && (pos[1] / 1 + y / 1 >= -5)) {
            can = true;
        }
        can = true;
        return can;
    };   
    this.directToCoord = function(direct) {
        var coord = [0, 0];
        switch (direct) {
            case 'up':
                coord = [0, 1];
                break;
            case 'left':
                coord = [-1, 0];
                break;
            case 'right':
                coord = [1, 0];
                break;
            case 'down':
                coord = [0, -1];
                break;
        }
        return coord;
    };
    this.init = function(){
        //document.getElementById('snd_bg').play();
        this.drawTerrain();
        this.drawWalls();
    };    
    this.init();
}