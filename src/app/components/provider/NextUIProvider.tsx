"use client";

import { NextUIProvider as UIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

export const NextUIProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <UIProvider>{children}</UIProvider>;
};
