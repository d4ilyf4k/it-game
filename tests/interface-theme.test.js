import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeTheme,buttonInk} from '../dist/interface-theme.js';
test('stored palette validates colors and retains custom choice',()=>{assert.equal(normalizeTheme({mode:'custom',colors:{bg:'#abcdef',text:'url(x)'}}).colors.bg,'#abcdef');assert.equal(normalizeTheme({colors:{text:'url(x)'}}).colors.text,'#e7eef8');assert.equal(normalizeTheme({mode:'invalid'}).mode,'dark');});
test('button labels stay legible on extreme custom colors',()=>{assert.equal(buttonInk('#ffffff'),'#07101c');assert.equal(buttonInk('#000000'),'#ffffff');});
