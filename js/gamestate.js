function GameState(){
	this.localTicks;
	this.entities;
	this.collisions;
	
	this.spinCenter;
	this.spinRadius;
	this.spinRate;
	
	this.stackBallSep;
	this.startStackSize;
	this.startSpinSize;
	
	this.firstOutIndex;
	this.lastSpinningTick;
	
	this.lastAddedBall;
}

GameState.prototype = Object.create(State.prototype);

GameState.prototype.init = function(game){

	this.spinCenter = {x: GAMEWIDTH/2, y: GAMEHEIGHT/3};
	this.spinRadius = 128;
	this.spinRate = Math.PI/128 * Math.random() + Math.PI/256;
	
	this.stackBallSep = 12;
	this.startStackSize = Math.floor(Math.random() * 25 + 5);
	this.startSpinSize = Math.floor(Math.random() * 5 + 3);
	
	this.firstOutIndex = 0;
	this.lastSpinningTick = 0;
	
	this.localTicks = 0;
	this.entities = [];
	
	for(var i = 0; i < this.startSpinSize; i++){
		var th = (i/this.startSpinSize)*2*Math.PI
		var x = this.spinRadius*Math.cos(th) + this.spinCenter.x;
		var y = this.spinRadius*Math.sin(th) + this.spinCenter.y;
		var num = this.entities.length+1;
		
		var ball = new Ball(x,y,num,0);
		ball.setCenter(x,y);
		ball.inPlay = true;
		this.entities.push(ball);
		this.firstOutIndex++;
	}
	
	for(var i = 0; i < this.startStackSize; i++){
		var x = GAMEWIDTH/2;
		var y = this.spinCenter.y + this.spinRadius + 32 + this.stackBallSep*i;
		var num = this.entities.length+1;
		
		var ball = new Ball(x,y,num,0);
		ball.setCenter(x,y);

		this.entities.push(ball);
	
	}
	
	this.collisions = [];
	
	this.lost = false;
	
	this.lastAddedBall = undefined;
	
	document.getElementById("wins").innerText = "Wins in a row: " + game.winsInARow;
	game.inputHandler.on("keyup", this.keyUp.bind(this));
};

GameState.prototype.update = function(game){
	if(this.firstOutIndex < this.entities.length && !this.lost){
		this.spinBalls();
		this.lastSpinningTick = this.localTicks;
	} else {
		this.onEnding(game);
	}
	
	this.localTicks++;
};

GameState.prototype.keyUp = function(data){
	if(data.keyCode == SPACE){
		this.pushBall();
	}
};

GameState.prototype.pushBall = function(){
	if(this.entities.length > this.firstOutIndex){
		var latestBall = this.entities[this.firstOutIndex];
		var startCenter = latestBall.calcCenterXY();
		latestBall.setCenter(GAMEWIDTH/2, this.spinCenter.y + this.spinRadius);
		var collided = false;
		
		for(var i = 0; i < this.entities.length; i++){
			var otherBall = this.entities[i];
			if(otherBall.inPlay && latestBall != otherBall && latestBall.circleCircleCollides(otherBall)){
				collided = true;
				
				
				var ballHasMadeHalfRot = ((this.localTicks - otherBall.addedTick)*this.spinRate >= Math.PI);
				if(ballHasMadeHalfRot || otherBall.addedTick == 0){
					this.lost = true;
				}
			}
		}
		
		if(!collided){
			latestBall.inPlay = true;
			latestBall.addedTick = this.localTicks;
			this.firstOutIndex++;
			
			for(var i = 0; i < this.entities.length; i++){
				var ball = this.entities[i];
				
				if(!ball.inPlay){
					ball.y -= this.stackBallSep;
				}
			}
		} else {
			latestBall.setCenter(startCenter.x, startCenter.y);
		}
		

	}
};

GameState.prototype.spinBalls = function(){
	for(var i = 0; i < this.entities.length; i++){
		var ball = this.entities[i];
		if(ball.inPlay){
			ball.rotAboutXY(this.spinCenter.x, this.spinCenter.y, this.spinRate);
		}
	};
};

GameState.prototype.onEnding = function(game){
	var dt = this.localTicks - this.lastSpinningTick;
	
	if(dt < 60){
		for(var i = 0; i < this.entities.length; i++){
			var ball = this.entities[i];
			if(dt < 31){
				this.spinCenter.y += 5;
			} else {
				this.spinCenter.y -= 5;
			}
		}
	} else {
		if(this.lost){
			game.winsInARow = 0;
		} else {
			game.winsInARow++;
		}
		this.reset(game);
	}
};

GameState.prototype.reset = function(game){
	this.destroy(game);
	this.init(game);
};

GameState.prototype.render = function(game){
	game.renderer.cls();
	this.renderEntityArray(game,this.entities);
	
	var sheet = game.imageHandler.cache["img/bigball.png"];
	var x = this.spinCenter.x - 32;
	var y = this.spinCenter.y - 32;
	var w = 64;
	var h = 64;
	
	game.renderer.drawImage(sheet,0,0,64,64,x,y,w,h,0);
	game.renderer.drawText(this.spinCenter.x - 25,this.spinCenter.y+8,"ZZZ",25,"#FFF");

};

GameState.prototype.renderEntityArray = function(game,entityArray){

	this.sortByZHeightNaive(entityArray);

	for(var i = 0; i < entityArray.length; i++){
		var entity = entityArray[i];
		
		var frame = entity.frame;
		var x = entity.x;
		var y = entity.y;
		var w = entity.viewWidth;
		var h = entity.viewHeight;
		var theta = entity.theta;
		var imageTheta = entity.imageTheta;
		var shouldRenderRotate = entity.shouldRenderRotate;
		var px = entity.px;
		var py = entity.py;
		var clipX = entity.frame * w;
		if(!clipX){
			clipX = 0;
		}
		var clipY = 0;
		var clipWidth = entity.clipWidth || entity.viewWidth;
		var clipHeight = entity.clipHeight || entity.viewHeight;

		var spriteSheetRef = entity.spriteSheetRef;
		var sheet = game.imageHandler.cache[spriteSheetRef];

		var center = entity.calcCenterXY();
		if(entity.inPlay){
			game.renderer.drawLine(center.x,center.y, this.spinCenter.x, this.spinCenter.y, "#000");
		}
		game.renderer.drawImage(sheet,clipX,clipY,clipWidth,clipHeight,x,y,w,h,imageTheta,px,py);
		game.renderer.drawText(center.x - ("" + entity.num).length*2.8,center.y+3,entity.num,8,"#FFF");
		//var center = entity.calcCenterXY();
		//game.renderer.drawCircle(center.x,center.y,entity.displayRadius,"#000000");
		
	}
};

GameState.prototype.sortByZHeightNaive = function(entities){
	for(var i = 1; i < entities.length; i++){
		var curEnt = entities[i];
		var j = i - 1;
		
		while(j >= 0 && entities[j].zHeight > curEnt.zHeight){
			entities[j+1] = entities[j];
			j--;
		}
		entities[j+1] = curEnt;
	}	
	
	if(this.localTicks == 830){
		console.log(entities);
	}
};

GameState.prototype.destroy = function(game){
	game.inputHandler.clearEvents();
};