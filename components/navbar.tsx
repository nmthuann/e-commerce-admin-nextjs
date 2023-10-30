// import { UserButton, auth } from "@clerk/nextjs";

import { MainNav } from "@/components/main-nav";
import { Search } from "@/components/search-nav";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <Search />
                    <UserNav />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
