import {updateSettings,settings} from './savestore.js'
import {writable,derived,get} from 'svelte/store';

export const thezip=writable(null)
export const theaudio=writable(null)
export const images=writable([])
export const maxpage=writable(1);
export const activefolioid=writable('')
export const activejuan=writable(1) ;//onebase
export const timestampcursor=writable(0);
export const stampdelay=writable(0.5);//反應慢的可加大此值
export const folioLines=writable(5); //南藏6行，北藏5行
export const activepb=writable(0); //zero base
export const maxjuan=writable(1);
export const maxline=writable(1);
export const timestamps=writable([]);
const host=document.location.host;
const localhost=~host.indexOf('127.0.0.1')||~host.indexOf('localhost');
export const foliopath=writable(  localhost?'folio/':'https://dharmacloud.github.io/swipegallery/folio/' );
export const audiopath=writable(  localhost?'baudio/':'https://nissaya.cn/baudio/' );
export const FolioChars=17;
// panepos.subscribe((panepos)=>updateSettings({panepos}))

export const paneWidth=(leftside)=>{
    let style='100vw'
    const w=(window.innerHeight * 0.45);
    
    let  r=(w*100/window.innerWidth).toFixed(2);
    if (!leftside) r=100-r;
    style=r+'vw';
    return style;
}


export const activesutra=writable(0);
//no using ptk,  keep nanzang lines=6 here
export const sutras=[
    {bkid:'agmd',caption:'長阿含經',juancount:22, nanzang:[1,3] },
    {bkid:'agmm',caption:'中阿含經',juancount:60, nanzang:[43,45,47,55,56]},
    {bkid:'agms',caption:'雜阿含經',juancount:50, nanzang:[21,32,33,41]},
    {bkid:'agmu',caption:'增一阿含經',juancount:50,nanzang:[31,33,34,35,36,37,38,39]},
]

export const sutra=derived(activesutra, s=>sutras[s]);
export const foliolinecount=derived(activejuan,j=>~sutras[get(activesutra)]?.nanzang?.indexOf(j) ?6:5);

export const createTimestamps=(pbcount)=>{
    const linecount=get(foliolinecount);
    const arr=[];
    for (let i=0;i<pbcount;i++) {
        arr.push(new Array(linecount))
    }
    timestamps.set(arr);
}

export const setTimestamp=(ts)=>{
    const arr=get(timestamps);
    const cursor=get(timestampcursor);
    const o=arr[get(activepb)];
    if (o && cursor<o.length) {
        o[cursor]=ts;
    }
    timestamps.set(arr);
}

export const settrack=t=>{
    get(theaudio).currentTime+=t;
}