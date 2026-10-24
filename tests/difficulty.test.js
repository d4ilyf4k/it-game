import test from 'node:test';
import assert from 'node:assert/strict';
import {DIFFICULTIES,storyTime,clockTime} from '../dist/difficulty.js';
test('all story missions get strictly less time at every harder level',()=>{for(const mission of ['sysadmin','security','frontend']){const values=Object.keys(DIFFICULTIES).map(id=>storyTime(id,mission));assert.ok(values.every((v,i)=>v>0&&(!i||v<values[i-1])));}});
test('old or invalid saves fall back to junior and sub-minute clocks are accurate',()=>{assert.equal(storyTime(undefined,'sysadmin'),600);assert.equal(storyTime('invalid','security'),120);assert.equal(clockTime(storyTime('expert','security')),'0:45');assert.equal(clockTime(600),'10:00');});
