"use client";
import { ToastProvider } from "@/providers/toast-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { Provider } from "react-redux";
import store from "@/redux/stores/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Admin Dashbroad",
    description: "Admin Dashbroad",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <ToastProvider />
                    <Provider store={store}>
                        <Navbar />
                        {children}
                    </Provider>
                </ThemeProvider>
            </body>
            {/* <Footer/>  */}
        </html>
    );
}
