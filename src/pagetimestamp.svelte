<script>
import { get } from "svelte/store";
import { activepb, theaudio, timestampcursor } from "./store";

export let timestamp=[];
export let cursor;
export let pb;
const humantime=ts=>{
    const t=Math.round(ts);
    const h= Math.floor(t/3600);
    const m= Math.floor((t-h*3600)/60).toString();
    const s= Math.floor(t-h*3600-m*60).toString();
    return (h?h+":":"")+m.padStart(2,'0')+":"+s.padStart(2,'0');
}
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
    class:wrong={idx>0&& timestamp[idx-1]>ts}
     class:setted={ts} class:selected={idx==cursor}>{(ts?humantime(ts):"00:00")+" "}</span>
{/each}