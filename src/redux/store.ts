import { configureStore } from '@reduxjs/toolkit'
import formDataReducer from './FormData/FormDataSlice';

export const store = configureStore({
  reducer: {
    formData: formDataReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;