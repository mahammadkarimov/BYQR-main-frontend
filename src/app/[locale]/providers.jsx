"use client";

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from 'react';

export function Providers({ children }) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}