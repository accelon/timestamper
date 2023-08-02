<script>
    
import InputNumber from './comps/inputnumber.svelte'
import {sutras, sutra, thezip,activesutra,activejuan,createTimestamps} from './store.js'
import {loadFolio} from './folio.js'
import {get}  from 'svelte/store'
import Player from './player.svelte'
let value=1;
const selectsutra=(e)=>{
    activesutra.set(e.target.selectedIndex);
    value=1;
}
$: maxjuan=sutras[$activesutra].juancount;
$: {
    loadFolio(sutras[$activesutra].bkid+value,()=>{
        createTimestamps(get(thezip).files.length);
})
};


$: activejuan.set(value);
</script>
<select on:change={selectsutra}>
{#each sutras as sutra,idx}
<option>{sutra.caption}</option>
{/each}
</select>
<InputNumber bind:value max={maxjuan}/>
<Player/>