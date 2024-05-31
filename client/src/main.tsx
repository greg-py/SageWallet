import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import ToastConfiguration from "./components/UI/ToastConfiguration.tsx";

import { queryClient } from "./api/queries/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext.tsx";
import { FilterProvider } from "./context/FilterContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FilterProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastConfiguration />
        </FilterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
