import React, { memo, useEffect, useState } from "react"
import { BlogCategoryWrapper } from "./style"
import { message, Upload } from "antd"
import type { UploadChangeParam } from "antd/es/upload"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import { reqUploadAvatar } from "@/service/user"

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener("load", () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

const BlogCategory = memo(() => {
	const [loading, setLoading] = useState(false)
	const [imageUrl, setImageUrl] = useState<string>()
	const beforeUpload = (file: RcFile) => {
		const formData = new FormData()
		console.log(file)
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!")
		}
		const isLt2M = file.size / 1024 / 1024 < 10
		if (!isLt2M) {
			message.error("Image must smaller than 2MB!")
		}
		formData.append("file", file)
		reqUploadAvatar(file).then(res => {
			console.log(file)
			console.log(res)
		})
		return isJpgOrPng && isLt2M
	}

	const handleChange: UploadProps["onChange"] = (
		info: UploadChangeParam<UploadFile>
	) => {
		if (info.file.status === "uploading") {
			setLoading(true)
			return
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as RcFile, url => {
				setLoading(false)
				setImageUrl(url)
			})
		}
	}

	const upload = function (e: any) {
		console.log(e)
		e.action = "/api/file/uploadImage"
		e.data = { type: 0 }
		e.onchange = function (e: any) {
			console.log("change" + e)
			console.log("上传成功")
		}
		e.onerror = function (err: any) {
			console.log("error" + err)
			console.log("上传失败")
		}
		console.log(e)
		fetch(e.action, {
			method: e.method,
			body: e.data,
		}).then(res => {
			console.log(res)
		})
	}
	useEffect(() => {
		return () => {}
	}, [])

	return (
		<BlogCategoryWrapper>
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				beforeUpload={beforeUpload}
				onChange={handleChange}
				// customRequest={file => upload(file)}
			>
				imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
			</Upload>
		</BlogCategoryWrapper>
	)
})
export default BlogCategory
