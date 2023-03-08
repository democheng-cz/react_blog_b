import React, { memo, useState } from "react"

import { UploadOutlined } from "@ant-design/icons"

import { PageSearchWrapper } from "./style"
import DcForm from "../dc-form"

interface PageSearchType {
	handleSubmit: (query: any) => void
	fieldsChange?: (newValue: any) => void
	formConfig: any
	selectData?: any[]
	formData: any
	setFormData: (val: any) => void
}

const PageSearch: React.FC<PageSearchType> = memo(props => {
	const { selectData, handleSubmit, formConfig, setFormData, formData } = props

	const changeFormData = (val: any) => {
		console.log(val)
	}

	// const handleCustomRequest = async (file: any) => {
	// 	const formData = new FormData()
	// 	formData.append("cover", file.file as RcFile)
	// 	const res: any = await request.post({
	// 		url: "/blog/upload",
	// 		data: formData,
	// 	})
	// 	if (res.status === 200) {
	// 		fieldsChange!({ cover: res.result.filePath })
	// 	}
	// }

	return (
		<PageSearchWrapper>
			<DcForm
				formConfig={formConfig}
				selectData={selectData}
				submit={(query: any) => handleSubmit(query)}
				formData={formData}
				setFormData={setFormData}
			/>
		</PageSearchWrapper>
	)
})
export default PageSearch
