import Nav from "_components/nav";
import { Suspense } from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mr-2" style={{ width: "100%" }}>
            <Suspense>
                <Nav />
                {children}
            </Suspense>
        </div>
    )
}