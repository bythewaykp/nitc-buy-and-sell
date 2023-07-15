"use client";
import Header from "./Header";
import "./globals.scss";
import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <html lang="en">
                    <body>
                        <Header />
                        {children}
                    </body>
                </html>
            </SessionProvider>
        </QueryClientProvider>
    );
}
