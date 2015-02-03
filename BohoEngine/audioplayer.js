function AudioPlayer(audioHandler){
	this.audioHandler = audioHandler;
	this.volume = 1;
	this.curAudio;
	this.test;
}

/*
All params are in millis

audioStart is where to start playing from
loopStart is where to start looping from
loopLength is the length of the loop, use this to calculate the loopEnd ms 
*/
AudioPlayer.prototype.loopAudio = function(audioRef, audioStart, loopStart, loopLength){
	var audio = this.audioHandler.cache[audioRef];
	this.curAudio = audio;

	if(!audio){
		throw("No such audio: " + audioRef);
	}
	
	audio.currentTime = audioStart;
	audio.volume = this.volume;
	
	if(typeof audio.loop == 'boolean'){
		audio.loop = true;
	} else {
		audio.addEventListener('ended', function() {
			console.log(loopStart);
   		 	this.currentTime = loopStart;
	   	 	this.play();
		}, false);
	}
	audio.play();
	

};

AudioPlayer.prototype.setVolume = function(volume){
	this.volume = volume;
	this.curAudio.volume = this.volume;

};

AudioPlayer.prototype.pause = function(){
	var audio = this.curAudio;
	if(this.curAudio){
		this.curAudio.pause();
	} 
};

AudioPlayer.prototype.unpause = function(){
	if(this.curAudio){
		this.curAudio.play();
	}
};

AudioPlayer.prototype.getCurSecs= function(){
	if(this.curAudio){
		return this.curAudio.currentTime;
	}
	return undefined; // not sure if this or -1
};