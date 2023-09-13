<script>
import {audiopath, stampdelay,settrack,timestamps,playing,
    seektrack,theaudio,paneWidth, activepb,timestampcursor,setTimestamp, sutra, adjusttime, getTimestamp} from './store.js'

let audio;
$: theaudio.set(audio)
const onKeyDown=(e)=>{
    const num=parseInt(e.key);
    if (e.code=='Space') {
        if (e.target.nodeName=='AUDIO') return;
        if (audio.paused) {
            const ts=getTimestamp();
            audio.currentTime=ts;
            audio.play()
        } else {
            audio.pause();
        }
        e.preventDefault();
    } else if (e.code=='Enter' || e.code=='NumpadEnter') {
        setTimestamp(audio?.currentTime-$stampdelay)
        if ($timestampcursor+1<$sutra.foliolines) timestampcursor.set($timestampcursor+1);
        else {
            activepb.set($activepb+1);    
            timestampcursor.set(0);
        }
        e.preventDefault();
    } else if (e.key=='ArrowDown') {
        activepb.set($activepb+1);
        timestampcursor.set(0);
        e.preventDefault();
    } else if (e.key=='ArrowUp') {
        activepb.set($activepb-1);
        timestampcursor.set(0);
        e.preventDefault();
    } else if (e.key=='ArrowRight') {
        if (e.target.nodeName=='AUDIO') e.preventDefault();
        if ($timestampcursor+1<$sutra.foliolines) {
            timestampcursor.set($timestampcursor+1);
            e.preventDefault();
        } 
    } else if (e.key=='ArrowLeft') {
        if (e.target.nodeName=='AUDIO') e.preventDefault();
        if ($timestampcursor>0) {
            timestampcursor.set($timestampcursor-1);
            e.preventDefault();
        }   
    } else if (e.key=='-') {
        let ts=getTimestamp();
        if (typeof ts=='number'){
            ts-=0.25
            if(ts<0) ts=0.01;
            adjusttime.set(ts);
            audio.currentTime=ts;
            setTimestamp(ts);
        }
    } else if (e.key=='+' || e.key=='=') {
        let ts=getTimestamp();
        if (typeof ts=='number'){
            ts+=0.25
            adjusttime.set(ts);
            audio.currentTime=ts;
            setTimestamp(ts);
        }
    } else if (e.key=='Backspace') {
        seektrack(-3);
        adjusttime.set(audio.currentTime);
    } else if (e.key=='Delete') {
        if ($timestampcursor>0) {
            const cursor=$timestampcursor-1;
            timestampcursor.set(cursor);
            const ts=$timestamps[$activepb][cursor]
            settrack(ts);
            e.preventDefault();
        }
    } else if (num && e.target.nodeName!=='INPUT') {
        seektrack( e.ctrlKey?-num:num);
        e.preventDefault();
    }
    if (document.activeElement==audio) audio.blur()
}
const onplay=()=>{
    playing.set(true)
}
const onpause=()=>{
    playing.set(false)
}
</script>
<svelte:window on:keydown={onKeyDown} /> 
{#key $sutra.audio}
{#if $sutra.audio}
<div>
<audio bind:this={audio} on:play={onplay} on:pause={onpause} controls style={"height:1em;width:"+paneWidth()}>
<source src={$audiopath+$sutra.audio+'.mp3'}/>
</audio>
</div>
{/if}
{/key}
