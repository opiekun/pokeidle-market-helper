# Design and investigation
Standalone MV3 extension. MAIN-world document_start WebSocket constructor proxy observes market.meus responses; isolated shadow DOM UI uses a narrow message bridge. Only market.meus is sent by helper. Opening uses a temporary .m-anuncio-link under #chat-msgs and its existing click handler, which calls abrirAnuncioNoMercado and sets private cmVerAnuncio before sending market.anuncio.

Evidence: captured app.js lines 32368-32401, 35533-35560, 45498-45500. Piloto manifest uses MAIN at document_start; hook adds message listeners without replacing game handlers. Captured source freshness and live behavior remain unverified.

Plan: implement bridge and UI; test socket behavior and native-click dispatch with mocked DOM; document real-session acceptance checks and IdleDeck installation. No buying/selling commands. No credentials forwarded or persisted.
