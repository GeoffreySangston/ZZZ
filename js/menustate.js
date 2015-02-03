function MenuState(){
	this.localTicks = 0;
	this.type = MENUSTATE;
	
	
	
}
MenuState.prototype = Object.create(State.prototype);

MenuState.prototype.init = function(game){

};

MenuState.prototype.destroy = function(game){
	game.inputHandler.clearEvents();
};

MenuState.prototype.update = function(game){

};

MenuState.prototype.render = function(game){

};
