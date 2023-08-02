<script>
import {audiopath,activefolioid, stampdelay,
    settrack,theaudio,paneWidth, activepb,timestampcursor,setTimestamp,foliolinecount} from './store.js'
const timeadjusts=[-10,-3,3,10];
let audio;
$: theaudio.set(audio)
const onKeyDown=(e)=>{
    const num=parseInt(e.key);
    if (e.code=='Space') {
        if (e.target.nodeName=='AUDIO') return;
        audio.paused?audio.play():audio.pause();
        e.preventDefault();
    } else if (e.code=='Enter' || e.code=='NumpadEnter') {
        setTimestamp(audio.currentTime-$stampdelay)
        timestampcursor.set($timestampcursor+1);
        if ($timestampcursor>=$foliolinecount) {
            activepb.set($activepb+1);
            timestampcursor.set(0);
        }
        e.preventDefault();
    } else if (e.key=='v' || e.key=='ArrowDown') {
        activepb.set($activepb+1);
        timestampcursor.set(0);
        e.preventDefault();
    } else if (e.key=='r'|| e.key=='ArrowUp') {
        activepb.set($activepb-1);
        timestampcursor.set(0);
        e.preventDefault();
    } else if (e.key=='ArrowRight') {
        if (e.target.nodeName=='AUDIO') e.preventDefault();
        if ($timestampcursor<$foliolinecount) {
            timestampcursor.set($timestampcursor+1);
            e.preventDefault();
        } 
    } else if (e.key=='ArrowLeft') {
        if (e.target.nodeName=='AUDIO') e.preventDefault();
        if ($timestampcursor>0) {
            timestampcursor.set($timestampcursor-1);
            e.preventDefault();
        }
    } else if (e.key=='Backspace') {
        settrack(-3);
    } else if (num && e.target.nodeName!=='INPUT') {
        settrack( e.ctrlKey?-num:num);
        e.preventDefault();
    }
}


</script>
<svelte:window on:keydown={onKeyDown} /> 

{#if $activefolioid}
{#each timeadjusts as adj}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="timeadjust" on:click={()=>settrack(adj)}>{adj}</span>
{/each}

<div>
<audio bind:this={audio} controls style={"height:1em;width:"+paneWidth()}>
<source src={$audiopath+$activefolioid+'.mp3'}/>
</audio>
</div>
{/if}
