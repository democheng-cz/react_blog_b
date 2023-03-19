import React, { memo, useEffect, useState } from "react"

import { Button } from "antd"

import { BlogManageWrapper } from "./style"

import PageSearch from "@/components/page-search"
import { blogManageConfig } from "./type"
import usePageSearch from "@/hooks/usePageSearch"

import PageTable from "@/components/page-table"
import { tableConfig } from "./table-config"
import usePageTable from "@/hooks/usePageTable"

import { useAppDispatch, useAppSelector } from "@/store"
import { fetchBlogCategory, fetchBlogList } from "@/store/feature/blog/reducer"

interface FormDataType {
	title: string
	status: number | null
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
		status: null,
		category_id: "",
	})

	const submitCallback = () => {}

	const { tableKey, setTableKey } = usePageTable()

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
					selectData={blogCategory.map((item: any) => {
						return { label: item.category_name, value: item.category_id }
					})}
				/>
			</div>
			<div className="add" style={{ margin: "15px 0" }}>
				{/* 新增按钮 */}
				<Button type="primary">新增</Button>
			</div>
			{/* blog列表数据 */}
			<div className="table">
				<PageTable
					tableConfig={tableConfig}
					data={blogList}
					rowKey={(record: any) => record.blog_id}
					pagination={paginationProps}
				/>
			</div>
		</BlogManageWrapper>
	)
})
export default BlogManage
