"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Custom hook to manage user data
function useAuth() {
    const [login, setLogin] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate an API request to get user data
                const response = await axios.post("/api/auth/login", {}); // Replace with your API endpoint
                if (response.status === 200) {
                    // const userData = await response.json();
                    console.log("check if")
                    router.push('/');
                    setLogin(true);
                } else {
                    console.log("check else")
                    setLogin(false);
                }
            } catch (error) {
                 console.log("check error")
                setLogin(false);
            }
        };

        fetchData();
    }, []);

    return login ;
}

export default useAuth;

// import { signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function useAuth(shouldRedirect: boolean): boolean {
//     const { data: session } = useSession();
//     const router = useRouter();
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//     useEffect(() => {
//             // if (session?.error === "RefreshAccessTokenError") {
//             //     signOut({ callbackUrl: '/auth/login', redirect: shouldRedirect });
//             // }

//         if (session === null) {
//             if (router.route !== '/auth/login') {
//                 router.replace('/auth/login');
//             }
//             setIsAuthenticated(false);
//         } else if (session !== undefined) {
//             if (router.route === '/auth/login') {
//                 router.replace('/');
//             }
//             setIsAuthenticated(true);
//         }
//     }, [session, router.route, shouldRedirect]);

//     return isAuthenticated;
// }
