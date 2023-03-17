import request from "../request"

interface queryType {
	name: string
	status: number
}

interface UserInfoType {
	nick_name?: string
	password?: string
	role?: string
	avatar?: string
	state?: number
}

interface ResType {
	status: number
	message: string
	result: any
}

// 上传头像
export const reqUploadAvatar = (avatar: any) =>
	request.get({ url: "/user/file/avatar", data: { avatar } })

// 获取用户列表
export const reqUserList = (query: queryType) => {
	return request.get({ url: "/user", params: query })
}

// 修改用户信息
export const reqUpdateUserInfo = (userInfo: UserInfoType) => {
	return request.patch<ResType>({
		url: "/user/update",
		data: { ...userInfo },
	})
}
