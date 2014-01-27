module testqueue
{
	export class Index
	{

		private sequence:Sequence;// <testqueue.PositionSequenceMember>;

		constructor()
		{
			this.sequence = new Sequence(); // <testqueue.PositionSequenceMember>

			var linearA:testqueue.LinearPositionSequenceMember;
			var linearB:testqueue.LinearPositionSequenceMember;
			var linearC:testqueue.LinearPositionSequenceMember;

			linearA = new testqueue.LinearPositionSequenceMember(1000);
			linearB = new testqueue.LinearPositionSequenceMember(2000);
			linearC = new testqueue.LinearPositionSequenceMember(3000);

			this.sequence.add(linearA);
			this.sequence.add(linearB);
			this.sequence.add(linearC);

			// closure smack two requests to get two timestamps 
			// without getting the last from Now()
			window.requestAnimationFrame((lastTimestamp:number)=>{
				window.requestAnimationFrame((currentTimestamp:number)=>{

					console.log("start");
					this.sequence.start(currentTimestamp);
					this.mainLoop(lastTimestamp, currentTimestamp);

				});
			});
		}

		private mainLoop( lastTimestamp:number, currentTimestamp:number ):void
		{
			
			this.sequence.tick(lastTimestamp, currentTimestamp);

			window.requestAnimationFrame((nextTimestamp)=>this.mainLoop(currentTimestamp, nextTimestamp));
		}

	}
}
