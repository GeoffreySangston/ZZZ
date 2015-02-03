/**
Abstract class 
*/

function Entity(x,y){
	this.spriteSheetRef;
	this.frame;

	this.type;
	this.x = x;
	this.y = y;
	this.viewWidth;
	this.viewHeight;
	this.clipWidth;
	this.clipHeight;
	this.pw; // rotate point
	this.ph;
	this.theta;
	this.imageTheta;
	/*
	Collision info.
	
	Trying to go a new route and make this game using only circles and axis-aligned rectangles.
	*/
	this.collidable = true;
	this.collisionType;
	this.collisionRadius;
	//this.collisionX; //this is the center of the collision circle
	//this.collisionY;
	this.collisionWidth;
	this.collisionHeight;

	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
}

Entity.BALL = 0;

Entity.prototype.clone = function(){
	// could possibly change this to a toJSON, readJSON method
	// actually that could be a bit slow
	var ent = this;
	
	var newEntity = new Entity(ent.x, ent.y);
	newEntity.spriteSheetRef = ent.spriteSheetRef;
	newEntity.type = ent.type;
	newEntity.viewWidth = ent.viewWidth;
	newEntity.viewHeight = ent.viewHeight;
	newEntity.pw = ent.pw;
	newEntity.ph = ent.ph;
	newEntity.shouldRenderRotate = ent.shouldRenderRotate;
	newEntity.collidable = ent.collidable;
	newEntity.collisionType = ent.collisionType;
	newEntity.collisionRadius = ent.collisionRadius;
	newEntity.collisionWidth = ent.collisionWidth;
	newEntity.collisionHeight = ent.collisionHeight;
	newEntity.localTicks = ent.localTicks;
	newEntity.zHeight = ent.zHeight;
	
	return newEntity;
};

Entity.prototype.toJSON = function(){
	var json = JSON.stringify(this);
	return json;
};

Entity.prototype.collides = function(oe){
	if(this.collidable && oe.collidable){
		if(this.canCollideWith(oe)){
			return this.circleCircleCollides(oe);
		}
	}
};

Entity.prototype.canCollideWith = function(oe){
	return true;
};
Entity.prototype.circleCircleCollides = function(oe){
	var thisRad = this.collisionRadius;
	var oeRad = oe.collisionRadius;
	
	var thisCXY = this.calcCollisionXY();
	var oeCXY = oe.calcCollisionXY();
	
	var thisCX = thisCXY.x;
	var thisCY = thisCXY.y;
	var oeCX = oeCXY.x;
	var oeCY = oeCXY.y;
	
	var distSquared = (Math.pow(thisCX - oeCX,2) + Math.pow(thisCY - oeCY,2));
	var radSum = (thisRad + oeRad);
	return radSum*radSum > distSquared; // squared because I've read sqrt is slow
};

Entity.prototype.__calcCenterTheta = function(){ // angle between top left corner and center
	return Math.atan2(this.viewHeight, this.viewWidth);
};
Entity.prototype.__calcCornerDist = function(){
	return Math.sqrt(Math.pow(this.viewWidth/2,2) + Math.pow(this.viewHeight/2,2));
};
Entity.prototype.calcCenterXY = function(){
	var cornerDist = this.__calcCornerDist();
	var centerTheta = this.__calcCenterTheta();
	return {x : this.x + cornerDist*Math.cos(centerTheta), y : this.y + cornerDist*Math.sin(centerTheta)};
};

Entity.prototype.calcCollisionXY = function(){
	return this.calcCenterXY();
};

Entity.prototype.setCenter = function(cx,cy){
	/*
	Sets the center of the object to cx,cy by updating the x,y 
	accordingly (remember x,y is always the top left of the object
	regardless of rotation)
	*/
	this.x = cx - this.viewWidth/2;
	this.y = cy - this.viewHeight/2;	
	
};

Entity.prototype.moveTowardPlayer = function(game){
	this.theta = this.calcPlayerOrthoTheta(game);
	//this.theta += .05;
	this.x -= this.speed*Math.cos(this.theta);
	this.y -= this.speed*Math.sin(this.theta);
	
};


Entity.prototype.calcPlayerOrthoTheta = function(game){
	var gameState = game.stateMachine.curState;
	var numerator = this.y - (game.playerInfo.playerTurret.y + game.playerInfo.playerTurret.viewHeight/2 - this.viewWidth/2);
	var denominator = this.x - (game.playerInfo.playerTurret.x + game.playerInfo.playerTurret.viewWidth/2 - this.viewHeight/2);
	var theta = Math.atan2(numerator, denominator);
	
	return theta;
};

Entity.prototype.setThetaOrthoPlayer = function(game){
	this.theta = this.calcPlayerOrthoTheta(game);
};

Entity.prototype.moveTowardCenter = function(game){
	this.theta = this.calcCenterOrthoTheta(game);
	//this.theta += .05;
	this.x -= this.speed*Math.cos(this.theta);
	this.y -= this.speed*Math.sin(this.theta);
};

Entity.prototype.calcCenterOrthoTheta = function(game){
	var screenCenterX = GAMEWIDTH/2;
	var screenCenterY = GAMEHEIGHT/2;

	var gameState = game.stateMachine.curState;
	var numerator = this.y - (screenCenterY - this.viewWidth/2);
	var denominator = this.x - (screenCenterX - this.viewHeight/2);
	var theta = Math.atan2(numerator, denominator);
	
	return theta;
};

Entity.prototype.setThetaOrthoCenter = function(game){
	this.theta = this.calcCenterOrthoTheta(game);
};

/**
Calculates {x:,y:} with the vector components with the tail at the player center and head at the 
spawn
*/
Entity.prototype.calcPlayerEntityXYVec = function(game){
	var playerCenterX = game.playerInfo.playerTurret.x + game.playerInfo.playerTurret.viewWidth/2;
	var playerCenterY = game.playerInfo.playerTurret.y + game.playerInfo.playerTurret.viewHeight/2;
	var thisCenterXY= this.calcCenterXY();
	var thisCenterX = thisCenterXY.x;
	var thisCenterY = thisCenterXY.y;
	
	var xComp = thisCenterX - playerCenterX;
	var yComp = thisCenterY - playerCenterY;
	
	return {x : xComp, y : yComp};
};

Entity.prototype.calcCenterEntityXYVec = function(game){
	var centerX = GAMEWIDTH/2;
	var centerY = GAMEHEIGHT/2;
	var thisCenterXY= this.calcCenterXY();
	var thisCenterX = thisCenterXY.x;
	var thisCenterY = thisCenterXY.y;
	
	var xComp = thisCenterX - centerX;
	var yComp = thisCenterY - centerY;
	
	return {x : xComp, y : yComp};
};

Entity.prototype.centerDistFromPlayerCenter = function(game){

	var playerCenterX = game.playerInfo.playerTurret.x + game.playerInfo.playerTurret.viewWidth/2;
	var playerCenterY = game.playerInfo.playerTurret.y + game.playerInfo.playerTurret.viewHeight/2;
	var thisCenterXY= this.calcCenterXY();
	var thisCenterX = thisCenterXY.x;
	var thisCenterY = thisCenterXY.y;
	
	var dist = Math.sqrt(Math.pow(thisCenterX - playerCenterX,2) + Math.pow(thisCenterY - playerCenterY,2));
	return dist;
};

Entity.prototype.centerDistFromCenter = function(game){

	var centerX = GAMEWIDTH/2;
	var centerY = GAMEHEIGHT/2;
	var thisCenterXY= this.calcCenterXY();
	var thisCenterX = thisCenterXY.x;
	var thisCenterY = thisCenterXY.y;
	
	var dist = Math.sqrt(Math.pow(thisCenterX - centerX,2) + Math.pow(thisCenterY - centerY,2));
	return dist;
};

Entity.prototype.rotAboutXY = function(rotX,rotY,theta){
	var c = this.calcCenterXY();

	var dx = c.x - rotX;
	var dy = c.y - rotY;
	//theta *= -1;

	var newX = dx*Math.cos(theta) - dy*Math.sin(theta) + rotX;
	var newY = dx*Math.sin(theta) + dy*Math.cos(theta) + rotY;
	
	this.setCenter(newX,newY);
};


Entity.prototype.update = function(game){
	this.localTicks++;
};

Entity.prototype.shouldDestroy = function(){
	return false;
};

Entity.prototype.onDestroyEvent = function(game){

};

Entity.prototype.isOnScreen = function(){ // really should rename to isOnScreen
	return (this.x + this.viewWidth > 0 && this.x < GAMEWIDTH) && (this.y + this.viewHeight > 0 && this.y < GAMEHEIGHT);
};

/**
Should only update "next" variables - variables which are updated and then later in the same frame applied
or variables who other entities don't depend from
*/
Entity.prototype.updateCollision = function(oe){

};

/*
FLOCKING

Could optimize by keeping track of specific flock
arrays instead of iterating through the entire entity
array

The entityIdTypes parameter is an array of the types of
entities that this entity should try to flock with
*/
Entity.prototype.computeAlignment = function(entityIdTypes){
	
};
Entity.prototype.computeCohesion = function(entityIdTypes){

};
Entity.prototype.computeSeparation = function(entityIdTypes){
	
};
