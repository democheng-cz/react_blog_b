import React, { memo, useEffect } from "react"
import { BlogCategoryWrapper } from "./style"
import { message, Upload } from "antd"
import type { UploadChangeParam } from "antd/es/upload"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"

const BlogCategory = memo(() => {
	useEffect(() => {
		// console.log("first--start")
		return () => {
			// console.log("first--end")
		}
	}, [])

	return (
		<BlogCategoryWrapper>
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				// beforeUpload={beforeUpload}
				// onChange={handleChange}
			></Upload>
		</BlogCategoryWrapper>
	)
})
export default BlogCategory
