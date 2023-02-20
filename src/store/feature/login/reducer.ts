import {
	SAVE_USERINFO,
	LOGOUT,
	SAVE_ACTIVE_MENU,
	LOGIN,
	SAVE_TOKEN,
	SAVE_MENU_LIST,
} from "./CONSTANT"
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
	account?: string
	introduction?: string
	roleType?: number
	editorTypeName?: string
}

interface InitStateType {
	userInfo: UserinfoType
	activeMenu: {
		openKey: string[]
		selectKey: string
	}
	menuList: any[]
}
const initState: InitStateType = {
	userInfo: {},
	activeMenu: {
		openKey: [""],
		selectKey: "",
	},
	menuList: [],
}

const loginReducer = function (state = initState, action: ActionType) {
	const { type, payload } = action
	switch (type) {
		case SAVE_USERINFO:
			dcCache.setCache("userInfo", payload)
			return {
				...state,
				userInfo: payload,
			}
			break
		case SAVE_TOKEN:
			dcCache.setCache("token", payload)
			return {
				...state,
				token: payload,
			}
		case LOGOUT:
			dcCache.deleteCache("userInfo")
			dcCache.deleteCache("token")
			return {
				...state,
			}
		case SAVE_ACTIVE_MENU: {
			// console.log(payload)
			if (payload.openKey) {
				dcCache.setCache("activeMenu", payload)
			}
			return {
				...state,
				activeMenu: payload,
			}
		}
		case SAVE_MENU_LIST: {
			dcCache.setCache("menuList", payload)
			return {
				...state,
				menuList: payload,
			}
		}
		default:
			return {
				...state,
			}
	}
}

export default loginReducer
