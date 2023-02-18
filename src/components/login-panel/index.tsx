import React, { memo, useState } from "react"
import { Button, Checkbox, Form, Input, message } from "antd"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"

import LoginPanelWrapper from "./style"
import { reqLogin } from "@/service/login"
import { SAVE_USERINFO } from "@/store/feature/login/CONSTANT"
import { useAppDispatch } from "@/store"
import dcCache from "@/utils/localstore"
import { createSaveActiveMenu } from "@/store/feature/login/actions"

const LoginPanel = memo((props: any) => {
	const [checkCodeUrl, setCheckCodeUrl] = useState<string>("/api/checkCode")
	const [messageApi, contextHolder] = message.useMessage()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const getCheckCode = () => {
		setCheckCodeUrl(`/api/checkCode?${new Date().getTime()}`)
	}
	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo)
		messageApi.open({
			type: "error",
			content: errorInfo.errorFields[0].errors,
		})
	}

	const onFinish = async (values: any) => {
		const res: any = await reqLogin(values)
		// console.log(res)
		if (res.code === 200) {
			props.saveUserInfo(res.data)
			messageApi.open({
				type: "success",
				content: "登录成功",
			})
			dispatch(
				createSaveActiveMenu({ selectKey: "blog/manage", openKey: ["blog"] })
			)
			navigate("/")
		} else {
			messageApi.open({
				type: "error",
				content: res.info,
			})
			setCheckCodeUrl(`/api/checkCode?${new Date().getTime()}`)
		}
	}
	return (
		<LoginPanelWrapper>
			{contextHolder}
			<Form
				name="basic"
				style={{ maxWidth: 600 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				className="form-wrapper"
			>
				<Form.Item
					label="账号"
					name="account"
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="密码"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="checkCode"
					rules={[{ required: true, message: "请输入验证码" }]}
				>
					<div className="check-code">
						<Input />
						<img
							onClick={() => {
								getCheckCode()
							}}
							src={checkCodeUrl}
							alt=""
						/>
					</div>
				</Form.Item>
				<Form.Item name="checkbox" valuePropName="checked">
					<Checkbox>记住我</Checkbox>
				</Form.Item>

				<Form.Item className="btn">
					<div className="btns">
						<Button type="primary" htmlType="submit">
							登录
						</Button>
					</div>
				</Form.Item>
			</Form>
		</LoginPanelWrapper>
	)
})

const mapStateTopProps = (state: any) => {
	return {
		userInfo: state.userInfo,
	}
}
const mapDispatchToProps = (dispatch: any) => {
	return {
		saveUserInfo: (payload: any) => {
			dispatch({ type: SAVE_USERINFO, payload })
		},
	}
}

export default connect(mapStateTopProps, mapDispatchToProps)(LoginPanel)
