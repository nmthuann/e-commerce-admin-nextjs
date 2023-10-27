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