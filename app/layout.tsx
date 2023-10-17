"use client";
import { ToastProvider } from "@/providers/toast-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";

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
                <ToastProvider></ToastProvider>
                {/* <ModalProvider></ModalProvider> */}
                <Navbar />
                {children}
                {/* <LoginForm   /> */}
            </body>
            {/* <Footer/>  */}
        </html>
    );
}
