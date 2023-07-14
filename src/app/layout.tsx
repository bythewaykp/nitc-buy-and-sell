"use client";
import Header from "./Header";
import "./globals.scss";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
    return (
        <SessionProvider>
            <html lang="en">
                <body>
                    <Header />
                    {children}
                </body>
            </html>
        </SessionProvider>
    );
}
