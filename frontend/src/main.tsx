import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Layout from "./components/Layout/Layout.tsx";
import "./index.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import { PrimeReactProvider } from "primereact/api";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
        </QueryClientProvider>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
