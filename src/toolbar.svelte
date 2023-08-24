<script> 
import {filehandle,dirty, sutra,theaudio,humantime,adjusttime} from './store.js'
import Player from './player.svelte'
import {debounce} from 'ptk'
import {savefile,openfile,newfile} from './workfile.js'
import Slider from './3rdparty/rangeslider.svelte'
let rate=[100,0];
function handleKeydown(evt) {
    const key=evt.key.toLowerCase();
    const alt=evt.altKey;
    if (key=='f5') {//prevent refresh accidently
       // evt.preventDefault();
        return;
    } else if (key=='o' && alt) {
        openfile();
    } else if (key=='s' && alt) {
        savefile();
    } else if (key=='s' && alt) {
        newfile();
    }
}
const setPlayrate=e=>{
    const rate=e.detail[0];
    $theaudio.playbackRate=rate/100;
}

</script>
<svelte:window on:keydown={handleKeydown}/>
<button disabled={$dirty&&$filehandle} title="alt-o 開檔" class="clickable" on:click={openfile}>📂</button>
<button disabled={!$dirty||!$filehandle} title="alt-s 存檔" on:click={savefile}>💾</button>
圖<input bind:value={$sutra.folio} size=5/>
音<input bind:value={$sutra.audio} size=5/>
<input bind:value={$sutra.foliolines} size=1/>
<button disabled={$dirty} title="alt-n 新檔" on:click={newfile}>📄</button>
{humantime($adjusttime,true)}
<Slider bind:value={rate} on:input={debounce(setPlayrate,300)} max={300} min={30} >
    <span slot="caption"　style="float:right">{rate[0]}播放速度</span>
</Slider>


<Player/>