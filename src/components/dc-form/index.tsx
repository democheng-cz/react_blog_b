import React, { memo, useState, useCallback } from "react"

import { Form, Input, Select, Button, Upload, message, Image } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import rehypeSanitize from "rehype-sanitize"
import MDEditor, {
	commands,
	ICommand,
	TextState,
	TextAreaTextApi,
} from "@uiw/react-md-editor"

import request from "@/service/request"
import { DcFormWrapper } from "./style"

interface FormType {
	formConfig: any
	selectData?: any[]
	submit: (query: any) => void
	fieldsChange?: (newValue: any[]) => void
	customRequest?: (file: any) => void
	formData: any
	setFormData: (val: any) => void
}

const DcForm: React.FC<FormType> = memo(props => {
	const {
		formConfig: { type, statusOptions, formItems },
		selectData,
		submit,
		formData,
		setFormData,
	} = props
	const [fileList, setFileList] = useState<UploadFile[]>([])

	const renderFormItem = function renderFormItem(item: any) {
		switch (item.type) {
			case "input":
				return (
					<Input
						value={formData[item.name]}
						onChange={e => handleChange(e, item.name, item.type)}
					/>
				)
			case "select":
				return (
					<>
						<Select
							options={item.label === "状态" ? statusOptions : selectData}
							onChange={e => {
								handleChange(e, item.name, item.type)
							}}
							defaultValue={formData[item.name]}
						></Select>
					</>
				)
			case "upload":
				return (
					<>
						{formData[item.name] ? (
							<Image width={200} src={formData[item.name]} />
						) : (
							""
						)}
						<Upload
							fileList={fileList}
							customRequest={(files: any) => handleCustomRequest(files)}
						>
							<Button icon={<UploadOutlined />}>Select File</Button>
						</Upload>
					</>
				)
		}
	}
	const handleCustomRequest = async (file: any) => {
		const formData = new FormData()
		formData.append("cover", file.file as RcFile)
		const res: any = await request.post({
			url: "/blog/upload",
			data: formData,
		})
		if (res.status === 200) {
			setFileList([...fileList, file.file])
			setFormData({ ...formData, cover: res.result.filePath })
		}
	}

	const handleChange = (e: any, prop: string, type: string) => {
		switch (type) {
			case "input":
				setFormData!({ ...formData, [prop]: e.target.value })
				break
			case "select":
				setFormData!({ ...formData, [prop]: e })
				break
			case "md":
				setFormData({ ...formData, [prop]: e })
		}
	}

	const handleClick = () => {
		submit(formData)
	}

	return (
		<DcFormWrapper>
			<Form style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
				{formItems.map((item: any) => {
					return (
						<Form.Item
							label={item.label}
							style={{ width: item.width, marginRight: "5px" }}
							key={item.name}
						>
							{renderFormItem(item)}
						</Form.Item>
					)
				})}
				<Button
					type="primary"
					danger={type === "search"}
					style={{ marginLeft: "20px" }}
					onClick={() => {
						handleClick()
					}}
				>
					{type === "search" ? "搜索" : "提交"}
				</Button>
				{type === "upload" ? (
					<MDEditor
						className="md gooooooooo"
						value={formData.content}
						onChange={text => handleChange(text, "content", "md")}
						previewOptions={{
							rehypePlugins: [[rehypeSanitize]],
						}}
						style={{ marginTop: "10px" }}
					/>
				) : (
					""
				)}
			</Form>
		</DcFormWrapper>
	)
})
export default DcForm
