import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { ReactNode } from "react"
import { Button, Space, Popconfirm, message, Switch } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useAppDispatch, useAppSelector } from "@/store"
import {
	fetchBlogDetail,
	fetchBlogList,
	updateCurrentBlogFormData,
} from "@/store/feature/blog/reducer"
import { timeFormat } from "@/utils/timeFormat"
import { reqDeleteBlog } from "@/service/blog"
import { reqUpdateUserInfo } from "@/service/user"
import { fetchUserList } from "@/store/feature/user/reducer"

interface UserTableType {
	key: string
	user_id: string
	avatar: string
	state: number
	time: string
	create_time: string
	update_time: string
	nick_name: string
	role: string
}

interface TablePropsType {
	setShowModal: (val: boolean) => void
	setModalFormData: (val: any) => void
	setTableKey: (val: any) => void
}
export const TableColumns = (props: TablePropsType) => {
	const [flag, setFlag] = useState(false)
	const { setShowModal, setModalFormData, setTableKey } = props
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { category } = useAppSelector(state => {
		return {
			category: state.blog.blogCategory,
		}
	})

	console.log("first")

	// 修改博客信息
	const updateUserInfo = (record: UserTableType) => {
		setShowModal(true)
		const { nick_name, role, avatar, state, user_id } = record
		setModalFormData({ nick_name, role, avatar, state, user_id })
	}

	// 确定删除删除
	const confirm = async (record: any) => {
		const res = await reqDeleteBlog(record.blog_id)
		if (res.status === 200) {
			message.success("删除成功")
		}
		dispatch(fetchBlogList(null))
	}

	// 修改状态
	const handleSwitchClick = async (checked: boolean, record: UserTableType) => {
		const res = await reqUpdateUserInfo({
			state: Number(checked),
			user_id: record.user_id,
		})
		if (res.status === 201) {
			message.success("修改成功")
			await dispatch(fetchUserList({}))
		}
	}

	const PageTableColumns: ColumnsType<UserTableType> = [
		{
			title: "头像",
			dataIndex: ["avatar"],
			width: "10%",
			align: "center",
			render: text => (
				<img
					src={text || require("@/assets/images/猫和老鼠.png")}
					style={{ width: "50px", height: "50px", borderRadius: "5px" }}
				></img>
			),
		},
		{
			title: "用户名",
			dataIndex: ["nick_name"],
			width: "20%",
			render: (text, record) => {
				return <div style={{ fontSize: "13px", cursor: "pointer" }}>{text}</div>
			},
		},
		{
			title: "角色",
			dataIndex: ["role"],
			width: "10%",
			align: "center",
			render: (text, record) => {
				return <div>{text}</div>
			},
		},
		{
			title: "状态",
			dataIndex: ["state"],
			width: "10%",
			align: "center",
			render: (text, record) => {
				return (
					<Space>
						<span>{text}</span>
						<Switch
							checked={text}
							onChange={(checked: boolean) =>
								handleSwitchClick(checked, record)
							}
						/>
					</Space>
				)
			},
		},
		{
			title: "时间",
			dataIndex: ["update_time"],
			width: "20%",
			align: "center",
			render: (_, record) => {
				return (
					<Space style={{ display: "flex", flexDirection: "column" }}>
						<div>{timeFormat(record["create_time"]) as ReactNode}</div>
						<div>{timeFormat(record["update_time"])}</div>
					</Space>
				)
			},
		},
		{
			title: "操作",
			width: "20%",
			align: "center",
			render: (text: any, record) => (
				<Space size="middle">
					<Button
						size={"small"}
						type={"primary"}
						onClick={() => {
							updateUserInfo(record)
						}}
					>
						修改
					</Button>

					<Popconfirm
						title="确认删除吗?"
						onConfirm={() => confirm(record)}
						okText="确定"
						cancelText="取消"
					>
						<Button size={"small"} danger type={"primary"}>
							删除
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	]
	return PageTableColumns
}
