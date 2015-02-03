var Engine = { // static class
	game : null,
	lastRenderFrameTime : null,
	maxFPS : 60,
	millisPerFrame : 1000/60,
	lastTimeSinceRender : null
}

Engine.init = function(game){
	this.game = game;
};

Engine.destroy = function(){

};

/**
Should return exit success/failure
*/

Engine.run = function(){
	
	if(!this.game.frozen){
		this.game.update();
		this.game.render();
	}
		
	window.requestAnimationFrame(this.run.bind(this));
};