import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
          },
        }}
      />
    </BrowserRouter>
  </Provider>
);