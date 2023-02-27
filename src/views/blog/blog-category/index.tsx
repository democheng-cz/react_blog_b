import React, { memo, useEffect, useState } from "react"

import MDEditor, {
	commands,
	ICommand,
	TextState,
	TextAreaTextApi,
} from "@uiw/react-md-editor"
import { Button, message, Select } from "antd"
import rehypeSanitize from "rehype-sanitize" // 防止xss攻击
import domToImage from "dom-to-image"

import { BlogCategoryWrapper } from "./style"
import { useAppSelector } from "@/store"
import dcCache from "@/utils/localstore"
import PageSearch from "@/components/page-search"
import { reqUploadBlog } from "@/service/blog"

// const textToImage: ICommand = {
// 	name: "Text To Image",
// 	keyCommand: "text2image",
// 	buttonProps: { "aria-label": "Insert title3" },
// 	icon: (
// 		<svg width="12" height="12" viewBox="0 0 20 20">
// 			<path
// 				fill="currentColor"
// 				d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
// 			></path>
// 		</svg>
// 	),
// 	execute: (state: TextState, api: TextAreaTextApi) => {
// 		const dom = document.getElementsByClassName("gooooooooo")[0]
// 		console.log(dom)
// 		if (dom) {
// 			domToImage.toPng(dom, {}).then((dataUrl: any) => {
// 				// const link = document.createElement("img")
// 				// link.download = "image.jpg"
// 				// link.src = dataUrl
// 				console.log(dataUrl)
// 				var img = new Image()
// 				img.src = dataUrl
// 				document.body.appendChild(img)
// 				// link.click()
// 			})
// 		}
// 	},
// }

interface MdDataType {
	content: string
	title: string
	status: number
	category_id: string
	cover: string
}

const BlogCategory = memo(() => {
	const [value, setValue] = React.useState(
		'**Hello world!!!** <IFRAME SRC="javascript:javascript:alert(window.origin);"></IFRAME>'
	)

	const { blogCategory } = useAppSelector(state => {
		return {
			blogCategory: state.blog.blogCategory.length
				? state.blog.blogCategory
				: dcCache.getCache("blogCategory"),
		}
	})
	const [mdData, setMdState] = useState<MdDataType>({
		title: "",
		content: "",
		status: 0,
		category_id: "",
		cover: "",
	})

	const text = "**Hello world!!! ###1.**asdsasdsaa** "

	const handleMdChange = (content: string) => {
		setMdState({ ...mdData, content })
		console.log(mdData)
	}

	const handleSubmit = async (value: any) => {
		// console.log(mdData)
		const res: any = await reqUploadBlog(mdData)
		// console.log(res)
		if (res.status === 200) {
			// message.open({})
		}
	}

	const handleValueChange = (value: any[]) => {
		setMdState({ ...mdData, ...value })
	}

	useEffect(() => {
		return () => {}
	}, [mdData])

	return (
		<BlogCategoryWrapper>
			<PageSearch
				handleSubmit={(value: any) => handleSubmit(value)}
				type="edit"
				selectData={blogCategory.map((item: any) => {
					return { label: item.category_name, value: item.category_id }
				})}
				fieldsChange={(e: any) => handleValueChange(e)}
				hasUpload={true}
			/>
			<MDEditor
				className="md gooooooooo"
				value={mdData?.content}
				onChange={text => handleMdChange(text!)}
				previewOptions={{
					rehypePlugins: [[rehypeSanitize]],
				}}
				// commands={[textToImage, commands.divider]}
			/>
			{/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
		</BlogCategoryWrapper>
	)
})
export default BlogCategory
