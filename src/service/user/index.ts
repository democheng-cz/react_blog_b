import request from "../request"

// 上传头像
export const reqUploadAvatar = (avatar: any) =>
	request.get({ url: "/user/file/avatar", data: { avatar } })
