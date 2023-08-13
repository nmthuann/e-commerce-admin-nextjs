
import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar'
// import useLocalStorage from '@/hooks/custom-hook';
// import { useState } from 'react';


export default async function DashboardLayout({
  children,
  // params
}: {
  children: React.ReactNode
  // params: any
}) {
  
  

  return (
    <>
    
      <Navbar />
      {children}
    </>
  );
};