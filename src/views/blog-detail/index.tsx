import React, { memo } from "react"

import MDEditor from "@uiw/react-md-editor"

import { BlogDetailWrapper } from "./style"

const BlogDetail = memo(() => {
	return (
		<BlogDetailWrapper>
			<MDEditor.Markdown source="Hello Markdown!" />
		</BlogDetailWrapper>
	)
})
export default BlogDetail
