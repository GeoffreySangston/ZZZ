function AAInputHandler(gameContainer){
	this.gameContainer = gameContainer;
	
	this.events = {};
	
	this.listen();
	
	this.keyStates = {};
	this.keyStates[Z] = KEYSTATIC;
	this.keyStates[X] = KEYSTATIC;
	this.keyStates[A] = KEYSTATIC;
	this.keyStates[W] = KEYSTATIC;
	this.keyStates[D] = KEYSTATIC;
	this.keyStates[S] = KEYSTATIC;
	this.keyStates[LEFT] = KEYSTATIC;
	this.keyStates[UP] = KEYSTATIC;
	this.keyStates[RIGHT] = KEYSTATIC;
	this.keyStates[DOWN] = KEYSTATIC;
	this.keyStates[SHIFT] = KEYSTATIC;
	
	this.mouseState = KEYSTATIC;
	this.mouseX = 0;
	this.mouseY = 0;
	
}

AAInputHandler.prototype = Object.create(InputHandler.prototype);

AAInputHandler.prototype.listen = function(){
	var self = this;
	
	window.addEventListener('keydown', function(e){
		//console.log(e.keyCode);
		if(e.keyCode == SPACE){
			e.preventDefault();
		}
		if(!isNaN(self.keyStates[e.keyCode])){ // if it's a key we're paying attention to
			if(e.keyCode == UP || e.keyCode == DOWN){
				e.preventDefault(); // prevents it from scrolling up/down when using those arrow keys
			}
			
			
			if(self.keyStates[e.keyCode] != KEYDOWN){ // line makes it not emit nonstop
				self.keyStates[e.keyCode] = KEYDOWN;
			}

		}
	});
	
	window.addEventListener('keyup', function(e){
		if(e.keyCode == SPACE){
			e.preventDefault();
		}
		self.keyStates[e.keyCode] = KEYUP;
		
		var data = {
			keyCode : e.keyCode
		};
			
		self.emit("keyup", data);
	});
	
	this.gameContainer.addEventListener('mousedown', function(e){
		/*
		Technically could record this but it seems like it would be complicated synchronizing it with the frames of the game,
		just use this to record the actual mouse state and mouse move to record the position
		*/
    	if(self.mouseState != KEYDOWN){ // line makes it not emit nonstop
    		self.mouseState = KEYDOWN;
    	}
	});
	
	this.gameContainer.addEventListener('mouseup', function(e){
		self.mouseState = KEYUP;
	});
	
	this.gameContainer.addEventListener('mousemove', function(e){
		var canvasX = self.gameContainer.offsetLeft;
    	var canvasY = self.gameContainer.offsetTop;
    	var pageX = e.pageX;
    	var pageY = e.pageY;
    	
    	self.mouseX = pageX - canvasX;
    	self.mouseY = pageY - canvasY;
    	
	});

};