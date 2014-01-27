module testqueue
{
	export class Sequence//<T>
	{

		private queue: Array<PositionSequenceMember> = new Array<PositionSequenceMember>();//<T>;
		private currentMember:PositionSequenceMember;//T;

		constructor()
		{

		}

		public add(item:PositionSequenceMember):void // add(item:T):void;
		{
			this.queue.push(item);
		}

		public start(startTime:number):void
		{
			if (this.queue.length === 0)
			{
				throw new Error("Cant start with empty queue you stupid");
			}

			this.currentMember = this.queue.shift();
			this.currentMember.start(startTime, 0, 0);
		}


		public tick(startTime:number, endTime:number ):void
		{

			console.log("tick " + startTime + " to " + endTime);

			var currentTime:number = startTime;

			while(currentTime < endTime && this.currentMember)
			{

				// tick the item
				currentTime = this.currentMember.tick(currentTime, endTime);

				console.log("ticked: " + (currentTime - startTime));

				// check if the tick exhaused the timeframe
				// otherwise let go to next member
				if (currentTime < endTime)
				{
					console.error("not exhausted at " + currentTime);

					if (this.queue.length === 0)
					{
						console.log("sequence ended");
						// can't do anything more. Exit!
						this.currentMember = null;
					}else
					{
						console.log("pick new " + (currentTime - startTime) + " left");
						var position:number = this.currentMember.getPosition(currentTime);
						var velocity:number = this.currentMember.getVelocity(currentTime);	
						this.currentMember = this.queue.shift();
						this.currentMember.start(currentTime, position, velocity);
					}
				}
			}

			console.log("tick done");
		}
	}
}



