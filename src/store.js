import {updateSettings,settings} from './savestore.js'
import {writable,derived,get} from 'svelte/store';

export const thezip=writable(null)
export const foliosrc=writable('')
export const theaudio=writable(null)
export const playing=writable(false)
export const images=writable([])
export const maxpage=writable(1);
export const timestampcursor=writable(-1);
export const stampdelay=writable(0.5);//反應慢的可加大此值
export const activepb=writable(0); //zero base
export const maxjuan=writable(1);
export const maxline=writable(1);
export const timestamps=writable([]);
const host=document.location.host;
const localhost=~host.indexOf('127.0.0.1')||~host.indexOf('localhost');
export const foliopath=writable(  localhost?'folio/':'https://dharmacloud.github.io/swipegallery/folio/' );
export const audiopath=writable(  localhost?'baudio/':'https://nissaya.cn/baudio/' );

export const filehandle=writable(null);
export const dirty=writable(0)
export const FolioChars=17;
// panepos.subscribe((panepos)=>updateSettings({panepos}))

export const paneWidth=(leftside,ratio=1)=>{
    let style='100vw'
    const w=(window.innerHeight * 0.46)*ratio;
    
    let  r=(w*100/window.innerWidth).toFixed(2);
    if (!leftside) r=100-r;
    style=r+'vw';
    return style;
}

export const sutra=writable({});


export const setTimestamp=(ts)=>{
    const arr=get(timestamps);
    const cursor=get(timestampcursor);
    const o=arr[get(activepb)];
    if (o && cursor<o.length) {
        o[cursor]=ts;
    }
    timestamps.set(arr);
    dirty.set( get(dirty)+1);
}

export const seektrack=t=>{
    get(theaudio).currentTime+=t;
}
export const settrack=t=>{
    get(theaudio).currentTime=t;
}