function QuadNode(level, x, y, width, height){
	
	
	this.level = level;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.entities = [];
	this.quadNodes = [null,null,null,null]; // holds up to 4 nodes
}

QuadNode.MAXOBJECTS = 10;
QuadNode.MAXLEVELS = 5;

QuadNode.prototype.clearTree = function(){
	this.entities.length = [];
	
	for(var i = 0; i < this.quadNodes.length; i++){
		if(this.quadNodes[i]){
			this.quadNodes[i].clearTree();
			this.quadNodes[i] = null;
		}
	}
};

QuadNode.prototype.split = function(){
	var subWidth = (this.maxX - this.minX)/2;
	var subHeight = (this.maxY - this.minY)/2;
	
	/*
	 ---------
	| q1 | q2 |
	 ---------
	| q3 | q4 |
	 ---------
	*/
	
	var x = this.x;
	var y = this.y;
	
	var q1 = new QuadNode(this.level+1, x, y, subWidth, subHeight);
	var q2 = new QuadNode(this.level+1, x + subWidth, y,subWidth, subHeight);
	var q3 = new QuadNode(this.level+1, x, y + subHeight, subWidth, subHeight);
	var q4 = new QuadNode(this.level+1, x + subWidth, y + subHeight, subWidth, subHeight);
	
	this.quadNodes[0] = q1;
	this.quadNodes[1] = q2;
	this.quadNodes[2] = q3;
	this.quadNodes[3] = q4;
};

/*
Determines which node the object should be in. Returns -1 if can't fit in a child node
and is part of a parent node
*/
QuadNode.prototype.getIndex = function(ex,ey,ew,eh){
	var index = -1;
	var cx = this.x + this.width/2;
	var cy = this.y + this.height/2;

	boolean fitsTop = ey + eh < cy && ey < cy; // not sure if second is necessary
	boolean fitsBottom = ey > cy;
	boolean fitsLeft = ex + ew < cx && 
}

