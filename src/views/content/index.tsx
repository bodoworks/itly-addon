import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Store } from "webext-redux";

import { App } from "./app";

const queryClient = new QueryClient();
const store = new Store();

const ITLY_CONTAINER_ID = "itly-addon-container";

const div = document.createElement("div");
div.setAttribute("id", ITLY_CONTAINER_ID);
document.body.appendChild(div);

// wait for the store to connect to the background page
store.ready().then((): void => {
    // The store implements the same interface as Redux's store
    // so you can use tools like `react-redux` no problem!
    ReactDOM.render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>,
        document.getElementById(ITLY_CONTAINER_ID)
    );
});
