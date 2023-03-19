import React, { memo, useEffect, useState } from "react"

import { message } from "antd"
import domToImage from "dom-to-image"

import { BlogCategoryWrapper } from "./style"
import { useAppDispatch, useAppSelector } from "@/store"
import dcCache from "@/utils/localstore"
import PageSearch from "@/components/page-search"
import { reqUploadBlog } from "@/service/blog"
import { blogCategoryConfig } from "./type"
import { updateCurrentBlogFormData } from "@/store/feature/blog/reducer"
import { useNavigate } from "react-router-dom"

interface MdDataType {
	content?: string
	title?: string
	status?: number
	category_id?: string
	cover?: string
}

const BlogCategory = memo(() => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { blogCategory, currentBlogInfo } = useAppSelector(state => {
		return {
			blogCategory: state.blog.blogCategory.length
				? state.blog.blogCategory
				: dcCache.getCache("blogCategory"),
			currentBlogInfo: state.blog.currentBlogFormData,
		}
	})
	const [formData, setFormData] = useState<MdDataType>(currentBlogInfo)

	const handleSubmit = async (value: any) => {
		const res: any = await reqUploadBlog(formData)
		if (res.status === 200) {
			message.success("修改成功")
			navigate("/blog/manage")
		}
	}

	useEffect(() => {
		return () => {
			dispatch(updateCurrentBlogFormData({}))
		}
	}, [formData])

	return (
		<BlogCategoryWrapper>
			<PageSearch
				selectData={blogCategory.map((item: any) => {
					return { label: item.category_name, value: item.category_id }
				})}
				formConfig={blogCategoryConfig}
			/>

			{/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
		</BlogCategoryWrapper>
	)
})
export default BlogCategory
