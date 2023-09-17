import Nav from "_components/nav";
import { NextAuthProvider } from "app_provider";
import { Suspense } from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mr-2">
            <Suspense>
                <NextAuthProvider>
                    <Nav />
                </NextAuthProvider>
            </Suspense>
            {children}
        </div>
    )
}