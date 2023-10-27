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
