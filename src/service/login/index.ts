import request from "../request"
interface LoginType {
	account: string
	password: string
}

// 登录
export const reqLogin = (loginInfo: LoginType) => {
	return request.post({ url: "/login", data: { ...loginInfo } })
}

// 根据用户角色获取相应的菜单
export const reqMenuList = (role_id: number) => {
	console.log(role_id)
	return request.get({ url: `/role/menulist`, params: { role_id } })
}

// 获取角色列表
export const reqRoleList = () => {
	return request.get({ url: "/role" })
}
