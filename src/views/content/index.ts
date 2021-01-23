import { browser } from "webextension-polyfill-ts";

(async (): Promise<void> => {
    await browser.runtime.sendMessage({
        type: "FOO",
        payload: {
            bar: "bar",
        },
    });
})();

console.log("Hello world content script");
