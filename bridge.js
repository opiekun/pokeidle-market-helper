(() => {
  'use strict';
  const Native = window.WebSocket;
  let socket = null;
  const emit = (kind, data = {}) => window.postMessage({source: 'pmh:page', kind, ...data}, location.origin);
  window.WebSocket = new Proxy(Native, {
    construct(target, args, newTarget) {
      const ws = Reflect.construct(target, args, newTarget);
      let url; try { url = new URL(args[0], location.href); } catch { return ws; }
      if (url.host !== location.host || !['ws:', 'wss:'].includes(url.protocol)) return ws;
      ws.addEventListener('message', event => {
        if (typeof event.data !== 'string') return;
        let m; try { m = JSON.parse(event.data); } catch { return; }
        if (m.t !== 'market') return;
        socket = ws;
        if (m.aba === 'meus' && Array.isArray(m.linhas)) {
          emit('listings', {rows: m.linhas.filter(a => a.estado === 'aberto').map(a => ({
            id: a.id, name: String(a.ficha?.nome || a.pokemon?.nome || a.pokemon?.speciesId || a.speciesId || a.itemId || a.tipo),
            quantity: a.qtd ?? 1, price: a.preco, currency: a.moeda
          }))});
        }
        if (m.aba === 'anuncio') emit('opened', {id:m.id, available: !!m.anuncio && m.anuncio.estado === 'aberto'});
      });
      ws.addEventListener('open', () => { socket = ws; emit('connected'); });
      ws.addEventListener('close', () => { if (socket === ws) {socket = null; emit('disconnected');} });
      return ws;
    }
  });
  window.addEventListener('message', event => {
    if (event.source !== window || event.origin !== location.origin || event.data?.source !== 'pmh:ui') return;
    const {kind, id} = event.data;
    if (kind === 'refresh') {
      if (!socket || socket.readyState !== Native.OPEN) return emit('error', {message:'Disconnected. Reload after installing, then connect to game.'});
      socket.send(JSON.stringify({t:'market.meus'}));
    } else if (kind === 'open') {
      if (!Number.isSafeInteger(id) || id <= 0) return emit('error', {message:'Enter a positive safe integer.'});
      const chat = document.querySelector('#chat-msgs');
      if (!chat || !socket || socket.readyState !== Native.OPEN) return emit('error', {message:'Game is not ready. Connect and retry.'});
      const link = document.createElement('button');
      link.className = 'm-anuncio-link'; link.dataset.anuncio = String(id); link.hidden = true;
      chat.appendChild(link);
      try { link.click(); } finally { link.remove(); }
    }
  });
})();
