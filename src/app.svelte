<script>
import FolioView from './folioview.svelte'
import Toolbar from './toolbar.svelte'
import TimeStamps from './timestamps.svelte'
import {paneWidth} from './store.js'

</script>

<div class="app">
<table>
    <tr>
        <td  style={"width:"+paneWidth(true)}><FolioView/></td>
        <td class="pane">
            <Toolbar/>
            <TimeStamps/>       
        </td>
    </tr>
</table>
</div>
<style>
.app {height:100vh} /* splitpane divider need this */
</style>