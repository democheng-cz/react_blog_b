import React, { memo } from "react"

import { LoginWrapper } from "./style"
import LoginPanel from "@/components/login-panel"

const Login: React.FC<any> = memo(props => {
	const login = () => {
		props.login()
		console.log(props.userInfo.nickName)
	}
	const logout = () => {
		props.logout()
		console.log(props.userInfo.nickName)
	}
	return (
		<LoginWrapper>
			<LoginPanel></LoginPanel>
			<button
				onClick={() => {
					login()
				}}
			>
				发起登录
			</button>
			<button
				onClick={() => {
					logout()
				}}
			>
				发起登出
			</button>
		</LoginWrapper>
	)
})

export default Login
