import React, { memo } from "react"

import { Modal } from "antd"

import { PageModalWrapper } from "./style"
import DcForm from "../dc-form"

interface PageModalPropsType {
	formConfig: any
	selectData: any[]
	handleSubmit?: (query: any) => void
	formData: any
	setFormData: (FormData: any) => void
	showModal: boolean
	setShowModal: (flag: boolean) => void
}

const PageModal: React.FC<PageModalPropsType> = memo(props => {
	const {
		formConfig,
		selectData,
		formData,
		setFormData,
		showModal,
		setShowModal,
		handleSubmit,
	} = props

	const handleOk = () => {
		handleSubmit!(formData)
		setShowModal(false)
	}
	const handleCancel = () => {
		setShowModal(false)
	}
	return (
		<PageModalWrapper>
			<Modal
				open={showModal}
				onOk={handleOk}
				onCancel={handleCancel}
				centered={true}
				okText="确定"
				cancelText="取消"
			>
				<DcForm
					formConfig={formConfig}
					selectData={selectData}
					formData={formData}
					setFormData={setFormData}
				/>
			</Modal>
		</PageModalWrapper>
	)
})
export default PageModal
