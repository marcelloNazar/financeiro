"use client";

import { SessionProvider } from "next-auth/react";
import { FinanceProvider } from "./FinanceProvider";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: AuthProviderProps) => {
  return (
    <SessionProvider>
      <FinanceProvider>{children}</FinanceProvider>
    </SessionProvider>
  );
};
