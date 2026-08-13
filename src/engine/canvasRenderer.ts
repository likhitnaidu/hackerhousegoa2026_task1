import QRCode from 'qrcode'
import templateUrl from '../card-template.png'
import { colors as c } from '../data/designTokens'
import { cover } from './imageProcessor'

export type BuilderData = { name: string; build: string; stack: string; meet: string; bring: string; care: string; id: string; title: string; photo?: HTMLImageElement }

// Calibrated for jjjjjjjjjjjjjj.png: front 712px wide, 18px inter-card gap, back 718px wide.
const source = { height:1086, front:{x:0,width:712}, back:{x:730,width:718} }
let artwork: Promise<HTMLImageElement> | undefined
function getArtwork(){if(!artwork)artwork=new Promise((ok,bad)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=bad;i.src=templateUrl});return artwork}
function surface(side:'front'|'back'){const crop=source[side],el=document.createElement('canvas');el.width=crop.width;el.height=source.height;return{el,ctx:el.getContext('2d')!,crop}}
function draw(ctx:CanvasRenderingContext2D,text:string,x:number,y:number,size:number,color:string,align:CanvasTextAlign='left'){ctx.fillStyle=color;ctx.font=`700 ${size}px Arial, sans-serif`;ctx.textAlign=align;ctx.fillText(text,x,y)}
function fit(ctx:CanvasRenderingContext2D,text:string,x:number,y:number,max:number,areaH:number){const words=(text||'—').trim().split(/\s+/);let size=words.join(' ').length<12?34:words.join(' ').length<28?27:22;ctx.textAlign='left';ctx.fillStyle=c.cream;ctx.font=`600 ${size}px Arial, sans-serif`;let line='',lines:string[]=[];for(const word of words){if(line&&ctx.measureText(`${line} ${word}`).width>max){lines.push(line);line=word}else line+=`${line?' ':''}${word}`}lines.push(line);while(lines.length*size*1.25>areaH&&size>17){size-=2;ctx.font=`600 ${size}px Arial, sans-serif`;line='';lines=[];for(const word of words){if(line&&ctx.measureText(`${line} ${word}`).width>max){lines.push(line);line=word}else line+=`${line?' ':''}${word}`}lines.push(line)}const total=lines.length*size*1.25;let yy=y+(areaH-total)/2+size*.78;for(const row of lines){ctx.fillText(`• ${row}`,x,yy);yy+=size*1.25}}
function label(ctx:CanvasRenderingContext2D,text:string,x:number,y:number){ctx.fillStyle=c.secondary;ctx.font='700 25px Arial Narrow, Arial, sans-serif';ctx.fillText(text,x,y)}

export async function renderFront(data:BuilderData){const {el,ctx,crop}=surface('front'),art=await getArtwork();ctx.drawImage(art,crop.x,0,crop.width,source.height,0,0,crop.width,source.height)
  // Mask the entire original placeholder circle before photo drawing to prevent the silhouette showing through.
  ctx.save();ctx.beginPath();ctx.arc(358,641,101,0,Math.PI*2);ctx.clip();if(data.photo)cover(ctx,data.photo,257,540,202,202);ctx.restore();ctx.strokeStyle=c.secondary;ctx.lineWidth=2;ctx.beginPath();ctx.arc(358,641,101,0,Math.PI*2);ctx.stroke()
  const payload=JSON.stringify({event:'Hacker House Goa 2026',builderId:data.id,name:data.name,title:data.title,build:data.build,stack:data.stack,meet:data.meet,bring:data.bring,care:data.care})
  const qr=await QRCode.toDataURL(payload,{margin:1,width:250,color:{dark:c.dark,light:c.cream}}),qi=new Image();qi.src=qr;await qi.decode();ctx.drawImage(qi,82,785,150,150)
  // The new template deliberately leaves the identity field clean and empty.
  // Replace the template's sample identity badge with one generated identity block.
  ctx.fillStyle=c.cream;ctx.fillRect(282,806,332,144)
  draw(ctx,(data.name||'YOUR NAME').toUpperCase(),304,837,34,c.dark)
  draw(ctx,data.title,304,876,22,c.accent)
  ctx.fillStyle=c.dark;ctx.beginPath();ctx.roundRect(304,893,288,47,15);ctx.fill()
  draw(ctx,data.id,448,924,21,c.secondary,'center');return el}

export async function renderBack(data:BuilderData){const {el,ctx,crop}=surface('back'),art=await getArtwork();ctx.drawImage(art,crop.x,0,crop.width,source.height,0,0,crop.width,source.height)
  // Labels and values use the blank, purpose-built zones on this supplied version.
  label(ctx,'I BUILD',128,383);fit(ctx,data.build,69,408,260,85)
  label(ctx,'I WANT TO MEET',454,383);fit(ctx,data.meet,389,408,275,85)
  label(ctx,'MY STACK',128,574);fit(ctx,data.stack,69,600,260,84)
  label(ctx,'I BRING',454,574);fit(ctx,data.bring,389,600,275,84)
  label(ctx,'I CARE ABOUT',128,762);fit(ctx,data.care,69,784,260,47)
  label(ctx,'LOCATION',454,762);draw(ctx,'GOA, INDIA',389,802,24,c.accent);draw(ctx,'15.4909° N, 73.8278° E',389,834,18,c.cream)
  return el}

export async function renderSheet(data:BuilderData){const front=await renderFront(data),back=await renderBack(data),out=document.createElement('canvas');out.width=front.width+18+back.width;out.height=source.height;const ctx=out.getContext('2d')!;ctx.fillStyle='#050805';ctx.fillRect(0,0,out.width,out.height);ctx.drawImage(front,0,0);ctx.drawImage(back,front.width+18,0);return out}
