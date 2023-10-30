import { createSlice, 
     PayloadAction } from "@reduxjs/toolkit";


export interface LoginPayload{
    email: string;
    password: string;
}


export interface Admin {
    email: string;
    name: string;
    avatar_url: string;
    position: number;
}

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentAdmin?: Admin;
}


const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentAdmin: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<Admin>) {
            state.logging = true;
            state.currentAdmin = action.payload;
            localStorage.setItem("admin", JSON.stringify(action.payload));
        },
        


        logout(state, ){
            // state.isLoggedIn = false;
            state.currentAdmin = undefined;
            state.logging = false;
            localStorage.removeItem("admin");
        },

    } // khai báo action in here
})

// Export: 1. Actions, 2. Selectors, Reducers

// export const authActions = authSlice.actions;
export const authActions = authSlice.actions;


// // export const selectIsLoggedIn = (state : any) => state.auth.isLoggedIn;
// // export const selectIsLogging = (state : any) => state.auth.isLoggedIn;


// const authReducer = authSlice.reducer;
// export default authReducer;
export default authSlice;