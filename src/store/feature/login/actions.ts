import { SAVE_USERINFO, SAVE_ACTIVE_MENU } from "./CONSTANT"
export const createSaveUserInfo = (payload: any) => {
	return {
		type: SAVE_USERINFO,
		payload,
	}
}

export const createSaveActiveMenu = (payload: any) => {
	return {
		type: SAVE_ACTIVE_MENU,
		payload,
	}
}
