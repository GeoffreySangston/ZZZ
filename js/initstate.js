function InitState(){
	this.type = INITSTATE;
	this.localTicks = 0;
	
}
InitState.prototype = Object.create(State.prototype);

InitState.prototype.init = function(game){
	// can initialize the game here
	var storedGame = game.localStorageHandler.getGame();
	
	if(storedGame){
		
	} else {

		
	}
	

		game.imageHandler.queueDownload("img/smallball.png");
		game.imageHandler.queueDownload("img/bigball.png");

		this.downloadAndLaunch(game);
		
		
};

InitState.prototype.downloadAndLaunch = function(game){
	game.imageHandler.downloadAll(this.__imageDownloadCallback,game);
}

InitState.prototype.__imageDownloadCallback = function(game){
	game.audioHandler.downloadAll(
		game.__setState.bind(game), 
		GAMESTATE
		//MENUSTATE
	);
}

InitState.prototype.destroy = function(game){
	game.inputHandler.clearEvents();
};

InitState.prototype.update = function(game){
	this.localTicks++;
};

InitState.prototype.render = function(game){
	// just a logic state, no rendering
	// could add rendering if this takes some visible amount of time
};