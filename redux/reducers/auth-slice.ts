// import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
// import { cookies } from "next/headers";

// export interface LoginPayload{
//     email: string;
//     password: string;
// }


// export interface Admin {
//     email: string;
//     name: string;
//     avatar_url: string;
//     position: number;
// }

// export interface AuthState {
//     isLoggedIn: boolean;
//     logging?: boolean;
//     currentAdmin?: Admin;
// }


// const initialState: AuthState = {
//     isLoggedIn: false,
//     logging: false,
//     currentAdmin: undefined,
// }

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         login(state, action: PayloadAction<Admin>) {
//             state.logging = true;
//             state.currentAdmin = action.payload;
//         },
//         // loginSuccess(state, action: PayloadAction<Admin>) {
//         //     state.isLoggedIn = true;
//         //     state.logging = false;
//         //      state.currentAdmin = action.payload;
//         // },
//         // loginFailed(state, action: PayloadAction<string>) {
//         //      state.logging = false;
//         // },


//         logout(state){
//             // state.isLoggedIn = false;
//             state.currentAdmin = undefined;
            
//             console.log("get here");
//             // const token = cookies().get('token')?.value;
//             // if(token){
//             //     cookies().delete('token');
//             //     //return new NextResponse(Messages.LOGOUT_SUCCESS, { status: 200 });
//             // }
//         },
//         // applyData(state, action) {
//         //     state.currentAdmin = action.payload.user; //???
//         // },

//     } // khai báo action in here
// })

// // Export: 1. Actions, 2. Selectors, Reducers

// export const authActions = authSlice.actions;


// export const selectIsLoggedIn = (state : any) => state.auth.isLoggedIn;
// export const selectIsLogging = (state : any) => state.auth.isLoggedIn;


// const authReducer = authSlice.reducer;
// export default authReducer;