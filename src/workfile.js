import {verifyPermission} from "ptk"
import { loadFolio } from "./folio.js";
import {get} from 'svelte/store'
import { sutra,filehandle,timestamps,dirty } from "./store.js";
const pickerOpts = {
    types: [{description: "json",accept: {"json/*": [".json"] }}],
    excludeAcceptAllOption: true,
    multiple: false,
};

const createTimestamps=(pbcount,linecount)=>{
    const arr=[];
    for (let i=0;i<pbcount;i++) {
        arr.push(new Array(linecount))
    }
    return arr;
}

export const savefile=async ()=>{
    const fh=get(filehandle);
    if (!fh) return;//test
    get(sutra).timestamps=get(timestamps);

    if (await verifyPermission( fh,true)) {
        const writable = await fh.createWritable();
        await writable.write(  JSON.stringify(get(sutra),'',' ') );
        await writable.close()
        dirty.set(0);
    }
}
export const loadSutra=(json)=>{

    if (!json.audio) json.audio=json.folio;

    if (!json.foliolines) json.foliolines=5;
    loadFolio(json.folio,(pbcount)=>{
        if (!json.timestamps||!json.timestamps.length) {
            json.timestamps=createTimestamps(pbcount,json.foliolines);
        } else {
            json.timestamps.length=pbcount;
        }
        timestamps.set(json.timestamps);
    })
    sutra.set(json);
}

export const openfile=async ()=>{
    const filehandles = await window.showOpenFilePicker(pickerOpts);
    const f=filehandles[0];
    const workingfile=await f.getFile();
    const text=await workingfile.text();
    let json={};
    try {
        json=JSON.parse(text);
    } catch(e){
        console.error(e);
    }

    loadSutra(json)
 
    filehandle.set(filehandles[0]);
}

export const newfile=async ()=>{
    const newfile=await window.showSaveFilePicker(pickerOpts);
    
    const json=Object.assign({},get(sutra));
    console.log(get(sutra),json)
    json.timestamps=createTimestamps(json.foliolines||5);
    loadSutra(json);
    filehandle.set(newfile);
    savefile();
}