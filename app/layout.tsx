"use client"
import { ToastProvider } from '@/providers/toast-provider';
import './globals.css'
import { Inter } from 'next/font/google'
// import { ClerkProvider } from '@clerk/nextjs'
// import { ModalProvider } from '@/providers/modal-provider'
// import { ToastProvider } from '@/providers/toast-provider'
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from "react";
// import { ModalProvider } from '@/providers/modal-provider';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashbroad',
  description: 'Admin Dashbroad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const router = useRouter();
  // const token = localStorage.getItem('token');
  //   if (!token) {
  //     redirect('/auth/login');
  //   }
  // useEffect(() => {
  // // Perform localStorage action
  //   const token = localStorage.getItem('access_token')
  // }, [])

  //  const token = localStorage.getItem('token')
  //   if (!token) {
  //     console.log('hello')
  //     //redirect('auth/login');
  //     //router.push('/auth/login');
      
  //   }
  // if (typeof window !== 'undefined') {
  // // Perform localStorage action
   
  // }
  // router.push('/auth/login');

  return (
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider></ToastProvider>
          {/* <ModalProvider></ModalProvider> */}
          {children}
        </body>
      </html>
  )
}
