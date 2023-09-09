import { NextAuthProvider } from 'app_provider';
import './globals.css';
import { Suspense } from 'react';
import Nav from '_components/nav';

export const metadata = {
  title: 'Tien Thanh ',
  description: 'TIEM PHONG'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <NextAuthProvider>
            <Nav />
          </NextAuthProvider>
        </Suspense>
        {children}
      </body>
    </html>
  );
}
