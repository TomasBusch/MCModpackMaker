import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
} from "react-router-dom";
import "./index.scss";
import App from "./routes/app/app";


const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
              <App/>
      </BrowserRouter>
    </React.StrictMode>
  );
}