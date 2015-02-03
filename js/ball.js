function Ball(x,y,num){
	this.type = Entity.BALL;

	this.spriteSheetRef = "img/smallball.png";
	this.frame = 0;
	
	this.x = x;
	this.y = y;
	
	this.num = num;
	
	this.imageTheta = 0;
	
	this.viewWidth = 16;
	this.viewHeight = 16;
	
	this.collisionRadius = this.viewWidth/2-.5;
	
	this.clipX = 0;
	this.clipY = 0;
	this.clipWidth = 16;
	this.clipHeight = 16;

	this.inPlay = false;
	
	this.addedTick = 0;
}

Ball.prototype = Object.create(Entity.prototype);

