"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Provider } from "jotai";

import React from "react";

const Wrappers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Provider>{children}</Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Wrappers;
