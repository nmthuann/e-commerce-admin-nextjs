

//"use client"
// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "../reducers/auth-slice";
// // import { createWrapper } from "next-redux-wrapper";



// // const store = configureStore({
// //   reducer: {
// //     auth: authSlice.reducer,
    
// //   },
// // });
// export function makeStore() {
//   return configureStore({
//     reducer: {
//       auth: authSlice.reducer,
//       // user: UserSlice.reducer
//     },
//   })
// }
// // const makeStore = () => store;
// const store = makeStore()

// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// export default store;



// export const wrapper = createWrapper(makeStore);

// export default store;









// // store.ts
// import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
// import authReducer from "../reducers/auth-slice"; // Assuming the file is named auth-slice.ts

// const rootReducer = {
//   auth: authReducer,
//   // Add other reducers if needed
// };

// const makeStore = (context: Context) => configureStore({
//   reducer: rootReducer,
// });

// export const wrapper = createWrapper(makeStore, { debug: true });

// export type RootState = ReturnType<typeof rootReducer.auth>;
// export type AppDispatch = typeof store.dispatch;




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

// import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../reducers/auth-slice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    // [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({}).concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;