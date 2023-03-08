import React, { memo, useEffect, useState } from "react"

import {  message } from "antd"
import domToImage from "dom-to-image"

import { BlogCategoryWrapper } from "./style"
import { useAppSelector } from "@/store"
import dcCache from "@/utils/localstore"
import PageSearch from "@/components/page-search"
import { reqUploadBlog } from "@/service/blog"
import { blogCategoryConfig } from "./type"

interface MdDataType {
	content: string
	title: string
	status: number
	category_id: string
	cover: string
}

const BlogCategory = memo(() => {
	const { blogCategory } = useAppSelector(state => {
		return {
			blogCategory: state.blog.blogCategory.length
				? state.blog.blogCategory
				: dcCache.getCache("blogCategory"),
		}
	})
	const [formData, setFormData] = useState<MdDataType>({
		title: "",
		content: "",
		status: 0,
		category_id: "",
		cover: "",
	})

	const handleSubmit = async (value: any) => {
		const res: any = await reqUploadBlog(formData)
		if (res.status === 200) {
			message.success("创建成功")
		}
	}

	useEffect(() => {
		return () => {}
	}, [formData])

	return (
		<BlogCategoryWrapper>
			<PageSearch
				handleSubmit={(value: any) => handleSubmit(value)}
				selectData={blogCategory.map((item: any) => {
					return { label: item.category_name, value: item.category_id }
				})}
				formConfig={blogCategoryConfig}
				formData={formData}
				setFormData={setFormData}
			/>

			{/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
		</BlogCategoryWrapper>
	)
})
export default BlogCategory
