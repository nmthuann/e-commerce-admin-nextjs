// import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
// import { ThemeToggle } from "@/components/theme-toggle";


const Navbar = async () => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     redirect('/auth/login');
//   }

    // if (typeof window !== 'undefined') {
    // // Perform localStorage action
    //     const token = localStorage.getItem('token');

    //     if (!token) {

    //         redirect('/auth/login');
    //     }
    // }

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* <StoreSwitcher items={stores} /> */}
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;