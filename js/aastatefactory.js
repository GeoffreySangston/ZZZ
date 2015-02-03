function AAStateFactory(){

}

AAStateFactory.prototype = Object.create(StateFactory.prototype);

AAStateFactory.prototype.getState = function(stateId){
	switch(stateId){
		case INITSTATE: return new InitState();
		case MENUSTATE: return new MenuState();
		case GAMESTATE: return new GameState();
		case GAMELOSESTATE: return new GameLoseState();
		case GAMEWINSTATE: return new GameWinState();
		default:
	
	}
};