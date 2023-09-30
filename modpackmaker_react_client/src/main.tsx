import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
} from "react-router-dom";
import "./index.scss";
import App from "./routes/app/app";
import { NextUIProvider } from "@nextui-org/react";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
// ]);


const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
          <NextUIProvider>
            <main className="dark text-foreground bg-background">
              <App />
            </main>
          </NextUIProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}