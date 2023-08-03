<script>
import {images,thezip,timestampcursor,activepb,maxpage,FolioChars,sutra,foliosrc} from './store.js'
import Swipe from './3rdparty/swipe.svelte';
import SwipeItem from './3rdparty/swipeitem.svelte';
import { get } from 'svelte/store';

$: defaultIndex=$maxpage-1;
let swiper,swiping=false;
let message='loading',stableleft;
$: totalpages=$maxpage;
const swipeConfig = {
    autoplay: false,
    delay: 0,
    showIndicators: false,
    transitionDuration: 250
};
const imageFrame=()=>{
    const img=document.getElementsByClassName('swipe')[defaultIndex];
	if (!img || !img.clientHeight) return [0,0,0,0];
    
	const r=img.clientHeight / img.naturalHeight;
    const rect=img.getBoundingClientRect();
    if (rect.left<0) {//還沒捲好
        rect.left=stableleft;
    } else {
        stableleft=rect.left; //穩定的
    }
	const w=img.naturalWidth * r;
	const left=Math.floor((img.clientWidth- w)/2) + rect.x;
	return {left,top:rect.y,width:w,height:img.clientHeight} ;
}
const mousewheel=(e)=>{
    if (e.deltaY>0) {
        swiper.prevItem();
    } else {
        swiper.nextItem();
    }
    e.preventDefault();
}
const swipeChanged=(obj)=>{
    const {active_item}=obj.detail;
    defaultIndex=active_item;
    let i=totalpages- defaultIndex-1;
    const wrapper=document.getElementsByClassName("swipeable-slot-wrapper")[0];
    if (!wrapper) return;
    swiping=true;

    const newpb=totalpages- defaultIndex -1 ;
    activepb.set(newpb );

    const ele=wrapper.childNodes[defaultIndex]?.firstChild?.firstChild;
    if (!ele || !ele.src) return;
    if (~ele.src.indexOf('blank')) {
        const blob=new Blob([get(thezip).files[i].content]);
        ele.src=imgs[i]=URL.createObjectURL(blob);
    }
    if (i+1<totalpages) { //buffer next page for smooter swipe
        i++
        const ele=wrapper.childNodes[defaultIndex-1]?.firstChild.firstChild;
        if (~ele?.src.indexOf('blank')) {
            const blob=new Blob([get(thezip).files[i].content]);
            ele.src=imgs[i]=URL.createObjectURL(blob);
        }
    }
    setTimeout(()=>{
        swiping=false;
    },100);
    
}
const gotoPb=(pb)=>{
    if (swiping||!$maxpage || !swiper)return;//not loaded yet
    const go=$maxpage-parseInt(pb) -1 ;
    if (go!==defaultIndex) {
        // console.log('goto',pb, go, defaultIndex)
        swiper.goTo(go);
    }

}
const folioCursorStyle=(line,ch=0)=>{
    const frame=imageFrame()
    const unitw=(frame.width/$sutra.foliolines)||0;
    const unith=(frame.height/FolioChars)||0;
    const left=Math.floor(($sutra.foliolines-line-1)*unitw);
    const top=Math.floor(unith*ch)-6;
    const style=`left:${left}px;top:${top}px;width:${unitw}px;height:${unith}px`;
    return style;
}
$: imgs= $images;
$: gotoPb($activepb)
    //{previewimages[previewimages.length-idx-1]
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="swipe-holder" on:wheel={mousewheel} >
{#if $foliosrc}
<Swipe bind:this={swiper} {...swipeConfig} {defaultIndex} on:click={onclick} on:change={swipeChanged}>
    {#each imgs as image,idx}
    <SwipeItem><img alt='no' class="swipe"  src={imgs[imgs.length-idx-1]}/></SwipeItem>
    {/each}    
</Swipe>
<div class="foliocursor" style={folioCursorStyle($timestampcursor)}></div>
<span class="pagenumber">{totalpages-defaultIndex}</span>
{:else}
{message}
{/if}
</div>
<style>
.swipe-holder{
    z-index:999;
    height: 100vh;
}
.swipe {height:100vh;top:0%;left:0%;transform: translate(-0%,-0%); }
</style>