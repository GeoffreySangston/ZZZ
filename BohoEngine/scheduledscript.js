function ScheduledScript(deltaTick, data){
	this.deltaTick = deltaTick;
	this.script = data.script;

	this.finished = false;
}

ScheduledScript.prototype = Object.create(ScheduledItem.prototype);

ScheduledScript.prototype.clone = function(){

};


ScheduledScript.prototype.isFinished = function(){
	return this.finished;
};


ScheduledScript.prototype.update = function(data){
	this.finished = this.script(data); // opaline dreams passes in the game object
};