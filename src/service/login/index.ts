import request from "../request"
interface LoginType {
	account: string
	password: string
	checkCode: string
}

// 获取验证码图片
export const reqCheckCode = () => {
	return request.post({ url: `/api/checkCode?${new Date().getTime()}` })
}

// 登录
export const reqLogin = (loginInfo: LoginType) => {
	return request.post({ url: "/api/login", params: { ...loginInfo } })
}
