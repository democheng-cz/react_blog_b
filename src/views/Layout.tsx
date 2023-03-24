import React, { useEffect, useLayoutEffect, useState, Suspense } from "react"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { Layout, Button } from "antd"
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
	const [collapsed, setCollapsed] = useState(true)
	const { menuList, activeMenu, userInfo } = useAppSelector(state => {
		return {
			menuList: state.login.menuList,
			activeMenu: state.login.activeMenu,
			userInfo: state.login.userInfo.user_id
				? state.login.userInfo
				: dcCache.getCache("userInfo"),
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

	const toggleCollapsed = () => {}
	return (
		<Auth>
			<LayoutWrapper>
				<Layout>
					{/* 左侧菜单栏 */}
					<Sider
						breakpoint="md"
						collapsed={collapsed}
						onBreakpoint={broken => {
							setCollapsed(broken)
						}}
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
						{/* {!collapsed || (
							<Button
								type="primary"
								onClick={toggleCollapsed}
								style={{ marginBottom: 16 }}
								className="absolute left-0 top-16"
							>
								{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							</Button>
						)} */}
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
					{/* </Col>
					</Row> */}
				</Layout>
			</LayoutWrapper>
		</Auth>
	)
}

const LayoutWrapper = styled.div`
	display: flex;
	overflow: hidden;
	height: 100%;
	width: 100%;
	.logo {
		margin: 25px auto;
		border-radius: 5px;
		text-align: center;
		background-color: #3ba0e9;
		color: #fff;
		line-height: 30px;
		height: 30px;
		width: 80%;
		font-size: 16px;
	}
	.layout-main {
	}
	.header {
		background-color: #7dbcea;
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
	.Sider {
		min-width: 0;
	}
	.ant-layout-sider {
		min-width: 0 !important;
		width: auto !important;
	}
	.ant-layout-sider-children {
		background-color: #3ba0e9;
	}
	.ant-menu {
		background-color: #3ba0e9;
	}
	.ant-menu-title-content {
		color: black;
		font-weight: 700;
	}
`

export default Container
