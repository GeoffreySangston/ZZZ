function EventHandler(data){
	this.data = data;
	
	this.eventCallbacks = this.createEventCallbacks();
	
	this.futureActions = [];
}

EventHandler.prototype.createEventCallbacks = function(){
	return [];
};

EventHandler.prototype.handleEvents = function(game){ // gameTicks needs to be included with "allData" but we'll get to that with state management
	/**
	Has a bunch of checks and a bunch of actions as helper functions
	*/

	/* FIRST CHECK SCENE */
	
	for(var i = this.eventCallbacks.length - 1; i >= 0; i--){
		var evaluateEvent = this.eventCallbacks[i];
		var destroyEvent = evaluateEvent(game);
		if(destroyEvent){
			this.eventCallbacks.splice(i,1);
		}
	}
	

};
