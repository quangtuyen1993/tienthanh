import Nav from "_components/nav";
import { Suspense } from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mr-2">
            <Suspense>
                    <Nav />
            </Suspense>
            {children}
        </div>
    )
}