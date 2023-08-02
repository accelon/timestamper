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
    on:click={()=>gopage(idx)} class="pb">{(idx+1)+" "} </span>
    <PageTimeStamp {timestamp} pb={idx} cursor={$activepb==idx?$timestampcursor:-1}  /></div>
{/each}
</div>
</td>
<td>
<div class="help">
<br/>上鍵 N 下一折 ,下鍵  R 上一折
<br/>右鍵 左鍵 移動句子
<br/>空白 播放/暫停
<br/>Enter 設定時間戳(綠色)
<br/>Backspace 往回跳三秒
<br/>Del  清除本頁所有時間戳
<br/>數字 往前跳秒數 1~9, Ctrl-數字 往回跳秒數 
<br/>點綠色數字移到音頻及圖檔位置。
</div>
</td>
</tr></table>