import React, { memo, useState } from "react"

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
