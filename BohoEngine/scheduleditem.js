function ScheduledItem(deltaTick, data){
	this.deltaTick = deltaTick;
	this.data = data; // data should contain only values, no objects
}

ScheduledItem.prototype.clone = function(){
	var data = JSON.parse(JSON.stringify(this.data));
	var newItem = new ScheduledItem(this.deltaTick, data);
	
	return newItem;
};

ScheduledItem.prototype.isRunning = function(){
	return this.deltaTick <= 0;
};

ScheduledItem.prototype.isFinished = function(){
	return false;
};

ScheduledItem.prototype.update = function(data){
	
};

ScheduledItem.prototype.toJSON = function(){
	var json = '';
	
	json += '{';
		json += '"deltaTick" : ' + this.deltaTick + ', ';
		json += '"data" : ' + JSON.stringify(this.data);
	json += '}';
	return json;
};