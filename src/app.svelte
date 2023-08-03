<script>
import FolioView from './folioview.svelte'
import FolioLastLineView from './foliolastlineview.svelte'
import Toolbar from './toolbar.svelte'
import TimeStamps from './timestamps.svelte'
import { onMount } from 'svelte';
import { loadSutra } from './workfile.js';

onMount(()=>{
    loadSutra({"folio":"agmd1","audio":"agmd1","caption":"長阿含經卷一（試作無法存檔）","foliolines":6, "timestamps":[]});
})
</script>

<div class="app">
        <div class="pane" style={"width:24vw"}><FolioView/></div>
        <div class="pane" style={"width:4vw"}><FolioLastLineView/></div>
        <div class="pane" style={"width:70vw"}>
            <Toolbar/>
            <TimeStamps/>       
        </div>
</div>
<style>
.app {height:100vh;display: flex;flex-direction: row;} /* splitpane divider need this */
</style>