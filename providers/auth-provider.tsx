"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, ReactNode } from "react";
import toast from "react-hot-toast";

interface Admin {
    email: string;
    name: string;
    avatar_url: string;
    position: number;
}

interface AuthContextType {
    admin: Admin | null;
    login: (adminData: Admin) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();
    const [admin, setAdmin] = React.useState<Admin | null>(null);

    const login = (adminData: Admin) => {
        console.log("adminData", adminData);
        setAdmin(adminData);
    };

    const logout = async () => {
        const res = await axios.post("/api/auth/logout", {});
        toast.success(res.data);
        router.push("auth/login");
        setAdmin(null);
    };

    const contextValue = { admin, login, logout };

    // const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// export function useAuth() {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// }
