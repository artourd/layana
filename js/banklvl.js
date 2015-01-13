function BankLvl() {
    this.levels = [];
    this.monsters = [];
    this.init = function(){
        this.levels[1] = [
            
        ];
        this.levels[2] = [
            
        ];
        this.levels[3] = [
            
        ];
        
    };
    this.data = function(lvl){
        return this.levels[lvl];
    }
    
    this.init();
}