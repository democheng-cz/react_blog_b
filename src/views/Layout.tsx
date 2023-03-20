import React, { useEffect, useLayoutEffect, useState, Suspense } from "react"
import {} from "@ant-design/icons"
import { Layout, Menu } from "antd"
import { Outlet, useLocation } from "react-router-dom"
import styled from "styled-components"

import {
	createSaveMenuList,
	createSaveActiveMenu,
	getRoleList,
	getMenuList,
} from "@/store/feature/login/actions"
import LayoutHeader from "@/components/layout-header"
import Auth from "@/components/auth/auth"
import { useAppSelector, useAppDispatch } from "@/store"

import dcCache from "@/utils/localstore"
import DcMenu from "@/components/dc-menu"
import DcLoading from "@/components/dc-loading"

const { Content, Sider } = Layout

const Container: React.FC = () => {
	const dispatch = useAppDispatch()

	const location = useLocation()

	const { menuList, activeMenu, userInfo } = useAppSelector(state => {
		return {
			menuList: state.login.menuList,
			activeMenu: state.login.activeMenu,
			userInfo: state.login.userInfo,
		}
	})

	const changeMenuItem = (e: any) => {
		const arr = [...activeMenu.openKey]
		arr.push(e.keyPath[e.keyPath.length - 1])
		let newArr = Array.from(new Set(arr))
		dispatch(createSaveActiveMenu({ openKey: newArr, selectKey: e.keyPath[0] }))
	}

	const changeSelectItem = (openKeys: any) => {
		dispatch(
			createSaveActiveMenu({
				...dcCache.getCache("activeMenu"),
				openKey: openKeys,
			})
		)
	}
	useEffect(() => {
		dispatch(createSaveMenuList(dcCache.getCache("menuList")))
	}, [])
	useEffect(() => {
		const selectKey = location.pathname
		const openKey = "/" + location.pathname.split("/")[1]
		dispatch(createSaveActiveMenu({ selectKey, openKey: [openKey] }))
	}, [location])

	return (
		<Auth>
			<LayoutWrapper>
				<Layout>
					{/* 左侧菜单栏 */}
					<Sider
						width={240}
						style={{ height: "100%", overflow: "hidden", minHeight: "100%" }}
					>
						<h1 className="logo">DcBlog</h1>
						<DcMenu
							changeMenuItem={(e: any) => {
								changeMenuItem(e)
							}}
							changeSelectItem={(openKeys: string[]) => {
								changeSelectItem(openKeys)
							}}
							menuList={menuList}
							activeMenu={activeMenu.select || dcCache.getCache("activeMenu")}
						/>
					</Sider>
					{/* 右侧内容区 */}
					<Layout>
						{/* 头部 */}
						<LayoutHeader />
						<Layout
							style={{
								padding: "15px",
								backgroundColor: "#fff",
							}}
							className="layout-main"
						>
							{/* 内容区 */}
							<Content
								style={{
									padding: 24,
									margin: 0,
									minHeight: 280,
									background: "#fff",
								}}
							>
								<Suspense fallback={<DcLoading />}>
									<Outlet />
								</Suspense>
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</LayoutWrapper>
		</Auth>
	)
}

const LayoutWrapper = styled.div`
	display: flex;
	overflow: hidden;
	height: 100%;
	.logo {
		margin: 25px auto;
		border-radius: 5px;
		text-align: center;
		background-color: #008000;
		color: #fff;
		line-height: 30px;
		height: 30px;
		width: 80%;
		font-size: 16px;
	}
	.header {
		background-color: #418fba;
		img {
			height: 50px;
			width: 50px;
			border-radius: 50%;
			margin-left: 10px;
		}
		.userInfo {
			color: #1890ff;
			display: flex;
			align-items: center;
			margin-left: 10px;
		}
	}
	.ant-layout-sider-children {
		background-color: #a8e3b5;
	}
	.ant-menu {
		background-color: #a8e3b5;
	}
`

export default Container
