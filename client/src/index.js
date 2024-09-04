import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http";

// scss styling
import "./scss/index.scss";

// component
import App from "./App";

// store
import store from "./store/index";

const root = createRoot(document.querySelector("#root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
);
