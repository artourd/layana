var game = null;

function dbg(text) {
    console.log(text);
}

var keyQueue = [];

$(document).ready(function() {
    game = new Game();
    game.init();
    
    $('body').on('keydown', function(event) {
        dbg(event);
        keyQueue[keyQueue.length] = event.key.toString().toLowerCase();
        if (!run){
            run = 1;
            setTimeout(function(){
                action(keyQueue);
                keyQueue = [];
                run = 0;
            }, 70);
        }
    })

});
var run = 0;
function action(keyQueue){
    keyQueue = $.unique( keyQueue );
    $.each(keyQueue, function (index, keyPress) {
        switch (keyPress) {
            case 'up':
            case 'w':
                if (!game.paused) {
                    game.hero.move('up');
                }
                break;
            case 'left':
            case 'a':
                if (!game.paused) {
                    game.hero.move('left');
                }
                break;
            case 'right':
            case 'd':
                if (!game.paused) {
                    game.hero.move('right');
                }
                break;
            case 'down':
            case 's':
                if (!game.paused) {
                    game.hero.move('down');
                }
                break;
            case ' ':
            case 'control':
                if (!game.paused) {
                    game.hero.fire();
                }
                break;
            case 'enter':
                game.pause();
                break;
            case 'escape':
                game.pause();
                break;
        }
    });
}
