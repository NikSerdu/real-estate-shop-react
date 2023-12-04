import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Layout from "./components/Layout/Layout.tsx";
import "./index.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import AuthProvider from "./providers/AuthProvider.tsx";
import { store } from "./store/store.ts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <PrimeReactProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </PrimeReactProvider>
        </QueryClientProvider>
      </Layout>
    </Provider>
  </BrowserRouter>
);
