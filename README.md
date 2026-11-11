# PokeIdle Market Helper

Standalone Manifest V3 extension for viewing your active PokeIdle Community Market listings and opening native listing popups by ID. Includes a compact interface styled to match the game. No automatic buying or selling.

Version 0.2.0. User confirmed functionality and visual appearance in IdleDeck.

## Chromium
Open chrome://extensions or edge://extensions, enable Developer mode, choose Load unpacked, select this directory. Reload PokeIdle and connect normally. Click Market Helper. Refresh retrieves current account listings; Open Listing invokes the existing native chat listing-click handler. Purchases remain in the game UI.

## IdleDeck
IdleDeck is not a stock Chrome extension manager. Existing local Piloto installer demonstrates `%APPDATA%/IdleDeck/extensions/<extension-id>/<version>` plus version metadata and `config.json` per-slot `extensions` entries. The app must be fully closed before changing its registry; running IdleDeck can overwrite disk changes. Do not run Piloto's installer against it: that installer uses Piloto's identity. Dedicated installer included: fully quit IdleDeck from its tray, run `node install.mjs`, then reopen IdleDeck. `node install.mjs --dry-run` reports slot count without writes. Installer preserves existing extensions and backs up config; independent public key identity lives in identity.json. Keep it for updates.

## Validation
Run `node test.cjs` and `node test-install.cjs`. Mock tests establish bridge behavior, not real-game compatibility.

Detailed acceptance checklist (individual cases not all independently recorded): load without Piloto; seller sees seven expected active listings with correct names/quantity/unit price/currency; copy each/all IDs; filter; open an item and Pokemon from buyer account; verify native popup; invalid/missing/closed listing; disconnect/reconnect; reload without manual debugging; coexist with Piloto; verify no purchases occur; repeat in IdleDeck.

## Limits
Captured source verifies market.meus and native .m-anuncio-link routing. User confirmed the installed helper works in IdleDeck; compatibility with future game versions and other browsers requires testing. Temporary hidden button is appended to #chat-msgs, clicked, then removed. If the game's handler changes, lookup may time out. A server response confirms availability, not visible popup success. Names fall back to numeric identifiers when response lacks ficha.nome. No credentials stored, no telemetry, no automatic buying/selling. Refresh is manual; data timestamp shown and disconnect clears rows. Listing history is not stored.

## Development

Requires Node.js for tests and IdleDeck installation; Chromium loading needs no build step.

```sh
node --check bridge.js
node --check ui.js
node test.cjs
node test-install.cjs
```

`identity.json` is generated locally by the installer and excluded from Git. Preserve it to keep the same IdleDeck extension ID across updates. Installation creates a backup of IdleDeck config and preserves other extensions.

## Credits

Integration approach studied from [PokeIdle Piloto](https://github.com/DredsGG/pokeidle-piloto). Independent extension; not affiliated with PokeIdle or Pokémon.
