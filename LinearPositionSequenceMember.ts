module testqueue
{
	export class LinearPositionSequenceMember implements PositionSequenceMember
	{

		private duration: number;
		private startTime: number;
		private startPosition: number;
		private startVelocity: number;

		constructor(duration: number)
		{
			this.duration = duration;
		}

		public start(time: number, position: number, velocity:number)
		{
			this.startTime = time;
			this.startPosition = position;
			this.startVelocity = velocity;
		}

		public getPosition(time:number):number
		{
			// TODO: this might be wrong
			var delta: number = (time - this.startTime) / this.duration;
			delta = Math.max(1, delta);
			delta = Math.min(1, delta);

			return this.startPosition + this.startVelocity * delta;

		}

		public getVelocity(time:number):number
		{
			return this.startVelocity;
		}


		public tick(startTime:number, endTime:number):number
		{
			if (this.startTime + this.duration >= endTime)
			{
				return endTime;
			}else
			{
				return Math.min(this.startTime + this.duration, endTime);
			}
			
		}

	}
}
