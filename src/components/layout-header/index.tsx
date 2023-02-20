import React, { memo, useEffect, useState } from "react"
import { DownOutlined, SmileOutlined } from "@ant-design/icons"
import { Layout, Dropdown, Space, Modal } from "antd"
import type { MenuProps } from "antd"
import { useAppDispatch, useAppSelector } from "@/store"
import dcCache from "@/utils/localstore"

import {
	createLogoutAction,
	createSaveUserInfo,
} from "@/store/feature/login/actions"

import { LayoutHeaderWrapper } from "./style"

const LayoutHeader = memo(() => {
	const { Header } = Layout
	const dispatch = useAppDispatch()
	const userInfo = useAppSelector(state => {
		return state.userInfo
	})

	const logout = () => {
		showModal()
	}

	const items: MenuProps["items"] = [
		{
			key: 1,
			label: "个人信息",
		},
		{
			key: 2,
			label: <div onClick={logout}>退出登录</div>,
		},
	]
	useEffect(() => {
		if (!userInfo?.account) {
			dispatch(createSaveUserInfo(dcCache.getCache("userInfo")))
		}
	}, [])

	const [open, setOpen] = useState(false)

	const showModal = () => {
		setOpen(true)
	}

	const handleOk = () => {
		dispatch(createLogoutAction())
		setOpen(false)
	}

	const handleCancel = () => {
		setOpen(false)
	}
	return (
		<LayoutHeaderWrapper>
			{userInfo?.account && (
				<Header className="header">
					<span>欢迎回来，</span>
					<div className="userInfo">
						<Dropdown menu={{ items }}>
							<a onClick={e => e.preventDefault()}>
								<Space>
									<span className="nickname">
										{userInfo.nickName || "test"}
									</span>
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
						<img
							src={userInfo.avatar || require("@/assets/images/猫和老鼠.png")}
							alt=""
						/>
					</div>
				</Header>
			)}
			<Modal
				open={open}
				onOk={handleOk}
				onCancel={handleCancel}
				cancelText="取消"
				okText="确定"
			>
				<p>确定要退出登录吗?</p>
			</Modal>
		</LayoutHeaderWrapper>
	)
})
export default LayoutHeader
