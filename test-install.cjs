const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),vm=require('node:vm'),assert=require('node:assert/strict');
const data=fs.mkdtempSync(path.join(os.tmpdir(),'pmh-test-'));
const source=fs.mkdtempSync(path.join(os.tmpdir(),'pmh-source-'));
try{
for(const name of ['manifest.json','bridge.js','ui.js'])fs.copyFileSync(path.join(__dirname,name),path.join(source,name));
const original={slots:[{id:'one',extensions:[{id:'existing',enabled:true}]},{id:'two',extensions:[]}],untouched:42};
fs.writeFileSync(path.join(data,'config.json'),JSON.stringify(original));
let code=fs.readFileSync(path.join(__dirname,'install.mjs'),'utf8').replace(/^import .*;\r?\n/gm,'').replace('const here=path.dirname(fileURLToPath(import.meta.url));','const here=source;');
const run=()=>vm.runInNewContext(code,{fs,path,crypto,source,Buffer,process:{argv:['node','install','--data',data],platform:'win32',env:{}},execFileSync:()=>'',console});
run();const first=JSON.parse(fs.readFileSync(path.join(data,'config.json')));run();const second=JSON.parse(fs.readFileSync(path.join(data,'config.json')));
assert.equal(second.untouched,42);assert.equal(second.slots[0].extensions[0].id,'existing');assert.equal(second.slots[0].extensions.length,2);assert.equal(first.slots[1].extensions[0].id,second.slots[1].extensions[0].id);assert(fs.readdirSync(data).some(n=>n.endsWith('.bak')));
console.log('PASS: fixture install, stable identity, repeat installation, existing extensions preserved, backup.');
}finally{fs.rmSync(data,{recursive:true,force:true});fs.rmSync(source,{recursive:true,force:true});}
