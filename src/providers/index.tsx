"use client";

import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export interface IAppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: IAppProvidersProps) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
      </SessionProvider>
    </Provider>
  );
}
