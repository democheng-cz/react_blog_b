import { createStore } from "redux"
import loginReducer from "./feature/login"

const store = createStore(loginReducer)

export default store
