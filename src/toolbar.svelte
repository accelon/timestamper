<script>
    
import {filehandle,dirty, sutra} from './store.js'
import Player from './player.svelte'
import {save,openjson} from './workfile.js'
</script>

<button disabled={$dirty&&$filehandle} title="alt-p" class="clickable" on:click={openjson}>📂</button>
<button disabled={!$dirty||!$filehandle} title="alt-s" on:click={save}>💾</button>
{$sutra?.caption}
<Player/>