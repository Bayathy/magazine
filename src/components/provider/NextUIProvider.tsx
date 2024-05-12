"use client";

import { NextUIProvider as UIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export const NextUIProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <UIProvider>
      <NextThemeProvider>{children}</NextThemeProvider>
    </UIProvider>
  );
};
