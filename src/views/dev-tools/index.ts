import { browser } from "webextension-polyfill-ts";

browser.devtools.panels.create("Itly", "icon.png", "dev-panel.html");
