import React, { memo, useState } from "react"

import { Form, Input, Select, Button, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import type { SelectProps } from "rc-select"

import request from "@/service/request"
import { PageSearchWrapper } from "./style"

interface PageSearchType {
	handleSubmit: (query: any) => void
	selectData: any[]
	type: string
	fieldsChange?: (newValue: any[]) => void
	hasUpload?: boolean
}

const PageSearch: React.FC<PageSearchType> = memo(props => {
	const statusOptions: SelectProps["options"] = [
		{
			label: "已发布",
			value: "1",
		},
		{
			label: "未发布",
			value: 0,
		},
	]

	const [fileList, setFileList] = useState<UploadFile[]>([])
	const [file, setFile] = useState<any>([])

	const handleFinished = (value: any) => {
		props.handleSubmit(value)
	}

	const handleFieldsChange = (value: any) => {
		console.log(value)
		props.fieldsChange && props.fieldsChange(value)
	}

	const handleCustomRequest = async (file: any) => {
		const formData = new FormData()
		formData.append("cover", file.file as RcFile)
		const res: any = await request.post({
			url: "/blog/upload",
			data: formData,
		})
		if (res.status === 200) {
			handleFieldsChange({ cover: res.result.filePath })
		}
	}

	return (
		<PageSearchWrapper>
			<Form
				style={{ display: "flex", width: "100%", flexWrap: "wrap" }}
				onFinish={e => handleFinished(e)}
				onValuesChange={e => handleFieldsChange(e)}
			>
				<Form.Item name="title" label="标题" style={{ width: "30%" }}>
					<Input />
				</Form.Item>
				<Form.Item
					name="status"
					label="状态"
					style={{ width: "30%", margin: "0 15px" }}
				>
					<Select options={statusOptions} placeholder="请选择状态"></Select>
				</Form.Item>
				<Form.Item name="category_id" label="分类" style={{ width: "30%" }}>
					<Select options={props.selectData} placeholder="请选择分类"></Select>
				</Form.Item>
				{props.hasUpload && (
					// <Form.Item name="cover" label="上传封面" style={{ width: "30%" }}>
					<div>
						<label style={{ marginRight: "10px" }}>上传封面:</label>
						<Upload
							fileList={fileList}
							customRequest={(files: any) => handleCustomRequest(files)}
						>
							<Button icon={<UploadOutlined />}>Select File</Button>
						</Upload>
					</div>
					// </Form.Item>
				)}
				<Form.Item>
					<Button
						type="primary"
						danger={props.type === "show"}
						style={{ marginLeft: "20px" }}
						htmlType="submit"
					>
						{props.type === "show" ? "搜索" : "提交"}
					</Button>
				</Form.Item>
			</Form>
		</PageSearchWrapper>
	)
})
export default PageSearch
