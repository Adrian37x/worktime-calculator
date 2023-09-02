<script lang="ts">
	import Stamp from "./components/stamp.svelte";
	import { ElapsedWorktime } from "./model/worktime";
    import { toDate, toTimeString } from "./datetime";

	let stamps: Date[] = [];
	let stampModel: string = toTimeString(new Date());

	let elapsedWorktime: ElapsedWorktime = new ElapsedWorktime();

	setInterval(() => {
		if (stamps.length && stamps.length % 2 != 0 && Date.now() > +stamps.at(-1)) {
			updateElapsedWorktime();
		}
	}, 1000);

	function updateElapsedWorktime() {
		let worktime = 0;
		let stampIn = null;

		for (const stamp of stamps) {
			if (!stampIn) {
				stampIn = stamp;
			} else {
				worktime += +stamp - +stampIn;

				stampIn = null;
			}
		}

		if (stampIn && +stampIn < Date.now()) {
			worktime += Date.now() - +stampIn;
		}

		elapsedWorktime = new ElapsedWorktime(worktime);
	}

	function addStamp() {
		stamps.push(toDate(stampModel));
		stamps.sort((a, b) => +a - +b);
		stamps = [...stamps];

		updateElapsedWorktime();

		// Set model to last stamp
		stampModel = toTimeString(stamps.at(-1));
	}

	function removeStamp(event) {
		stamps.splice(event.detail, 1);
		stamps = [...stamps];

		updateElapsedWorktime();
	}
</script>

<ui-page>
	<ui-title>Worktime Calculator</ui-title>

	<ui-worktime>Your total worktime is {elapsedWorktime.label}</ui-worktime>

	{#each stamps as stamp, index}
		<Stamp {stamp} {index} on:remove={removeStamp} />
	{/each}

	<ui-form-inline>
		<input type="time" bind:value={stampModel} />
		<ui-button color="success" on:click={addStamp}>+</ui-button>
	</ui-form-inline>
</ui-page>
