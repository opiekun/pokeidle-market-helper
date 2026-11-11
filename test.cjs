const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const events={},out=[],sent=[];let clicked=false,removed=false;
class Socket{static OPEN=1;constructor(){this.readyState=1;this.listeners={};}addEventListener(k,f){this.listeners[k]=f;}send(s){sent.push(JSON.parse(s));}}
const window={WebSocket:Socket,postMessage:m=>out.push(m),addEventListener:(k,f)=>events[k]=f};
const document={querySelector:()=>({appendChild(){}}),createElement:()=>({dataset:{},click(){clicked=true;},remove(){removed=true;}})};
vm.runInNewContext(fs.readFileSync(__dirname+'/bridge.js','utf8'),{window,document,location:{origin:'https://pokeidle.io',host:'pokeidle.io',href:'https://pokeidle.io/'},URL,console});
const ws=new window.WebSocket('wss://pokeidle.io');ws.listeners.open();
const command=data=>events.message({source:window,origin:'https://pokeidle.io',data:{source:'pmh:ui',...data}});
command({kind:'refresh'});assert.equal(sent[0].t,'market.meus');
ws.listeners.message({data:JSON.stringify({t:'market',aba:'meus',token:'never-forward',linhas:[{id:1,estado:'aberto',ficha:{nome:'Stone'},qtd:2,preco:3,moeda:'orb'},{id:2,estado:'fechado'}]})});
assert.equal(out.at(-1).rows.length,1);assert(!JSON.stringify(out).includes('never-forward'));
command({kind:'open',id:-1});assert(!clicked);command({kind:'open',id:123});assert(clicked&&removed);
command({kind:'buy',id:1});assert.equal(sent.length,1);
ws.listeners.close();command({kind:'refresh'});assert.equal(out.at(-1).kind,'error');
console.log('PASS: exact refresh request, active-only projection, no token forwarding, ID validation, native-click dispatch, command allowlist, disconnect.');
