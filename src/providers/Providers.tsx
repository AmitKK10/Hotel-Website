import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { SmoothScrollProvider } from './SmoothScrollProvider';
import { AnimationProvider } from './AnimationProvider';
import { BookingProvider } from '@/src/context/BookingContext';
import { PWAProvider } from '@/src/components/pwa/PWAProvider';
import { DataImportProvider } from '@/src/context/DataImportContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="digha-resort-theme">
      <AnimationProvider>
        <SmoothScrollProvider>
          <PWAProvider>
            <BookingProvider>
              <DataImportProvider>
                {children}
              </DataImportProvider>
            </BookingProvider>
          </PWAProvider>
        </SmoothScrollProvider>
      </AnimationProvider>
    </ThemeProvider>
  );
}

