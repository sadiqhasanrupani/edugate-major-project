import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// scss styling
import "./scss/index.scss";

// component
import App from "./App";
import store from "./store/index";

const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
