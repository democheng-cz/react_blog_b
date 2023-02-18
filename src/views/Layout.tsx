import React, { useEffect, useLayoutEffect, useState, Suspense } from "react"
import {} from "@ant-design/icons"
import { Layout, Menu } from "antd"
import {
	DiffFilled,
	SlidersFilled,
	SettingFilled,
	DeleteFilled,
} from "@ant-design/icons"
import { Outlet } from "react-router-dom"
import { ItemType } from "antd/es/menu/hooks/useItems"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { useAppSelector, useAppDispatch } from "@/store"
import { createSaveActiveMenu } from "@/store/feature/login/actions"
import dcCache from "@/utils/localstore"

import LayoutHeader from "@/components/layout-header"
import Auth from "@/components/auth/auth"

const { Content, Sider } = Layout

const Container: React.FC = () => {
	const menuList: ItemType[] = [
		{
			key: "blog",
			label: "博客",
			icon: <DiffFilled />,
			children: [
				{
					key: "blog/manage",
					label: "博客管理",
				},
				{
					key: "blog/category",
					label: "分类管理",
				},
			],
		},
		{
			key: "topic",
			label: "专题",
			icon: <SlidersFilled />,
			children: [
				{
					key: "topic/manage",
					label: "专题管理",
				},
			],
		},
		{
			key: "setting",
			label: "设置",
			icon: <SettingFilled />,
			children: [
				{
					key: "setting/profile",
					label: "个人信息设置",
				},
				{
					key: "setting/user",
					label: "博客成员",
				},
				{
					key: "setting/system",
					label: "系统设置",
				},
			],
		},
		{
			key: "recycle",
			label: "回收站",
			icon: <DeleteFilled />,
			children: [
				{
					key: "recycle/recycle",
					label: "回收站",
				},
			],
		},
	]
	const navigate = useNavigate()
	const activeMenu = useAppSelector(state => {
		return state.activeMenu
	})
	const dispatch = useAppDispatch()

	const changeActiveMenu = (e: any) => {
		// console.log(e.keyPath)
		dispatch(createSaveActiveMenu({ ...activeMenu, selectKey: e.keyPath[0] }))
		navigate(e.keyPath[0])
	}
	const handleSelectMenu = (openKeys: any[]) => {
		// console.log(openKeys)
		dispatch(
			createSaveActiveMenu({
				...activeMenu,
				openKey: [...openKeys],
			})
		)
		// console.log(activeMenu)
	}

	useEffect(() => {
		dispatch(createSaveActiveMenu(dcCache.getCache("activeMenu")))
	}, [])
	return (
		<LayoutWrapper>
			<Layout>
				{/* 左侧菜单栏 */}
				<Sider width={240}>
					<h1 className="logo">easyBlog</h1>
					<Menu
						mode="inline"
						defaultSelectedKeys={[activeMenu.selectKey]}
						defaultOpenKeys={activeMenu.openKey}
						style={{ height: "100%", borderRight: 0 }}
						items={menuList}
						onClick={e => changeActiveMenu(e)}
						onOpenChange={e => handleSelectMenu(e)}
						openKeys={activeMenu.openKey}
						selectedKeys={[activeMenu.selectKey]}
					/>
				</Sider>
				{/* 右侧内容区 */}
				<Layout>
					{/* 头部 */}
					<LayoutHeader />
					<Layout style={{ padding: "15px" }}>
						{/* 内如区 */}
						<Content
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
								background: "#fff",
							}}
						>
							<Suspense fallback="我是layout">
								<Auth>
									<Outlet />
								</Auth>
							</Suspense>
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</LayoutWrapper>
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
		background-color: pink;
		display: flex;
		justify-content: flex-end;
		.userInfo {
			color: #1890ff;
			display: flex;
			align-items: center;
			margin-left: 10px;
			/* width: 50px; */
			img {
				width: 50px;
				width: 50px;
				border-radius: 50%;
				margin-left: 10px;
			}
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
