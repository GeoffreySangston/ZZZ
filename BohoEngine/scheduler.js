function Scheduler(){

}

Scheduler.update = function(schedule, data){
	/*
	Checks to see if a scheduled item is running or not,
	if so, updates those scheduled items and checks if the next scheduled
	item which is not yet running can start counting down, 
	otherwise,
	*/
	if(schedule && schedule.length > 0){
		if(schedule[0].isRunning()){
			var i = 0;
			while(i < schedule.length && schedule[i].isRunning()){
				schedule[i].update(data);
				console.log(schedule[i]);
				if(schedule[i].isFinished()){
					schedule.splice(i,1);
				} else {
					i++;
				}
			}
		} else {
			schedule[0].deltaTick--;
		}
	}
};