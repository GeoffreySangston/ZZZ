function AAGame(){
	this.htmlActuator = new HTMLActuator();
	this.renderer = new Renderer(this.htmlActuator.canvas, GAMEWIDTH, GAMEHEIGHT);
	this.inputHandler = new AAInputHandler(this.htmlActuator.canvas);
	this.localStorageHandler = new AALocalStorageHandler();
	this.imageHandler = new ImageHandler();
	this.audioHandler = new AudioHandler();
	this.audioPlayer = new AudioPlayer(this.audioHandler);

	this.stateFactory = new AAStateFactory();
	this.stateMachine = new StateMachine();
	
	this.ticks = 0;
	
	this.nextStateId;
	
	this.roundManager;
	this.playerInfo;
	
	this.frozen = false;
	
	this.winsInARow = 0;
	
		
	window.onblur = function(){
		this.frozen = true;
		
		this.audioPlayer.pause();
	}.bind(this);
	
	window.onfocus = function(){
		this.frozen = false;
		
		this.audioPlayer.unpause();
		
	}.bind(this);
	
}

AAGame.prototype = Object.create(Game.prototype);


AAGame.prototype.serialize = function(){
	return {
		stateMachine : this.stateMachine,
		ticks : this.ticks,
		nextStateId : this.nextStateId,
		roundManager : this.roundManager,
		playerInfo : this.playerInfo
	}
};