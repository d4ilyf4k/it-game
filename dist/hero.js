import * as T from './vendor/three.module.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
export function createHero(canvas){
 const renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=T.SRGBColorSpace;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(30,1,.1,100);scene.add(new T.HemisphereLight(0xe0efff,0x35455e,2.4));
 for(const[c,x,z,intensity]of [[0xa7dcff,-4,3,4],[0xffcf99,4,2,3],[0x708dff,0,-4,6]]){const l=new T.DirectionalLight(c,intensity);l.position.set(x,5,z);scene.add(l);}
 let model,mixer,disposed=false,raf;const clock=new T.Clock();
 new GLTFLoader().load('assets/student.glb',g=>{if(disposed)return;model=g.scene;const b=new T.Box3().setFromObject(model),size=b.getSize(new T.Vector3()),center=b.getCenter(new T.Vector3());model.position.sub(center);const group=new T.Group();group.add(model);group.scale.setScalar(3/size.y);scene.add(group);model=group;camera.position.set(0,.1,6.8);camera.lookAt(0,0,0);if(g.animations.length){mixer=new T.AnimationMixer(g.scene);const idle=g.animations.find(a=>/idle/i.test(a.name))||g.animations[0];mixer.clipAction(idle).play();}canvas.classList.add('ready');},undefined,()=>{canvas.classList.add('failed');});
 function draw(){raf=requestAnimationFrame(draw);const dt=Math.min(clock.getDelta(),.05);if(document.hidden)return;const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;if(canvas.width!==Math.floor(w*renderer.getPixelRatio())||canvas.height!==Math.floor(h*renderer.getPixelRatio()))renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(model)model.rotation.y=Math.sin(clock.elapsedTime*.3)*.12-.15;mixer?.update(dt);renderer.render(scene,camera);}draw();
 return {dispose(){disposed=true;cancelAnimationFrame(raf);scene.traverse(o=>{o.geometry?.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material?.dispose();});renderer.dispose();}};
}
