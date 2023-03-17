import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { createStore, compose, applyMiddleware } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import loginReducer from "./feature/login/reducer"
import blogReducer from "./feature/blog/reducer"
import userReducer from "./feature/user/reducer"

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(loginReducer, composeEnhancer(applyMiddleware(thunk)))
const store = configureStore({
	reducer: {
		login: loginReducer,
		blog: blogReducer,
		user: userReducer,
	},
})

//从store中推断出rootState类型
export type RootStateType = ReturnType<typeof store.getState>

// 从store中推断出dispatch
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
