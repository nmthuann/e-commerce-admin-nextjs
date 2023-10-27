// // context/authReducer.js
// import { Admin, AuthState } from "./auth-context";

// export const authReducer = (
//     state: AuthState,
//     action: AuthAction
// ): AuthState => {
//     switch (action.type) {
//         case "LOGIN":
//             return {
//                 ...state,
//                 isLoggedIn: true,
//                 logging: false,
//                 currentAdmin: action.payload,
//             };
//         case "LOGOUT":
//             return { ...state, isLoggedIn: false, currentAdmin: undefined };
//         default:
//             return state;
//     }
// };

// export type AuthAction = { type: "LOGIN"; payload: Admin } | { type: "LOGOUT" };
