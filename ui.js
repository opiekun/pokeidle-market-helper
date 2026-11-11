(() => {
  const host = document.createElement('div'); document.documentElement.appendChild(host);
  const root = host.attachShadow({mode:'closed'});
  root.innerHTML = `<style>
  :host{all:initial}*{box-sizing:border-box}[hidden]{display:none!important}
  #wrap{--edge:#480e1e;--wood:#ab6e50;--cream:#f1d3b7;--gold:#e7a86d;--plum:#30212c;--muted:#c9a9b4;position:fixed;right:16px;bottom:16px;z-index:2147483647;font:500 13px/1.4 "Barlow","Segoe UI",sans-serif;color:#fff6ef;font-variant-numeric:tabular-nums;color-scheme:dark}
  button,input{font:inherit}button{cursor:pointer;color:#f5cdb9;font-weight:700;border:2px solid var(--edge);border-radius:5px;padding:8px 13px;background:linear-gradient(#e7a86d 0 3px,#914850 3px 6px,#ab6e50 6px calc(100% - 5px),#cf8b50 calc(100% - 5px));box-shadow:inset 0 0 0 1px #f1d3b7,0 2px 0 #722c3f;text-shadow:0 1px 1px #480e1e;min-height:34px}
  button:hover{filter:brightness(1.12)}button:active{transform:translateY(1px);box-shadow:inset 0 0 0 1px #f1d3b7}button:focus-visible,input:focus-visible{outline:2px solid #ffe9a3;outline-offset:3px}
  button[aria-selected="true"],#go,#toggle,#close{color:white;background:linear-gradient(#ffdef0 0 2px,#8d49b8 2px 6px,#b25dd0 6px calc(100% - 6px),#e77ad2 calc(100% - 6px) calc(100% - 3px),#8d49b8 calc(100% - 3px))}
  #toggle{padding:9px 16px}#toggle::before{content:"â—†";color:#ffa7d7;margin-right:8px;text-shadow:1px 1px #480e1e}
  section{background:var(--wood);border:2px solid var(--edge);border-radius:8px;padding:14px;width:min(720px,calc(100vw - 32px));max-height:calc(100dvh - 90px);overflow:auto;margin-bottom:10px;box-shadow:inset 0 0 0 2px #f1d3b7,inset 0 0 0 5px #914850,inset 0 -9px 0 #cf8b50,0 5px 0 #301421,0 12px 32px #160d1980}
  header{display:flex;align-items:center;gap:10px;margin-bottom:15px}h2{margin:0;flex:1;font:700 17px Tahoma,Verdana,sans-serif;text-transform:uppercase;letter-spacing:.3px;text-shadow:1px 1px #480e1e,-1px -1px #480e1e,1px -1px #480e1e,-1px 1px #480e1e}h2 span{color:#ffa7d7;margin-right:8px}#close{font:700 22px/1 Tahoma;padding:3px;width:35px;height:35px}
  nav{display:flex;gap:7px;margin-bottom:12px}nav button{min-width:130px}.tools{display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap}.tools input{flex:1;min-width:140px}
  input{background:#30212c;color:#fff6ef;border:2px solid #480e1e;border-radius:4px;padding:9px 10px;min-width:0;box-shadow:inset 0 1px 2px #160d1940}input::placeholder{color:#c9a9b4}
  #list,#open{background:#30212c;border:2px solid #722c3f;border-radius:5px;padding:12px}#open label{display:block;color:#f5cdb9;font-weight:700;margin:0 0 12px}#id{display:block;margin-top:7px;width:100%}.hint{color:#c9a9b4;margin:0 0 16px;font-size:12px}
  .table-wrap{overflow:auto;max-height:48vh;border:1px solid #5c3948;border-radius:4px}table{width:100%;border-collapse:collapse;white-space:nowrap}th{position:sticky;top:0;background:#462b39;color:#c9a9b4;font:700 10px Tahoma,sans-serif;text-transform:uppercase;letter-spacing:.4px;text-align:left;padding:10px 9px;border-bottom:1px solid #722c3f}td{padding:9px;border-bottom:1px solid #5c3948}td:nth-child(2){white-space:normal;min-width:120px;font-weight:700}td:nth-child(5){color:#ffa7d7}tbody tr:nth-child(even){background:#382531}tbody tr:hover{background:#462b39}td button{font-size:11px;min-height:28px;padding:5px 9px}tbody:empty::after{content:"Refresh to load your active listings.";display:block;color:#c9a9b4;padding:22px 12px;white-space:normal;width:250px}
  #status{line-height:1.5;color:#f5cdb9;background:#462b39;border:1px solid #722c3f;border-radius:4px;margin:12px 0 5px;padding:8px 10px;font-size:12px}
  @media(max-width:520px){#wrap{right:8px;bottom:8px}section{width:calc(100vw - 16px);padding:12px}nav button{flex:1;min-width:0}.tools button{flex:1}h2{font-size:15px}}
  </style>
  <div id="wrap"><section hidden aria-label="Market Helper"><header><h2><span aria-hidden="true">â—†</span>Market Helper</h2><button id="close" aria-label="Close Market Helper">Ã—</button></header><nav role="tablist" aria-label="Market Helper views"><button id="seller" role="tab" aria-selected="true" aria-controls="list">My Listings</button><button id="buyer" role="tab" aria-selected="false" aria-controls="open">Open Listing</button></nav><div id="list" role="tabpanel" aria-labelledby="seller"><div class="tools"><button id="refresh">Refresh Listings</button><button id="all">Copy All IDs</button><input id="filter" placeholder="Filter listings" aria-label="Filter listings"></div><div class="table-wrap"><table><thead><tr><th>ID</th><th>Item</th><th>Quantity</th><th>Price</th><th>Currency</th><th>Action</th></tr></thead><tbody></tbody></table></div></div><div id="open" role="tabpanel" aria-labelledby="buyer" hidden><p class="hint">Enter a listing ID to view it in the gameâ€™s market.</p><label>Listing ID <input id="id" inputmode="numeric"></label> <button id="go">Open Listing</button></div><p id="status" role="status">Refresh to retrieve current listings.</p></section><button id="toggle">Market Helper</button></div>`;
  const $ = s => root.querySelector(s); let rows = [], timer;
  const status = text => { $('#status').textContent = text; };
  const send = (kind, data={}) => {clearTimeout(timer); window.postMessage({source:'pmh:ui',kind,...data},location.origin); status('Waiting for gameâ€¦'); timer=setTimeout(()=>status('No response. Check connection; reload if extension was just installed.'),12000);};
  const copy = async text => {try {await navigator.clipboard.writeText(text);status('Copied.');} catch {status('Clipboard unavailable. Select listing ID and copy manually.');}};
  function render(){
    const body=$('tbody'); body.replaceChildren();
    const q=$('#filter').value.toLowerCase();
    for(const a of rows.filter(a=>`${a.id} ${a.name}`.toLowerCase().includes(q))){
      const tr=document.createElement('tr');
      for(const value of [a.id,a.name,a.quantity,a.price,a.currency==='orb'?'Gems':a.currency]){const td=document.createElement('td');td.textContent=String(value ?? 'â€”');tr.append(td);}
      const td=document.createElement('td'), b=document.createElement('button');b.textContent='Copy ID';b.onclick=()=>copy(String(a.id));td.append(b);tr.append(td);body.append(tr);
    }
  }
  $('#toggle').onclick=()=>{$('section').hidden=!$('section').hidden;};$('#close').onclick=()=>{$('section').hidden=true;};
  function selectTab(buyer) {
    $('#list').hidden = buyer; $('#open').hidden = !buyer;
    $('#seller').setAttribute('aria-selected', String(!buyer));
    $('#buyer').setAttribute('aria-selected', String(buyer));
    if (buyer) $('#id').focus();
  }
  $('#seller').onclick=()=>selectTab(false);$('#buyer').onclick=()=>selectTab(true);
  $('#refresh').onclick=()=>send('refresh');$('#filter').oninput=render;$('#all').onclick=()=>copy(rows.map(a=>a.id).join('\n'));
  $('#go').onclick=()=>{const text=$('#id').value.trim(),id=Number(text);if(!/^\d+$/.test(text)||!Number.isSafeInteger(id)||id<=0)return status('Enter a positive safe integer.');send('open',{id});};
  window.addEventListener('message',e=>{
    if(e.source!==window||e.origin!==location.origin||e.data?.source!=='pmh:page')return;
    const m=e.data;
    if(m.kind==='listings'){clearTimeout(timer);rows=m.rows;render();status(rows.length?`${rows.length} active listings. Updated ${new Date().toLocaleTimeString()}`:'No active listings.');}
    if(m.kind==='opened'){clearTimeout(timer);status(m.available?'Listing received; check native game popup.':'Listing unavailable or closed.');}
    if(m.kind==='error'){clearTimeout(timer);status(m.message);}
    if(m.kind==='disconnected'){rows=[];render();status('Disconnected. Listings cleared; reconnect then refresh.');}
    if(m.kind==='connected')status('Connected. Refresh listings when ready.');
  });
})();
