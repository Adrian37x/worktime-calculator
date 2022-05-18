<script lang="ts">
	import Stamp from "./lib/Stamp.svelte";
	import { toDate, toTime } from "./util/datetime";
	import { Button, FormGroup, Icon, Input } from 'sveltestrap';

	let stamps: Date[] = [];
	let newStamp: string = toTime(new Date());
	let worktimeInSeconds: number = 0;
	let worktimeLabel: string = "0h 0m 0s";

	const addStamp = () => {
		stamps.push(toDate(newStamp));
		stamps = stamps.sort((a, b) => +a - +b);
		newStamp = toTime(stamps.at(-1));
		calculateWorktime();
	}

	const removeStamp = (event) => {
		stamps.splice(event.detail, 1);
		stamps = stamps;
		calculateWorktime();
	}

	setInterval(() => {
		if (stamps.length && stamps.length % 2 != 0 && Date.now() > +stamps.at(-1)) {
			worktimeInSeconds++;
			createWorktimeLabel(worktimeInSeconds);
		}
	}, 1000);

	const calculateWorktime = () => {
		let worktime = 0;
		let startTime;

		for (const stamp of stamps) {
			if (startTime) {
				worktime += (+stamp - +startTime);
				startTime = null;
			}
			else {
				startTime = stamp;
			}
		}

		if (startTime && Date.now() > +startTime)
			worktime += (Date.now() - +startTime);

		worktimeInSeconds = worktime / 1000;
		createWorktimeLabel(worktimeInSeconds);
	}

	const createWorktimeLabel = (worktimeSeconds: number) => {
		const hours = Math.floor(worktimeSeconds / 60 / 60);
		worktimeSeconds -= hours * 60 * 60;
		const minutes = Math.floor(worktimeSeconds / 60);
		worktimeSeconds -= minutes * 60;
		const seconds = Math.floor(worktimeSeconds);

		worktimeLabel = `${hours}h ${minutes}m ${seconds}s`;
	}
</script>

<main>
	<h1>Worktime Calculator</h1>
	<h3>Your total worktime is {worktimeLabel}</h3>

	<FormGroup>
		<Input class="inline" type="time" bind:value={newStamp} />
		<Button color="success" on:click={addStamp}>
			<Icon name="plus" />
		</Button>
	</FormGroup>

	{#each stamps as stamp, i}
		<Stamp time={stamp} index={i} on:remove={removeStamp} />
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff916c;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
