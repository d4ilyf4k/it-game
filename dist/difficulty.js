export const DIFFICULTIES = Object.freeze({
 junior:{name:'Джун',tag:'Первый выход',description:'Осмотрись, изучи комнату и спокойно разберись с задачей.',times:{sysadmin:600,security:120,frontend:300}},
 middle:{name:'Мидл',tag:'Уверенный темп',description:'Есть время подумать. Но сеть сама себя не восстановит.',times:{sysadmin:420,security:90,frontend:240}},
 senior:{name:'Сеньор',tag:'Работа под давлением',description:'Действуй по плану. Каждый лишний круг стоит времени.',times:{sysadmin:300,security:60,frontend:180}},
 expert:{name:'Сеньор плюс',tag:'Критический режим',description:'Минимум времени. Точные движения. Холодная голова.',times:{sysadmin:240,security:45,frontend:120}}
});
export const difficultyFor=id=>DIFFICULTIES[id]||DIFFICULTIES.junior;
export const storyTime=(id,mission)=>difficultyFor(id).times[mission];
export const clockTime=seconds=>`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;

// Binary glyphs are clipped to a sculpted face; no external image or font is needed.
export function mountBinaryMask(canvas,{motion=true}={}){
 const ctx=canvas.getContext('2d');if(!ctx)return()=>{};
 const hit=document.createElement('canvas').getContext('2d');
 const face=new Path2D('M 0 -205 C -115 -205 -151 -132 -137 -35 C -130 42 -90 144 0 208 C 90 144 130 42 137 -35 C 151 -132 115 -205 0 -205 Z');
 const eye=new Path2D('M -111 -58 Q -74 -88 -27 -47 Q -68 -24 -111 -58 M 111 -58 Q 74 -88 27 -47 Q 68 -24 111 -58');
 const brow=new Path2D('M -116 -89 Q -76 -132 -25 -84 L -29 -72 Q -78 -108 -116 -78 Z M 116 -89 Q 76 -132 25 -84 L 29 -72 Q 78 -108 116 -78 Z');
 const detail=new Path2D('M -14 -39 L -23 29 Q 0 45 23 29 L 14 -39 M -96 48 Q -63 77 -26 57 Q 0 43 26 57 Q 63 77 96 48 M -81 78 Q 0 134 81 78 M -14 122 Q 0 134 14 122 L 0 176 Z');
 let frame=0,last=0,w=0,h=0,disposed=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const animated=motion&&!reduced;
 function resize(){w=canvas.clientWidth;h=canvas.clientHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);}
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 function draw(now){if(disposed)return;if(animated)frame=requestAnimationFrame(draw);if(now-last<45&&last)return;last=now;ctx.clearRect(0,0,w,h);const t=animated?now/1000:0;
 ctx.font='12px monospace';ctx.textAlign='center';
 for(let x=12;x<w;x+=23){const n=Math.floor(x/23);for(let j=0;j<11;j++){const y=((t*(25+n%7*7)+n*119+j*19)%(h+220))-110;ctx.fillStyle=`rgba(77,220,164,${.025+(j/10)*.15})`;ctx.fillText((n+j)%3?'0':'1',x,y);}}
 const scale=Math.min(w/370,h/490);ctx.save();ctx.translate(w/2,h*.48);ctx.scale(scale,scale);ctx.shadowColor='#60ffd3';ctx.shadowBlur=9;
 for(let y=-207;y<211;y+=10){for(let x=-145;x<146;x+=8){if(!hit.isPointInPath(face,x,y)||hit.isPointInPath(eye,x,y)||hit.isPointInPath(brow,x,y))continue;const edge=1-Math.abs(x)/175;const flicker=.85+.15*Math.sin(t*1.4+y*.07+x*.03);ctx.fillStyle=`rgba(${Math.round(90+edge*125)},255,${Math.round(168+edge*70)},${(.3+edge*.6)*flicker})`;ctx.font='9px monospace';ctx.fillText((Math.floor(x/8)+Math.floor(y/10)+Math.floor(t*.5))%3?'0':'1',x,y);}}
 ctx.shadowBlur=0;ctx.strokeStyle='#021d18';ctx.lineWidth=9;ctx.lineCap='round';ctx.stroke(detail);ctx.restore();
 }
 frame=requestAnimationFrame(draw);return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();};
}
