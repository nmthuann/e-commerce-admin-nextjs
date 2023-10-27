// // context/AuthContext.js
// import {
//     createContext,
//     useContext,
//     useReducer,
//     ReactNode,
//     Dispatch,
// } from "react";
// import { authReducer } from "./auth-reducer";

// export interface Admin {
//     email: string;
//     name: string;
//     avatar_url: string;
//     position: number;
// }

// export interface AuthState {
//     isLoggedIn: boolean;
//     logging: boolean;
//     currentAdmin?: Admin;
// }

// export const AuthContext = createContext<AuthState | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//     children,
// }) => {
//     const initialState: AuthState = {
//         isLoggedIn: false,
//         logging: false,
//         currentAdmin: undefined,
//     };

//     const [state, dispatch] = useReducer(authReducer, initialState);

//     return (
//         <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
//     );
// };
