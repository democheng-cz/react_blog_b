import {
	SAVE_USERINFO,
	SAVE_ACTIVE_MENU,
	SAVE_TOKEN,
	SAVE_MENU_LIST,
	LOGOUT,
	SAVE_ROLE_lIST,
} from "./CONSTANT"
import { reqLogin, reqMenuList, reqRoleList } from "@/service/login"

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

export const getMenuList = (role_id: number) => {
	return async (dispatch: any, state: any) => {
		console.log(role_id)
		const res: any = await reqMenuList(role_id)
		console.log(res)
		if (res.status === 200) {
			dispatch(createSaveMenuList(res.result.data))
		}
	}
}

export const getRoleList = () => {
	return async (dispatch: any, state: any) => {
		const res: any = await reqRoleList()
		if (res.status === 200) {
			dispatch({ type: SAVE_ROLE_lIST, payload: res.result.data })
		}
	}
}

export const createLogoutAction = () => {
	return {
		type: LOGOUT,
		payload: null,
	}
}
