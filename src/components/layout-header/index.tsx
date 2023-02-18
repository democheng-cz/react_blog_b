import React, { memo, useEffect } from "react"
import { Layout } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "@/store"
import dcCache from "@/utils/localstore"
import { createSaveUserInfo } from "@/store/feature/login/actions"

import { LayoutHeaderWrapper } from "./style"

const LayoutHeader = memo(() => {
	const { Header } = Layout
	const dispatch = useAppDispatch()
	const userInfo = useAppSelector(state => {
		return state.userInfo
	})
	// console.log(userInfo)
	useEffect(() => {
		if (!userInfo?.nickName) {
			dispatch(createSaveUserInfo(dcCache.getCache("userInfo")))
		}
	}, [])
	return (
		<LayoutHeaderWrapper>
			{userInfo?.nickName && (
				<Header className="header">
					<span>欢迎回来，</span>
					<div className="userInfo">
						<span className="nickname">{userInfo.nickName}</span>
						<DownOutlined style={{ margin: "8px 0 0 2px" }} />
						<img
							src={
								`/api/file/getImage/${userInfo.avatar}` ||
								require("@/assets/images/猫和老鼠.png")
							}
							alt=""
						/>
					</div>
				</Header>
			)}
		</LayoutHeaderWrapper>
	)
})
export default LayoutHeader
