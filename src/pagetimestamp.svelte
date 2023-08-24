<script>
import { get } from "svelte/store";
import { activepb, theaudio, timestampcursor ,humantime} from "./store";

export let timestamp=[];
export let cursor;
export let pb;

const gototimestamp=(idx,ts)=>{
    timestampcursor.set(idx);
    activepb.set(pb);
    if (ts) {
        get(theaudio).currentTime=ts;
    }
}
</script>
{#each timestamp as ts,idx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="timestamp" on:click={()=>gototimestamp(idx,ts)}
    title={humantime(ts,true)}
    class:wrong={ts&&idx>0&& timestamp[idx-1]>ts}
     class:setted={ts} class:selected={idx==cursor}>{(ts?humantime(ts):"00:00")+" "}</span>
{/each}