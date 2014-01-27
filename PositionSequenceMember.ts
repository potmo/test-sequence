module testqueue
{
	export interface PositionSequenceMember
	{

		start(time: number, position: number, velocity:number);
		getPosition(time:number):number;
		getVelocity(time:number):number;
		tick(startTime:number, endTime:number):number;

	}
}
