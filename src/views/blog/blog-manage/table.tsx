import { useNavigate } from "react-router-dom"
import type { ReactNode } from "react"
import { Button, Space, Popconfirm } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useAppDispatch } from "@/store"
import { fetchBlogDetail, fetchBlogList } from "@/store/feature/blog/reducer"
import { timeFormat } from "@/utils/timeFormat"
import { reqDeleteBlog } from "@/service/blog"

interface BlogTableType {
	key: string
	blog_id: string
	cover: string
	blogInfo: string
	status: number
	time: string
	create_time: string
	update_time: string
	title: string
	user_name: string
	desc: string
	category_name: string
}

export const TableColumns = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const handleToBlogDetail = (record: any) => {
		dispatch(fetchBlogDetail(record.blog_id))
		navigate(`/blog/${record.blog_id}`)
	}

	// 确定删除删除
	const confirm = async (record: any) => {
		// console.log(record.blog_id)
		const res = await reqDeleteBlog(record.blog_id)
		dispatch(fetchBlogList(null))
		console.log(res)
	}

	const PageTableColumns: ColumnsType<BlogTableType> = [
		{
			title: "封面",
			dataIndex: "cover",
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
			title: "文章信息",
			dataIndex: ["title"],
			width: "40%",
			render: (text, record) => {
				return (
					<div style={{ fontSize: "13px", cursor: "pointer" }}>
						<div onClick={() => handleToBlogDetail(record)}>
							标题: <span style={{ color: "#0077aa" }}>{record.title}</span>
						</div>
						<div>
							分类:{" "}
							<span style={{ color: "#0077aa" }}>
								{record.category_name || "vue3"}
							</span>
						</div>
						<div>
							作者: <span style={{ color: "#0077aa" }}>{record.user_name}</span>
						</div>
					</div>
				)
			},
		},
		{
			title: "状态",
			dataIndex: "status",
			width: "10%",
			align: "center",
			render: text => {
				return (
					<Space>
						<div>{text === 0 ? "未发布" : "已发布"}</div>
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
			render: (text: any, record: any) => (
				<Space size="middle">
					<Button size={"small"} type={"primary"}>
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
