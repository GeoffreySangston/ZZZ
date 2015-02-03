function Main(){
	var game = new AAGame();
	game.setNextState(INITSTATE);

	Engine.init(game);
	
	var engineReturn = Engine.run();
	
	Engine.destroy();
	return engineReturn;
}

new Main();