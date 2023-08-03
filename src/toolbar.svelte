<script> 
import {filehandle,dirty, sutra} from './store.js'
import Player from './player.svelte'
import {savefile,openfile,newfile} from './workfile.js'
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
</script>
<svelte:window on:keydown={handleKeydown}/>
<button disabled={$dirty&&$filehandle} title="alt-o 開檔" class="clickable" on:click={openfile}>📂</button>
<button disabled={!$dirty||!$filehandle} title="alt-s 存檔" on:click={savefile}>💾</button>

圖<input bind:value={$sutra.folio} size=5/>
音<input bind:value={$sutra.audio} size=5/>
<input bind:value={$sutra.foliolines} size=1/>
<button disabled={$dirty} title="alt-n 新檔" on:click={newfile}>📄</button>

<Player/>