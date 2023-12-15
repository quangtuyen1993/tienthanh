import './globals.css';
import SWRProvider from './lib/providers/swr_provider';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: 'Tiến Thanh ',
  description: 'Tiêm Phòng'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <SWRProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
