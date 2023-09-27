<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	
	export let stamp: Date;
	export let index: number;

	$: label = `${("0" + stamp.getHours()).slice(-2)}:${("0" + stamp.getMinutes()).slice(-2)}`;

	const dispatch = createEventDispatcher();
	const removeStamp = () => dispatch("remove", index);
</script>

<ui-stamp>
	<ui-form-inline transition:fly={{x: 20}}>
		<ui-label>{label}</ui-label>

		<ui-button on:click={removeStamp}><img src='icons/trash.svg' /></ui-button>
	</ui-form-inline>
</ui-stamp>
