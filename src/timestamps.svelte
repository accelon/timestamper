<script>
import {timestamps,activepb,timestampcursor} from './store.js'
import PageTimeStamp from './pagetimestamp.svelte';

const gopage=(pb)=>{
    activepb.set(pb)
}

</script>
<table><tr><td>
<div class="timestamps">
{#each $timestamps as timestamp,idx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div><span class:selected={$activepb==idx} 
    on:click={()=>gopage(idx)} class="pb">{(idx+1).toString().padStart(2,"0")} </span>
    <PageTimeStamp {timestamp} pb={idx} cursor={$activepb==idx?$timestampcursor:-1}  /></div>
{/each}
</div>
</td>
<td>
<div class="help">
誦經時間軸 2023.9.13 
<br/>教學視頻<a href="https://youtu.be/BEv4NZ9b_MY" target=_new>Youtube</a>
<a href="https://nissaya.cn/video/timestamper.mp4" target=_new>無法訪問油管點此</a>
<div>
<br/>輸入圖檔及音檔名稱，行數(北5南6)，按新增。
<br/>上下鍵 上下折
<br/>左右鍵 前後句
<br/>-減0.25秒， =加0.25秒
<br/>空白從游標重播/暫停
<br/>Enter 設定時間戳
<br/>Backspace 往回跳三秒
<br/>Del 修正上一句
<br/>數字 往前跳秒數 1~9, Ctrl-數字 往回跳 
<br/>點綠色數字移到音頻及圖檔位置。
<br/>紅色數字表示錯誤，不得小於之前的時間。
<br/>alt-n 新檔📄 alt-s 存檔💾 alt-o 開檔📂 
<br/>agmd長，agmm中，agms雜，agmu增
</div>
</div>
</td>
</tr></table>