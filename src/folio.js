import {ZipStore} from 'ptk/zip';
import {thezip,images,foliopath,maxpage,timestampcursor,activepb,foliosrc,dirty} from './store.js'
import {get} from 'svelte/store'
export const loadFolio=async (folio,cb)=>{
    
    if (!folio) return;
    const imgs=[]
    const src=get(foliopath)+folio+".zip";
    if (get(foliosrc).src==src) {//same
        cb&&cb(get(thezip).files.length);
        return;
    }
    foliosrc.set('');
    let res=null,buf=null,zip=null;
    try {
        res=await fetch(src);
        buf=await res.arrayBuffer();
        zip=new ZipStore(buf);
    } catch (e) {
        message='cannot load '+src
        return;
    }
    thezip.set(zip);
    imgs.length=0;
    for (let i=0;i<zip.files.length;i++) {
        if (i==zip.files.length-1) {
            const blob=new Blob([zip.files[i].content]);
            imgs.push(URL.createObjectURL(blob));
        } else {
            imgs.push('blank.png');
        }
    }    
    images.set(imgs);
    maxpage.set(zip.files.length)
    setTimeout(()=>{
        activepb.set(0);
        timestampcursor.set(0);
        cb&&cb(zip.files.length);
        dirty.set(0)
        foliosrc.set(src); //trigger folioview
    },100)
}