import test from 'node:test';
import assert from 'node:assert/strict';
import {createNetwork,beginCapture,tickNetwork,cloak,canCapture} from '../dist/network-game.js';
const advance=(s,seconds)=>{for(let i=0;i<seconds*20;i++)tickNetwork(s,.05);};
test('only adjacent nodes can be captured; no double capture',()=>{const s=createNetwork();assert.equal(beginCapture(s,6),false);assert.equal(beginCapture(s,2),true);assert.equal(beginCapture(s,1),false);advance(s,3.1);assert.ok(s.owned.includes(2));assert.equal(canCapture(s,4),true);assert.equal(canCapture(s,2),false);});
test('shield route reaches goal; victory stays terminal',()=>{const s=createNetwork();for(const id of [2,4,5,6]){assert.equal(beginCapture(s,id),true);advance(s,3.1);}assert.equal(s.won,true);assert.equal(s.shield,true);advance(s,100);assert.equal(s.lost,false);});
test('idle active session is detected; fresh retry and cloak are bounded',()=>{const s=createNetwork();advance(s,100);assert.equal(s.trace,0);beginCapture(s,1);advance(s,100);assert.equal(s.lost,true);assert.equal(beginCapture(s,3),false);const fresh=createNetwork();fresh.trace=10;assert.equal(cloak(fresh),true);assert.equal(fresh.trace,0);assert.equal(cloak(fresh),false);});
