// import { call, fork, take } from "redux-saga/effects";
// import { LoginPayload, authActions } from "./auth-slice";
// import { PayloadAction } from "@reduxjs/toolkit";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { Messages } from "@/constants/notifications/message";


// async function* handleLogin(payload: LoginPayload){
//     console.log('Handle Login', payload);
// }

// function* handleLogout(){
//      console.log('Handle Logout');
//     //  console.log("get here");
//     // const token = cookies().get('token')?.value;
//     //     if(token){
//     //         cookies().delete('token');
//     //         yield new NextResponse(Messages.LOGOUT_SUCCESS, { status: 200 });
//     //     }
// }

// function* watchLoginFlow(){
//     while(true){
//         const token = cookies().get('token')?.value;
//         if(!token){
//             const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
//             yield fork(handleLogin, action.payload);
//         }
//         yield take(authActions.logout.type);
//         yield call(handleLogout); // call # fork when call -> waite until done, fork no wait
//     }
// }


// export default function* authSaga() {
//     console.log('Auth saga');

//     yield fork(watchLoginFlow);
//     //  yield takeLatest(watchLoginFlow);

// }

// // reducers/authReducer.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Định nghĩa trạng thái ban đầu của reducer
// interface AuthState {
//   isLoggedIn: boolean;
//   user: {
//     id: number;
//     username: string;
//     email: string;
//   } | null;
// }

// const initialState: AuthState = {
//   isLoggedIn: false,
//   user: null,
// };

// // Tạo một slice của reducer sử dụng Redux Toolkit
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<AuthState['user']>) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     },
//   },
// });

// // Export các actions từ slice
// export const { login, logout } = authSlice.actions;

// // Export reducer
// export default authSlice.reducer;




// // reducers/rootReducer.ts

// import { combineReducers } from '@reduxjs/toolkit';
// import authReducer from './auth-reducer'; // Import reducer của auth

// // Sử dụng combineReducers để kết hợp tất cả các reducers con
// const rootReducer = combineReducers({
//   auth: authReducer, // Đặt tên và import reducer của auth ở đây
//   // Để thêm reducers khác, chỉ cần thêm vào đây
// });

// export default rootReducer;

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

// // reducers/authReducer.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Định nghĩa trạng thái ban đầu của reducer
// interface AuthState {
//   isLoggedIn: boolean;
//   user: {
//     id: number;
//     username: string;
//     email: string;
//   } | null;
// }

// const initialState: AuthState = {
//   isLoggedIn: false,
//   user: null,
// };

// // Tạo một slice của reducer sử dụng Redux Toolkit
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<AuthState['user']>) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     },
//   },
// });

// // Export các actions từ slice
// export const { login, logout } = authSlice.actions;

// // Export reducer
// export default authSlice.reducer;
