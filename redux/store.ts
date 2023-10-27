// // // src/store.ts
// // import { configureStore } from '@reduxjs/toolkit';
// // import createSagaMiddleware from 'redux-saga';
// // import { all } from 'redux-saga/effects';
// // import { applyMiddleware, combineReducers } from 'redux';

// // // Import các reducers của bạn
// // import authReducer from './reducers/authReducer';

// // // Import các saga của bạn
// // import { authSaga } from './sagas/authSaga';

// // const rootReducer = combineReducers({
// //   auth: authReducer,
// //   // Thêm reducers khác nếu cần
// // });

// // function* rootSaga() {
// //   yield all([
// //     authSaga(),
// //     //



// // import { createStore, applyMiddleware } from 'redux';
// // import createSagaMiddleware from 'redux-saga';
// // import { createWrapper } from 'next-redux-wrapper';

// // import rootReducer from './rootReducer';
// // import rootSaga from './rootSaga';

// // export const makeStore = () => {
// //   // 1: Create the middleware
// //   const sagaMiddleware = createSagaMiddleware();

// //   // 2: Add an extra parameter for applying middleware
// //   const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// //   // 3: Run your sagas on server
// //   store.sagaTask = sagaMiddleware.run(rootSaga);

// //   // 4: now return the store
// //   return store;
// // };

// // export const wrapper = createWrapper(makeStore);

// import authReducer from '@/redux/reducers/auth-slice';
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from './stores/root-saga';



// const sagaMiddleware = createSagaMiddleware();

// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
// })

// sagaMiddleware.run(rootSaga);

// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// // export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth-slice";



const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // toast: toastSlice.reducer,
    // cart: cartSlice.reducer,
    // wishList: wishListSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;

// export const toastAction = toastSlice.actions;

// export const cartActions = cartSlice.actions;
// export const wishListActions = wishListSlice.actions;