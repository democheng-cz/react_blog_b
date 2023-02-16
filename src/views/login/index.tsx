import React, { memo } from "react"
import { connect } from "react-redux"

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

const mapStateTopProps = (state: any) => {
	return {
		userInfo: state.userInfo,
	}
}
const mapDispatchToProps = (dispatch: any) => {
	return {
		login: () => {
			dispatch({ type: "login", payload: "zwc" })
		},
		logout: () => {
			dispatch({ type: "logout", payload: "xyx" })
		},
	}
}

export default connect(mapStateTopProps, mapDispatchToProps)(Login)
