import { SAVE_USERINFO, LOGOUT, SAVE_ACTIVE_MENU } from "./CONSTANT"
import dcCache from "@/utils/localstore"

import reactCookies from "react-cookies"
interface ActionType {
	type: string
	payload: any
}
interface UserinfoType {
	userId?: number
	nickName?: string
	avatar?: string
	phone?: string
	profession?: string
	introduction?: string
	editorType?: number
	roleType?: number
	editorTypeName?: string
}

interface InitStateType {
	userInfo: UserinfoType
	activeMenu: {
		openKey: string[]
		selectKey: string
	}
}
const initState: InitStateType = {
	userInfo: {},
	activeMenu: {
		openKey: [],
		selectKey: "",
	},
}

const loginReducer = function (state = initState, action: ActionType) {
	const { type, payload } = action
	// console.log("first", payload)
	switch (type) {
		case SAVE_USERINFO:
			dcCache.setCache("userInfo", payload)
			reactCookies.save("userInfo", payload)
			return {
				...state,
				userInfo: payload,
			}

		case LOGOUT:
			dcCache.deleteCache("userInfo")
			return {
				...state,
			}
		case SAVE_ACTIVE_MENU: {
			if (payload.openKey) {
				dcCache.setCache("activeMenu", payload)
			}
			return {
				...state,
				activeMenu: payload,
			}
		}
		default:
			return {
				...state,
			}
	}
}

export default loginReducer
