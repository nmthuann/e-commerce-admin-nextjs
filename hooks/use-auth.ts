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
