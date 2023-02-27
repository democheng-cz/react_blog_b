import request from "../request"
interface LoginType {
	account: string
	password: string
	// checkCode: string
}

// 获取验证码图片
// export const reqCheckCode = () => {
// 	return request.post({ url: `/api/checkCode?${new Date().getTime()}` })
// }

// 登录
export const reqLogin = (loginInfo: LoginType) => {
	return request.post({ url: "/login", data: { ...loginInfo } })
}

// 根据用户角色获取相应的菜单
export const reqMenuList = () => {
	return request.post({ url: "/menulist" })
}
