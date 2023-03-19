import React, { memo, useState, useEffect, useImperativeHandle } from "react"

import { Image, Switch, Button, Space, Popconfirm, message } from "antd"
import { PageTableWrapper } from "./style"

import DcTable from "../dc-table"
import DcLoadingV2 from "../dc-loading-v2"
import { useAppDispatch } from "@/store"

import { fetchUserList } from "@/store/feature/user/reducer"
import { fetchBlogList } from "@/store/feature/blog/reducer"

import { timeFormat } from "@/utils/timeFormat"

interface PageTablePropsType {
	data: any[]
	rowKey?: string | ((record: any) => string)
	pagination: any
	pageName?: string
	tableConfig: any
	clickUpdateBtn?: () => void
	clickDeleteBtn?: () => void
}

const PageTable = (props: PageTablePropsType, ref: any) => {
	const dispatch = useAppDispatch()
	const {
		data,
		rowKey,
		pagination,
		tableConfig: { columns },
		pageName,
	} = props
	let [isLoading, setIsLoading] = useState(false)

	//获取表格数据
	const getDataList = (formData?: any) => {
		switch (pageName) {
			case "blog":
				dispatch(fetchBlogList(formData))
				break
			case "user":
				dispatch(fetchUserList(formData))
				break
		}
	}

	const confirm = async (record: any) => {
		console.log("first")
		// const res = await reqDeleteBlog(record.blog_id)
		// if (res.status === 200) {
		// 	message.success("删除成功")
		// }
		// dispatch(fetchBlogList(null))
	}

	const handleUpdate = (record: any) => {
		switch (pageName) {
			case "blog":
				break
			case "user":
				break
		}
	}
	const renderTableColumn = (title: string, text: any, record: any) => {
		switch (title) {
			case "头像":
				return (
					<Image
						src={text}
						style={{ width: "50px", height: "50px", borderRadius: "5px" }}
					/>
				)
			case "封面":
				return (
					<Image
						src={text || require("@/assets/images/猫和老鼠.png")}
						style={{ width: "50px", height: "50px", borderRadius: "5px" }}
					></Image>
				)
			case "文章信息":
				return (
					<div style={{ fontSize: "13px", cursor: "pointer" }}>
						<div>
							标题: <span style={{ color: "#0077aa" }}>{record.title}</span>
						</div>
						<div>
							分类:
							<span style={{ color: "#0077aa" }}>
								{/* {category.map((item: any) => {
									return item.category_id === record.category_id
										? item.category_name
										: ""
								})} */}
								vue
							</span>
						</div>
						<div>
							作者: <span style={{ color: "#0077aa" }}>{record.user_name}</span>
						</div>
					</div>
				)
			case "发布状态":
				return (
					<Space>
						<div>{text === 0 ? "未发布" : "已发布"}</div>
					</Space>
				)
			case "用户名":
				return <div>{text}</div>
			case "角色":
				return <div>{text}</div>
			case "状态":
				return (
					<>
						<Switch checked={!!text} />
					</>
				)
			case "时间":
				return (
					<Space style={{ display: "flex", flexDirection: "column" }}>
						<div>{timeFormat(record["create_time"]) as React.ReactNode}</div>
						<div>{timeFormat(record["update_time"])}</div>
					</Space>
				)
			case "操作":
				return (
					<Space size="middle">
						<Button
							size={"small"}
							type={"primary"}
							onClick={() => {
								handleUpdate(record)
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
				)
		}
	}

	useImperativeHandle(ref, () => {
		return { getDataList }
	})

	useEffect(() => {
		let timer = setTimeout(() => {
			if (!data.length) {
				setIsLoading(false)
			}
		}, 5000)
		return () => {
			clearTimeout(timer)
		}
	}, [])
	return (
		<PageTableWrapper>
			{props.data.length ? (
				<DcTable
					dataSource={data}
					rowKey={rowKey}
					pagination={pagination}
					columns={columns}
					renderTableColumn={renderTableColumn}
				/>
			) : (
				<DcLoadingV2 />
			)}
		</PageTableWrapper>
	)
}
export default memo(React.forwardRef(PageTable))
