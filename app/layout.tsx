// "use client";
import { ToastProvider } from "@/providers/toast-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { Provider } from "react-redux";
import { Providers } from "@/redux/provider";
import Head from "next/head";

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
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="description" content="Mô tả trang web của bạn" />
                {/* Thêm các metadata khác tại đây */}
                <title>Admin Dashbroad</title>
            </Head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <ToastProvider />
                    {/* <Provider> */}
                    <Providers>
                        <Navbar />
                        {children}
                    </Providers>
                    {/* </Provider> */}
                </ThemeProvider>
            </body>
            {/* <Footer/>  */}
        </html>
    );
}
