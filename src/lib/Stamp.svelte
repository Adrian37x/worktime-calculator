<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Button, FormGroup, Icon } from 'sveltestrap';
    import { fly } from 'svelte/transition';
    import { toTime } from '../util/datetime';
    
    export let index: number;
    export let time: Date;
    $: label = toTime(time);
    
    const dispatch = createEventDispatcher();

    const removeItem = () => {
        dispatch("remove", index);
    }
</script>

<div transition:fly={{y: 20}}>
<FormGroup>
    <span>{label}</span>
    <Button color="danger" on:click={removeItem}>
        <Icon name="trash" />
    </Button>
</FormGroup>
</div>
