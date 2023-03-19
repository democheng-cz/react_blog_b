import React, { memo, useState } from "react"

import { Button } from "antd"

import { PageSearchWrapper } from "./style"
import DcForm from "../dc-form"

interface PageSearchType {
	searchChange?: (formData: any) => void
	resetChange?: () => void
	formConfig: any
	selectData?: any[]
}

const PageSearch: React.FC<PageSearchType> = memo(props => {
	const { selectData, formConfig, resetChange, searchChange } = props

	let originData: any = {}

	formConfig.formItems.forEach((item: any) => {
		originData[item.name] = ""
	})

	const [formData, setFormData] = useState<any>({ ...originData })

	const handleSearch = () => {
		searchChange!(formData)
	}

	const handleReset = () => {
		setFormData({})
		resetChange!()
	}

	const renderBtn = () => {
		return (
			formConfig.btns &&
			formConfig.btns.map((item: any) => {
				return (
					<Button
						key={item.text}
						type={item.type}
						size={item.size}
						style={{ marginLeft: item.marginLeft }}
						danger={item.isDanger}
						onClick={() => {
							switch (item.text) {
								case "搜索":
									handleSearch()
									break
								case "重置":
									handleReset()
									break
							}
						}}
					>
						{item.text}
					</Button>
				)
			})
		)
	}

	return (
		<PageSearchWrapper>
			<DcForm
				formConfig={formConfig}
				selectData={selectData}
				formData={formData}
				setFormData={setFormData!}
				Btn={renderBtn()}
			/>
		</PageSearchWrapper>
	)
})
export default PageSearch
