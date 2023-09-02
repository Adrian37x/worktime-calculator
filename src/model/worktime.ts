export class ElapsedWorktime {
	label: string;

	constructor(worktime: number = 0) {
		worktime /= 1000;
		const hours = Math.floor(worktime / 60 / 60);
		worktime -= hours * 60 * 60;
		const minutes = Math.floor(worktime / 60);
		worktime -= minutes * 60;
		const seconds = Math.floor(worktime);

		this.label = `${hours}h ${minutes}m ${seconds}s`;
	}
}