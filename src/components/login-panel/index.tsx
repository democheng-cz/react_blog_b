import React, { memo, useState } from "react"
import { Button, Checkbox, Form, Input, message } from "antd"

import { reqLogin } from "@/service/login"

const LoginPanel = memo(() => {
	const [checkCodeUrl, setCheckCodeUrl] = useState<string>("/api/checkCode")
	const [messageApi, contextHolder] = message.useMessage()
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
		const res = await reqLogin(values)
		console.log("first")
	}
	return (
		<div>
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
						<Button type="primary" htmlType="submit">
							注册
						</Button>
					</div>
				</Form.Item>
			</Form>
		</div>
	)
})

export default LoginPanel
