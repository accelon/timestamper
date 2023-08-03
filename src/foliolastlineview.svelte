<script>
import {activepb,thezip,sutra} from './store.js'

let canvas;
const loadimage=()=>{
    const pb=$activepb;
    const ctx=canvas?.getContext('2d');;
    if (pb>0) {
        const blob=new Blob([$thezip.files[pb-1].content]);
    
        const img=document.createElement('IMG');
        img.src=URL.createObjectURL(blob);
        setTimeout(()=>{
            
                canvas.width=img.naturalWidth / $sutra.foliolines;
                canvas.height=img.naturalHeight;
                
                ctx.drawImage(img, 0, 0 , canvas.width, canvas.height, 0,0,canvas.width,canvas.height); 
        },50)

    } else {
        if(ctx)ctx.fillStyle='#333333';
        ctx?.fillRect(0,0,canvas.width,canvas.height)
    }
}
$: loadimage($activepb,$sutra)
</script>
<div class="container">
    <canvas bind:this={canvas}>
</div>

<style>
.container{
    z-index:999;
    height: 100vh;
}
canvas {height:100%}
</style>