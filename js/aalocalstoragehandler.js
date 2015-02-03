function AALocalStorageHandler(){
	this.storage = this.createStorage();

	this.gameKey = "gameKey";

}

AALocalStorageHandler.prototype = Object.create(LocalStorageHandler.prototype);

// Game state getters/setters and clearing
AALocalStorageHandler.prototype.getGame= function () {
	var stateJSON = this.storage.getItem(this.gameKey);
	return stateJSON ? JSON.parse(stateJSON) : null;
};

AALocalStorageHandler.prototype.setGame = function (game) {
	this.storage.setItem(this.gameKey, JSON.stringify(game));
};

AALocalStorageHandler.prototype.clearGame = function () {
	this.storage.removeItem(this.gameKey);
};