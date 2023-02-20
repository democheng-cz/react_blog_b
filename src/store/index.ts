import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import loginReducer from "./feature/login/reducer"

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(loginReducer, composeEnhancer(applyMiddleware(thunk)))

//从store中推断出rootState类型
export type RootStateType = ReturnType<typeof store.getState>

// 从store中推断出dispatch
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
