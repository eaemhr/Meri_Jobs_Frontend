"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LanguageProvider } from "../../shared/providers/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false,
            retry: 2,
          },
        },
      }),
  );

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </LanguageProvider>
  );
}
