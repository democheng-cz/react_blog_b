import React, { memo, useEffect, useState } from "react"

import { Button } from "antd"

import { BlogManageWrapper } from "./style"
import PageSearch from "@/components/page-search"
import PageTable from "@/components/page-table"
import { TableColumns } from "./table"
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchBlogCategory, fetchBlogList } from "@/store/feature/blog/reducer"
import { blogManageConfig } from "./type"

interface FormDataType {
	title: string
	status: number
	category_id: string
}

const BlogManage = memo(() => {
	const dispatch = useAppDispatch()
	const { blogList, total, blogCategory } = useAppSelector((state: any) => {
		return {
			blogList: state.blog.blogList,
			total: state.blog.blogTotal,
			blogCategory: state.blog.blogCategory,
		}
	})

	const [formData, setFormData] = useState<FormDataType>({
		title: "",
		status: 0,
		category_id: "",
	})

	useEffect(() => {
		dispatch(fetchBlogList({}))
		dispatch(fetchBlogCategory())
	}, [])

	const handleFilter = (query: any) => {
		dispatch(fetchBlogList(query))
	}

	const paginationProps = {
		pageSize: 10,
		pageSizeOptions: [5, 10, 15],
		responsive: true, //当size未指定时, 根据屏幕自适应
		showQuickJumper: true, // 开启快速跳转页码
		// size: "small",
		total,
		onchange: (page: number, pageSize: number) => {},
		onShowSizeChange: (current: number, size: number) => {},
	}
	return (
		<BlogManageWrapper>
			<div className="search">
				<PageSearch
					formConfig={blogManageConfig}
					handleSubmit={(query: any) => handleFilter(query)}
					selectData={blogCategory.map((item: any) => {
						return { label: item.category_name, value: item.category_id }
					})}
					formData={formData}
					setFormData={setFormData}
				/>
			</div>
			<div className="add" style={{ margin: "15px 0" }}>
				{/* 新增按钮 */}
				<Button type="primary">新增</Button>
			</div>
			{/* blog列表数据 */}
			<div className="table">
				<PageTable
					columns={TableColumns()}
					data={blogList}
					rowKey={record => record.blog_id}
					pagination={paginationProps}
					isLoading={true}
				/>
			</div>
		</BlogManageWrapper>
	)
})
export default BlogManage
