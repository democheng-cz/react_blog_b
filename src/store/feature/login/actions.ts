import {
	SAVE_USERINFO,
	SAVE_ACTIVE_MENU,
	SAVE_TOKEN,
	SAVE_MENU_LIST,
	LOGOUT,
} from "./CONSTANT"
import { reqLogin, reqMenuList } from "@/service/login"

export const createSaveUserInfo = (payload: any) => {
	return {
		type: SAVE_USERINFO,
		payload,
	}
}

export const createSavaToken = (payload: string) => {
	return {
		type: SAVE_TOKEN,
		payload,
	}
}

export const createSaveActiveMenu = (payload: any) => {
	return {
		type: SAVE_ACTIVE_MENU,
		payload,
	}
}

export const createSaveMenuList = (payload: any[]) => {
	return {
		type: SAVE_MENU_LIST,
		payload,
	}
}

export const getMenuList = () => {
	return async (dispatch: any, state: any) => {
		const res: any = await reqMenuList()
		if (res.status === 200) {
			dispatch(createSaveMenuList(res.result.data.menuList))
		}
	}
}

export const createLogoutAction = () => {
	return {
		type: LOGOUT,
		payload: null,
	}
}
