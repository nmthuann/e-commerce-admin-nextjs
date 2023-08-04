import { redirect } from 'next/navigation';


import Navbar from '@/components/navbar'


export default async function DashboardLayout({
  children,
  //params
}: {
  children: React.ReactNode
//   params: { storeId: string }
}) {
  

    // if (typeof window !== 'undefined') {
    // // Perform localStorage action
    //     const token = localStorage.getItem('token');

    //     if (!token) {

    //         redirect('/auth/login');
    //     }
    // }



//   if (!store) {
//     redirect('/');
//   };

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};