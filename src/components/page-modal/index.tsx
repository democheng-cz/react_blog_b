import React, { memo, useState, useImperativeHandle } from "react"

import { Modal } from "antd"

import { PageModalWrapper } from "./style"

import { reqUpdateUserInfo, reqUserList } from "@/service/user/index"

import DcForm from "../dc-form"
import { useAppDispatch } from "@/store"
import { fetchUserList } from "@/store/feature/user/reducer"

interface PageModalPropsType {
	formConfig: any
	selectData: any[]
}

const PageModal = (props: PageModalPropsType, ref: any) => {
	const dispatch = useAppDispatch()

	const { formConfig, selectData } = props
	let originData = {}

	const [showModal, setShowModal] = useState(false)
	const [formData, setFormData] = useState<any>()

	const handleOk = async () => {
		await reqUpdateUserInfo(formData)
		dispatch(fetchUserList({}))
		setShowModal(false)
	}

	const handleCancel = () => {
		setShowModal(false)
	}

	// 将需要给父组件调用的方法和属性暴露给父组件
	useImperativeHandle(
		ref,
		() => {
			return {
				setShowModal,
			}
		},
		[]
	)

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
}
export default React.forwardRef(PageModal)
