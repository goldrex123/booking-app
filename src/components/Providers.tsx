'use client';

import { AuthProvider } from '@/context/AuthContext';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import { Container } from 'react-bootstrap';

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showHeader = pathname !== '/login';

  return (
    <AuthProvider>
      {showHeader && <Header />}
      <main>
        {showHeader ? (
          <Container className="mt-4">
            {children}
          </Container>
        ) : (
          // For the login page, we don't want the container with margin
          children
        )}
      </main>
    </AuthProvider>
  );
}
